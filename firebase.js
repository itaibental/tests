// ===== firebase.js =====
// אתחול Firebase וחיבור לבסיס הנתונים

const firebaseConfig = {
  apiKey: "AIzaSyAZElN2h42rH5bZIJj4FKhRoK88dDkQR88",
  authDomain: "levanon-d18b8.firebaseapp.com",
  projectId: "levanon-d18b8",
  storageBucket: "levanon-d18b8.firebasestorage.app",
  messagingSenderId: "479920656987",
  appId: "1:479920656987:web:c08899653f063d1d52a57e"
};

const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbz8L2Lg3k5yS_lzU-FTZ6lTLsWKV2_44PQpSxIV_iIErXiMCVhjk119Z0_ZC5TGekeZ/exec';

const APP_ID = 'master-form-app';

// Firebase SDK loaded via CDN in index.html
let app, auth, db;

function initFirebase() {
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db   = firebase.firestore();
}

// Helper: Firestore document references
function getRequestsRef() {
  return db.collection('artifacts').doc(APP_ID)
    .collection('public').doc('data')
    .collection('inventory_requests');
}

function getSettingsRef() {
  return db.collection('artifacts').doc(APP_ID)
    .collection('public').doc('data')
    .collection('inventory_settings').doc('master_lists');
}
