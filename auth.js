import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, writeBatch, deleteDoc, addDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuo4N-w-5JFu2pLwmNmPrnuB56q0-9Ikc",
    authDomain: "pedagogical-tools.firebaseapp.com",
    projectId: "pedagogical-tools",
    storageBucket: "pedagogical-tools.firebasestorage.app",
    messagingSenderId: "439078826304",
    appId: "1:439078826304:web:182cbafb97abab137a4aa5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "pedagogical-tools";

let dbUsers = [];
let stagedUsers = [];
let currentLoggedInUserId = null;

const submitBtn = document.getElementById('submitBtn');
const adminBtn = document.getElementById('adminBtn');
const errorMessage = document.getElementById('errorMessage');
const loginView = document.getElementById('login-view');
const adminManagementView = document.getElementById('admin-management-view');
const userListBody = document.getElementById('userListBody');
const addUserBtn = document.getElementById('addUserBtn');
const goToSiteBtn = document.getElementById('goToSiteBtn');
const importSheetBtn = document.getElementById('importSheetBtn');
const saveCloudBtn = document.getElementById('saveCloudBtn');
const welcomeOverlay = document.getElementById('welcomeOverlay');
const welcomeName = document.getElementById('welcomeName');
const dashboardView = document.getElementById('dashboard-view');

function showDashboard() {
    loginView.style.display = 'none';
    adminManagementView.style.display = 'none';
    dashboardView.style.display = 'block';
    document.body.style.overflow = 'auto';
    const initOrRetry = () => {
        if (window.initDashboard) {
            window.initDashboard();
        } else {
            setTimeout(initOrRetry, 100);
        }
    };
    initOrRetry();
}

async function loadAndCacheUsers() {
    submitBtn.disabled = true;
    submitBtn.innerText = 'טוען נתונים...';
    try {
        const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'users');
        const usersSnapshot = await getDocs(usersRef);
        dbUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        submitBtn.disabled = false;
        submitBtn.innerText = 'כניסה למערכת';
    } catch (e) {
        showError("שגיאה בטעינת משתמשים. נסה לרענן.");
        console.error("Error loading users", e);
    }
}

signInAnonymously(auth)
    .then(() => {
        loadAndCacheUsers();
    })
    .catch(err => {
        showError("שגיאה בהתחברות לשירות. נסה לרענן.");
        console.error("Firebase Auth Error", err);
    });

// --- שמירת העדפות משתמש (checkbox branch) ---
window.saveUserPreferences = async function(choices) {
    if (!currentLoggedInUserId) return;
    try {
        const userDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', currentLoggedInUserId);
        await setDoc(userDocRef, { myChoices: choices }, { merge: true });
    } catch (e) { console.error("Save failed", e); }
};

function showError(msg) {
    errorMessage.innerText = msg;
    errorMessage.style.display = 'block';
    submitBtn.disabled = false;
}

async function doLogin(fName, lName, userId) {
    currentLoggedInUserId = userId;
    welcomeName.innerText = `שלום ${fName}`;
    welcomeOverlay.style.display = 'flex';

    // טעינת בחירות שמורות של המשתמש
    try {
        const userDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', userId);
        const userDoc = await getDoc(userDocRef);
        window.userChoices = (userDoc.exists() && userDoc.data().myChoices) ? userDoc.data().myChoices : [];
    } catch (e) { window.userChoices = []; }

    setTimeout(() => {
        welcomeOverlay.style.display = 'none';
        showDashboard();
    }, 1800);
}

async function showAdminPanel() {
    loginView.style.display = 'none';
    dashboardView.style.display = 'none';
    adminManagementView.style.display = 'block';
    await loadUserListFromDB();
}

function renderUserList() {
    userListBody.innerHTML = '';
    
    dbUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-2">${user.firstName}</td>
            <td class="p-2">${user.lastName}</td>
            <td class="p-2">${user.id}</td>
            <td class="p-2">
                <button class="delete-user-btn" data-id="${user.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 hover:text-red-700">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </td>
        `;
        userListBody.appendChild(row);
    });

    stagedUsers.forEach(user => {
        const row = document.createElement('tr');
        row.classList.add('staged-row');
        row.innerHTML = `
            <td class="p-2">${user.firstName}</td>
            <td class="p-2">${user.lastName}</td>
            <td class="p-2">${user.id}</td>
            <td class="p-2"></td>
        `;
        userListBody.appendChild(row);
    });

    document.querySelectorAll('.delete-user-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const userId = e.currentTarget.dataset.id;
            deleteUser(userId);
        });
    });
}

async function deleteUser(userId) {
    if (!confirm(`האם אתה בטוח שברצונך למחוק את המשתמש עם ת.ז. ${userId}?`)) {
        return;
    }
    try {
        const userDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', userId);
        await deleteDoc(userDocRef);
        dbUsers = dbUsers.filter(user => user.id !== userId);
        renderUserList();
        alert('המשתמש נמחק בהצלחה.');
    } catch (error) {
        console.error("Error deleting user: ", error);
        alert('אירעה שגיאה במחיקת המשתמש.');
    }
}

async function loadUserListFromDB() {
    try {
        const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'users');
        const usersSnapshot = await getDocs(usersRef);
        dbUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        stagedUsers = [];
        renderUserList();
        saveCloudBtn.style.display = 'none';
    } catch (e) {
        alert("שגיאה בטעינת המשתמשים. אנא רענן את העמוד.");
        console.error("Error loading user list", e);
    }
}

async function saveStagedUsers() {
    if (stagedUsers.length === 0) {
        alert('אין משתמשים חדשים לשמור.');
        return;
    }
    saveCloudBtn.disabled = true;
    saveCloudBtn.innerText = 'שומר...';
    importSheetBtn.disabled = true;

    const batch = writeBatch(db);
    stagedUsers.forEach(user => {
        if (user && user.id) {
            const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', user.id);
            batch.set(docRef, { firstName: user.firstName, lastName: user.lastName });
        }
    });

    try {
        await batch.commit();
        alert(`הצלחה! ${stagedUsers.length} משתמשים נשמרו או עודכנו בענן.`);
        await loadUserListFromDB();
    } catch (error) {
        alert('שגיאה קריטית בשמירת הנתונים. לא כל הנתונים נשמרו.\nאנא רענן ונסה שוב.');
        console.error('Error committing batch to Firestore:', error);
        saveCloudBtn.disabled = false;
    } finally {
        saveCloudBtn.innerText = 'שמור שינויים בענן';
        importSheetBtn.disabled = false;
    }
}

goToSiteBtn.addEventListener('click', showDashboard);

addUserBtn.addEventListener('click', () => {
    const newFirstName = document.getElementById('newFirstName').value.trim();
    const newLastName = document.getElementById('newLastName').value.trim();
    const newId = document.getElementById('newId').value.trim();

    if (newFirstName && newLastName && newId) {
        const isDuplicate = dbUsers.some(u => u.id === newId) || stagedUsers.some(u => u.id === newId);
        if (isDuplicate) {
            alert('שגיאה: משתמש עם תעודת זהות זו כבר קיים.');
            return;
        }
        stagedUsers.push({ firstName: newFirstName, lastName: newLastName, id: newId });
        document.getElementById('newFirstName').value = '';
        document.getElementById('newLastName').value = '';
        document.getElementById('newId').value = '';
        renderUserList();
        saveCloudBtn.style.display = 'inline-block';
        alert('המשתמש הועמד להוספה. לחץ \'שמור שינויים בענן\' כדי לאשר.');
    } else {
        alert('נא למלא את כל השדות.');
    }
});

importSheetBtn.addEventListener('click', async () => {
    const url = document.getElementById('googleSheetUrl').value.trim();
    if (!url) return alert('נא להזין כתובת URL של Google Sheet.');

    const sheetIdMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (!sheetIdMatch || !sheetIdMatch[1]) {
        return alert('כתובת ה-URL אינה תקינה. יש להזין את הכתובת המלאה.');
    }
    const sheetId = sheetIdMatch[1];
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    importSheetBtn.disabled = true;
    importSheetBtn.innerText = 'טוען...';

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error('Network response was not ok.');
        const csvText = await response.text();
        
        const rows = csvText.split('\n').slice(1);
        const sheetUsers = [];
        let invalidRowCount = 0;
        let duplicateCount = 0;

        rows.forEach(row => {
            const columns = row.split(',').map(c => c.trim());
            if (columns.length >= 3 && columns[2]) {
                const newUser = { firstName: columns[0] || '', lastName: columns[1] || '', id: columns[2] };
                const isDuplicate = dbUsers.some(u => u.id === newUser.id) || stagedUsers.some(u => u.id === newUser.id) || sheetUsers.some(u => u.id === newUser.id);
                if (isDuplicate) { duplicateCount++; } else { sheetUsers.push(newUser); }
            } else if (row.trim() !== '') {
                invalidRowCount++;
            }
        });
        
        if (sheetUsers.length > 0) {
            stagedUsers.push(...sheetUsers);
            renderUserList();
            let alertMessage = `טעינה הושלמה: ${sheetUsers.length} משתמשים חדשים נקלטו מהגיליון ונוספו לרשימת ההמתנה לעדכון.`;
            if (duplicateCount > 0) alertMessage += `\n${duplicateCount} כפילויות זוהו ולא נוספו.`;
            if (invalidRowCount > 0) alertMessage += `\n${invalidRowCount} שורות לא תקינות זוהו.`;
            alertMessage += "\nמתחיל שמירה אוטומטית בענן...";
            alert(alertMessage);
            await saveStagedUsers();
        } else {
            let alertMessage = 'לא נמצאו משתמשים חדשים להוספה מהגיליון.';
            if (duplicateCount > 0) alertMessage += `\nנמצאו ${duplicateCount} משתמשים שכבר קיימים במערכת או ברשימת ההמתנה.`;
            alert(alertMessage);
        }
    } catch (error) {
        alert('שגיאה בטעינת הגיליון. ודא שהשיתוף מוגדר כראוי ושהקישור נכון.');
        console.error('Error fetching or parsing sheet:', error);
    } finally {
        importSheetBtn.disabled = false;
        importSheetBtn.innerText = 'טען נתונים מגיליון';
    }
});

saveCloudBtn.addEventListener('click', saveStagedUsers);

submitBtn.addEventListener('click', () => {
    const id = document.getElementById('idInput').value.trim();
    if (!id) return showError("אנא הכנס תעודת זהות.");
    submitBtn.disabled = true;

    const user = dbUsers.find(u => u.id === id);
    if (user) {
        doLogin(user.firstName, user.lastName, user.id);
    } else {
        showError("תעודת הזהות לא קיימת במערכת.");
        submitBtn.disabled = false;
    }
});

adminBtn.addEventListener('click', () => {
    const code = document.getElementById('adminCode').value;
    if (code === '1234') {
        showAdminPanel();
    } else {
        alert("קוד שגוי");
    }
});

if (dashboardView.style.display === 'block') {
    initDashboard();
}

// ===== הצעות לכלים חדשים =====
window.submitSuggestionToFirebase = async function(text) {
    // שימוש באותו נתיב שעובד כמו users
    const suggestionsRef = collection(db, 'artifacts', appId, 'public', 'data', 'suggestions');
    const newDoc = {
        text: text,
        userId: currentLoggedInUserId || 'anonymous',
        timestamp: serverTimestamp()
    };
    console.log('Saving suggestion to:', suggestionsRef.path, newDoc);
    try {
        const result = await addDoc(suggestionsRef, newDoc);
        console.log('Suggestion saved, id:', result.id);
    } catch(e) {
        console.error('Firestore error:', e.code, e.message, e);
        throw e;
    }
};

window.loadSuggestions = async function() {
    const container = document.getElementById('suggestionsListAdmin');
    if (!container) return;
    container.innerHTML = '<p class="text-slate-400 text-sm text-center">טוען...</p>';
    try {
        const suggestionsRef = collection(db, 'artifacts', appId, 'public', 'data', 'suggestions');
        const snap = await getDocs(suggestionsRef);
        if (snap.empty) {
            container.innerHTML = '<p class="text-slate-400 text-sm text-center">אין הצעות עדיין.</p>';
            return;
        }
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        docs.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
        container.innerHTML = docs.map(d => {
            const date = d.timestamp ? new Date(d.timestamp.seconds * 1000).toLocaleDateString('he-IL') : '';
            return `
            <div class="suggestion-item" id="sug-${d.id}">
                <div class="suggestion-text">${d.text.replace(/</g,'&lt;')}</div>
                <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px; flex-shrink:0;">
                    <span class="suggestion-meta">${date}<br>${d.userId !== 'anonymous' ? '👤 ' + d.userId : ''}</span>
                    <button class="suggestion-delete-btn" onclick="deleteSuggestion('${d.id}')">מחק ✕</button>
                </div>
            </div>`;
        }).join('');
    } catch(e) {
        container.innerHTML = '<p class="text-red-400 text-sm text-center">שגיאה בטעינת ההצעות.</p>';
        console.error(e);
    }
};

window.deleteSuggestion = async function(id) {
    if (!confirm('למחוק הצעה זו?')) return;
    try {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'suggestions', id);
        await deleteDoc(docRef);
        const el = document.getElementById('sug-' + id);
        if (el) el.remove();
    } catch(e) {
        alert('שגיאה במחיקה.');
    }
};
