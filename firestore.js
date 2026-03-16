// ===== firestore.js =====
// כל פעולות הקריאה/כתיבה ל-Firestore

function loadFirestoreData() {
  // Listen to inventory requests
  getRequestsRef().onSnapshot((snapshot) => {
    const history = [];
    const totals = {};

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      history.push({ id: docSnap.id, ...data });
      if (data.items) {
        Object.entries(data.items).forEach(([itemName, quantity]) => {
          const qty = Number(quantity);
          totals[itemName] = (totals[itemName] || 0) + qty;
        });
      }
    });

    Object.keys(totals).forEach(k => { if (totals[k] <= 0) delete totals[k]; });
    history.sort((a, b) => (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0));

    setState({ submissionHistory: history, inventoryTotals: totals, isLoadingData: false });
    renderApp();
  }, (error) => {
    console.error('Error fetching data:', error);
    setState({ isLoadingData: false });
    renderApp();
  });

  // Listen to settings
  getSettingsRef().onSnapshot((docSnap) => {
    if (docSnap.exists) {
      const data = docSnap.data();
      const updates = {};
      if (data.categories) updates.inventoryCategories = data.categories;
      if (data.weapons)    updates.weaponsData = data.weapons;
      if (data.optics)     updates.opticsData = data.optics;
      if (data.comms)      updates.commsData = data.comms;
      if (data.totalStock) updates.totalStock = data.totalStock;
      if (data.soldiers)   updates.soldiersData = data.soldiers;
      setState(updates);
      renderApp();
    }
  });
}

async function handleSaveDatabase() {
  setState({ isSavingDb: true });
  renderApp();
  try {
    const clean = (obj) => {
      const out = {};
      Object.keys(obj).forEach(k => {
        out[k] = obj[k].map(s => s.trim()).filter(s => s !== '');
      });
      return out;
    };
    await getSettingsRef().set({
      weapons: clean(AppState.weaponsData),
      optics:  clean(AppState.opticsData),
      comms:   clean(AppState.commsData)
    }, { merge: true });
    setState({ dbSaveMessage: 'מסד הנתונים נשמר וסונכרן בהצלחה!' });
  } catch (e) {
    console.error(e);
    setState({ dbSaveMessage: 'שגיאה בשמירת מסד הנתונים.' });
  } finally {
    setState({ isSavingDb: false });
    renderApp();
    setTimeout(() => { setState({ dbSaveMessage: '' }); renderApp(); }, 4000);
  }
}

async function handleSaveStock() {
  setState({ isSavingStock: true });
  renderApp();
  try {
    await getSettingsRef().set({ totalStock: AppState.totalStock }, { merge: true });
    setState({ stockSaveMessage: 'המלאי הכללי נשמר בהצלחה!' });
  } catch (e) {
    console.error(e);
    setState({ stockSaveMessage: 'שגיאה בשמירת המלאי.' });
  } finally {
    setState({ isSavingStock: false });
    renderApp();
    setTimeout(() => { setState({ stockSaveMessage: '' }); renderApp(); }, 4000);
  }
}

async function handleSaveSoldiers() {
  setState({ isSavingSoldiers: true });
  renderApp();
  try {
    await getSettingsRef().set({ soldiers: AppState.soldiersData }, { merge: true });
    setState({ soldierSaveMessage: 'רשימת החיילים נשמרה בהצלחה!' });
  } catch (e) {
    console.error(e);
    setState({ soldierSaveMessage: 'שגיאה בשמירת רשימת החיילים.' });
  } finally {
    setState({ isSavingSoldiers: false });
    renderApp();
    setTimeout(() => { setState({ soldierSaveMessage: '' }); renderApp(); }, 4000);
  }
}

async function handleSaveCategories() {
  setState({ isSavingCategories: true });
  renderApp();
  try {
    const clean = (obj) => {
      const out = {};
      Object.keys(obj).forEach(k => {
        out[k] = obj[k].map(s => s.trim()).filter(s => s !== '');
      });
      return out;
    };
    const cleaned = clean(AppState.inventoryCategories);
    await getSettingsRef().set({ categories: cleaned }, { merge: true });
    setState({ inventoryCategories: cleaned, categoriesSaveMessage: 'סוגי הפריטים נשמרו בהצלחה!' });
  } catch (e) {
    console.error(e);
    setState({ categoriesSaveMessage: 'שגיאה בשמירת סוגי הפריטים.' });
  } finally {
    setState({ isSavingCategories: false });
    renderApp();
    setTimeout(() => { setState({ categoriesSaveMessage: '' }); renderApp(); }, 4000);
  }
}

async function handleSubmitForm() {
  if (!AppState.soldierName) {
    setState({ submitMessage: 'יש לבחור חייל.' });
    renderApp();
    return;
  }

  const { cart, originalCart, cartWeapons, originalWeapons, cartOptics, originalOptics, cartComms, originalComms } = AppState;

  const deltaItems = {};
  const allItems = new Set([...Object.keys(cart), ...Object.keys(originalCart)]);
  allItems.forEach(item => {
    const newQty = cart[item] || 0;
    const origQty = originalCart[item] || 0;
    const diff = newQty - origQty;
    if (diff !== 0) deltaItems[item] = diff;
  });

  const newWeapons = cartWeapons.filter(w => !originalWeapons.find(o => o.type === w.type && o.serial === w.serial));
  const returnedWeapons = originalWeapons.filter(w => !cartWeapons.find(c => c.type === w.type && c.serial === w.serial));
  const newOptics = cartOptics.filter(o => !originalOptics.find(p => p.type === o.type && p.serial === o.serial));
  const returnedOptics = originalOptics.filter(o => !cartOptics.find(c => c.type === o.type && c.serial === o.serial));
  const newComms = cartComms.filter(c => !originalComms.find(p => p.type === c.type && p.serial === c.serial));
  const returnedComms = originalComms.filter(c => !cartComms.find(n => n.type === c.type && n.serial === c.serial));

  const hasChanges = Object.keys(deltaItems).length > 0 ||
    newWeapons.length > 0 || returnedWeapons.length > 0 ||
    newOptics.length > 0 || returnedOptics.length > 0 ||
    newComms.length > 0 || returnedComms.length > 0;

  if (!hasChanges) {
    setState({ submitMessage: 'לא בוצעו שינויים.' });
    renderApp();
    setTimeout(() => { setState({ submitMessage: '' }); renderApp(); }, 4000);
    return;
  }

  setState({ isSubmitting: true });
  renderApp();

  try {
    const payload = {
      soldierName: AppState.soldierName,
      personalNumber: AppState.personalNumber,
      items: deltaItems,
      weapons: newWeapons,
      returnedWeapons,
      optics: newOptics,
      returnedOptics,
      comms: newComms,
      returnedComms,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    await getRequestsRef().add(payload);

    // Send to Google Sheets
    const sheetsPayload = {
      soldierName: AppState.soldierName,
      personalNumber: AppState.personalNumber,
      timestamp: new Date().toLocaleString('he-IL'),
      items: deltaItems,
      weapons: newWeapons, returnedWeapons,
      optics: newOptics, returnedOptics,
      comms: newComms, returnedComms
    };
    fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetsPayload)
    }).catch(console.error);

    setState({ submitMessage: 'הציוד עודכן בהצלחה!' });
    selectSoldierForForm(AppState.soldiersData.find(s => s.name === AppState.soldierName) || null);
  } catch (e) {
    console.error(e);
    setState({ submitMessage: 'שגיאה בעדכון הציוד. אנא נסה שנית.' });
  } finally {
    setState({ isSubmitting: false });
    renderApp();
    setTimeout(() => { setState({ submitMessage: '' }); renderApp(); }, 4000);
  }
}
