// ===== render.js =====
// מנוע הרינדור המרכזי - מחליף את React DOM

// HTML escape helper - prevents XSS
function escH(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  const { user, isAuthenticated } = AppState;

  // Loading screen
  if (!user) {
    root.innerHTML = `
      <div class="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800" dir="rtl">
        <div class="text-xl font-medium animate-pulse">מתחבר למערכת...</div>
      </div>`;
    return;
  }

  // Login screen
  if (!isAuthenticated) {
    root.innerHTML = renderLoginScreen();
    return;
  }

  // Main app
  root.innerHTML = renderMainApp();
}

// ─── Login Screen ───────────────────────────────────────────────────────────
function renderLoginScreen() {
  const { loginUsername, loginPassword, loginError } = AppState;
  return `
  <div class="flex items-center justify-center min-h-screen bg-slate-100 font-sans text-slate-800 px-4" dir="rtl">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
      <div class="flex justify-center mb-6">
        <img src="https://lh3.googleusercontent.com/d/10_CQKAY6svTjuNvdbJGOiOnDh0yn1dIk"
          alt="לוגו" class="w-48 h-auto object-contain drop-shadow-sm"
          onerror="this.style.display='none'"/>
      </div>
      <h2 class="text-2xl font-bold text-center mb-2 text-slate-800">ניהול לוגיסטיקה רובאית</h2>
      <p class="text-center text-slate-500 mb-8 text-sm">אנא הזן את פרטיך האישיים כדי להמשיך</p>

      ${loginError ? `<div class="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-bold border border-red-100 mb-4">${escH(loginError)}</div>` : ''}

      <div class="space-y-5">
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-1">שם פרטי</label>
          <input type="text" autocomplete="off"
            value="${escH(loginUsername)}"
            placeholder="לדוגמה: ברק"
            oninput="setState({loginUsername:this.value})"
            onkeydown="if(event.key==='Enter')handleLogin()"
            class="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"/>
        </div>
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-1">סיסמה (מספר אישי)</label>
          <input type="password" inputmode="numeric" autocomplete="new-password"
            value="${escH(loginPassword)}"
            placeholder="הזן מספר אישי"
            oninput="setState({loginPassword:this.value})"
            onkeydown="if(event.key==='Enter')handleLogin()"
            class="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"/>
        </div>
        <button onclick="handleLogin()"
          class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl mt-6 shadow-md hover:shadow-lg transition-all">
          כניסה למערכת
        </button>
      </div>
    </div>
  </div>`;
}

// ─── Main App ────────────────────────────────────────────────────────────────
function renderMainApp() {
  const { activeTab, loggedInAdmin } = AppState;

  const tabs = [
    { id: 'form',       label: 'טופס מאסטר (משיכות)', icon: 'clipboard' },
    { id: 'dashboard',  label: 'ספירה כללית',          icon: 'chart'     },
    { id: 'inventory',  label: 'ניהול מלאי',            icon: 'package'   },
    { id: 'categories', label: 'ניהול פריטים',          icon: 'tags'      },
    { id: 'soldiers',   label: 'ניהול חיילים',          icon: 'users'     },
    { id: 'database',   label: 'מסד נתונים',            icon: 'database'  },
  ];

  const iconSvg = {
    clipboard: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>`,
    chart:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`,
    package:   `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>`,
    tags:      `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>`,
    users:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>`,
    database:  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582 4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>`,
  };

  let tabContent = '';
  if (activeTab === 'form')       tabContent = renderFormTab();
  else if (activeTab === 'dashboard')  tabContent = renderDashboardTab();
  else if (activeTab === 'inventory')  tabContent = renderInventoryTab();
  else if (activeTab === 'categories') tabContent = renderCategoriesTab();
  else if (activeTab === 'soldiers')   tabContent = renderSoldiersTab();
  else if (activeTab === 'database')   tabContent = renderDatabaseTab();

  return `
  <div class="min-h-screen bg-gray-50 font-sans text-slate-800 pb-20" dir="rtl">

    <!-- Header -->
    <header class="bg-gradient-to-l from-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-30">
      <div class="max-w-5xl mx-auto px-4">
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center gap-3">
            <img src="https://lh3.googleusercontent.com/d/10_CQKAY6svTjuNvdbJGOiOnDh0yn1dIk"
              alt="לוגו" class="w-10 h-10 object-contain drop-shadow"
              onerror="this.style.display='none'"/>
            <div>
              <h1 class="text-lg font-bold leading-tight">מערכת לוגיסטיקה רובאית</h1>
              <p class="text-xs text-blue-200">מחובר: ${escH(loggedInAdmin)}</p>
            </div>
          </div>
          <button onclick="handleLogout()"
            class="text-blue-200 hover:text-white text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-700 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            יציאה
          </button>
        </div>

        <!-- Tabs -->
        <nav class="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
          ${tabs.map(tab => `
          <button onclick="setActiveTab('${tab.id}')"
            class="pb-2 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${activeTab === tab.id ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white'}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">${iconSvg[tab.icon]}</svg>
            ${tab.label}
          </button>`).join('')}
        </nav>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-5xl mx-auto px-4 py-6">
      ${tabContent}
    </main>
  </div>`;
}

function setActiveTab(tab) {
  setState({ activeTab: tab });
  renderApp();
}
