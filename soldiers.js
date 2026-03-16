// ===== soldiers.js =====
// לוגיקה לניהול חיילים ובחירת חייל

function selectSoldierForForm(soldier) {
  if (!soldier) {
    setState({
      soldierName: '', personalNumber: '', formSearchTerm: '',
      cart: {}, originalCart: {},
      cartWeapons: [], originalWeapons: [],
      cartOptics: [], originalOptics: [],
      cartComms: [], originalComms: []
    });
    renderApp();
    return;
  }

  const depStr = soldier.department ? ` | ${soldier.department}` : '';
  setState({
    soldierName: soldier.name,
    personalNumber: soldier.id,
    formSearchTerm: `${soldier.name} - ${soldier.id}${depStr}`,
    isFormDropdownOpen: false
  });

  // Calculate current possession from history
  const soldierHistory = [...AppState.submissionHistory]
    .filter(e => e.soldierName === soldier.name)
    .reverse();

  const currentCart = {};
  const weaponsMap = new Map();
  const opticsMap = new Map();
  const commsMap = new Map();

  soldierHistory.forEach(entry => {
    if (entry.items) {
      Object.entries(entry.items).forEach(([item, qty]) => {
        currentCart[item] = (currentCart[item] || 0) + Number(qty);
      });
    }
    (entry.weapons || []).forEach(w => weaponsMap.set(`${w.type}-${w.serial}`, w));
    (entry.returnedWeapons || []).forEach(w => weaponsMap.delete(`${w.type}-${w.serial}`));
    (entry.optics || []).forEach(o => opticsMap.set(`${o.type}-${o.serial}`, o));
    (entry.returnedOptics || []).forEach(o => opticsMap.delete(`${o.type}-${o.serial}`));
    (entry.comms || []).forEach(c => commsMap.set(`${c.type}-${c.serial}`, c));
    (entry.returnedComms || []).forEach(c => commsMap.delete(`${c.type}-${c.serial}`));
  });

  Object.keys(currentCart).forEach(k => { if (currentCart[k] <= 0) delete currentCart[k]; });

  setState({
    cart: { ...currentCart },
    originalCart: { ...currentCart },
    cartWeapons: Array.from(weaponsMap.values()),
    originalWeapons: Array.from(weaponsMap.values()),
    cartOptics: Array.from(opticsMap.values()),
    originalOptics: Array.from(opticsMap.values()),
    cartComms: Array.from(commsMap.values()),
    originalComms: Array.from(commsMap.values())
  });
  renderApp();
}

function selectSoldierForDashboard(soldier) {
  if (!soldier) {
    setState({ selectedSoldier: '', dashboardSearchTerm: '' });
    renderApp();
    return;
  }
  const depStr = soldier.department ? ` | ${soldier.department}` : '';
  setState({
    selectedSoldier: soldier.name,
    dashboardSearchTerm: `${soldier.name} - ${soldier.id}${depStr}`,
    isDashboardDropdownOpen: false
  });
  renderApp();
}

function handleAddSoldier(e) {
  e.preventDefault();
  const { newSoldier } = AppState;
  if (newSoldier.name && newSoldier.id) {
    setState({
      soldiersData: [...AppState.soldiersData, { ...newSoldier }],
      newSoldier: { name: '', id: '', department: '', isMaplag: false }
    });
    // Reset form inputs
    document.getElementById('new-soldier-name').value = '';
    document.getElementById('new-soldier-id').value = '';
    document.getElementById('new-soldier-dept').value = '';
    document.getElementById('new-soldier-maplag').checked = false;
    renderApp();
  }
}

function handleUpdateSoldier(index, field, value) {
  const updated = [...AppState.soldiersData];
  updated[index] = { ...updated[index], [field]: value };
  setState({ soldiersData: updated });
}

function handleRemoveSoldier(index) {
  setState({ soldiersData: AppState.soldiersData.filter((_, i) => i !== index) });
  renderApp();
}

function getFilteredSoldiers(searchTerm) {
  if (!searchTerm) return AppState.soldiersData;
  return AppState.soldiersData.filter(s =>
    s.name.includes(searchTerm) || (s.id && s.id.includes(searchTerm))
  );
}
