// ===== ui-dashboard.js =====
// טאב ספירה כללית - טבלאות מלאי, נשקים, חיילים, היסטוריה

function renderDashboardTab() {
  const { isLoadingData } = AppState;
  if (isLoadingData) return `<div class="text-center py-10 text-slate-500">טוען נתונים מהענן...</div>`;

  const { submissionHistory, inventoryTotals, totalStock,
    dashboardSearchTerm, isDashboardDropdownOpen, selectedSoldier } = AppState;

  const dashboardItems = Array.from(new Set([
    ...Object.keys(inventoryTotals), ...Object.keys(totalStock)
  ])).sort();

  // Build weapons map
  const weaponsMap = new Map();
  [...submissionHistory].reverse().forEach(e => {
    (e.weapons || []).forEach(w => weaponsMap.set(`${w.type}-${w.serial}`, { ...w, soldierName: e.soldierName||'לא ידוע', personalNumber: e.personalNumber||'-', timestamp: e.timestamp }));
    (e.returnedWeapons || []).forEach(w => weaponsMap.delete(`${w.type}-${w.serial}`));
  });
  const opticsMap = new Map();
  [...submissionHistory].reverse().forEach(e => {
    (e.optics || []).forEach(o => opticsMap.set(`${o.type}-${o.serial}`, { ...o, soldierName: e.soldierName||'לא ידוע', personalNumber: e.personalNumber||'-', timestamp: e.timestamp }));
    (e.returnedOptics || []).forEach(o => opticsMap.delete(`${o.type}-${o.serial}`));
  });
  const commsMap = new Map();
  [...submissionHistory].reverse().forEach(e => {
    (e.comms || []).forEach(c => commsMap.set(`${c.type}-${c.serial}`, { ...c, soldierName: e.soldierName||'לא ידוע', personalNumber: e.personalNumber||'-', timestamp: e.timestamp }));
    (e.returnedComms || []).forEach(c => commsMap.delete(`${c.type}-${c.serial}`));
  });

  const allWeapons = Array.from(weaponsMap.values());
  const allOptics  = Array.from(opticsMap.values());
  const allComms   = Array.from(commsMap.values());

  const filteredDashboard = getFilteredSoldiers(dashboardSearchTerm);

  return `
  <div class="space-y-8">

    <!-- Export button -->
    <div class="flex justify-end">
      <button onclick="exportToCSV()"
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
        ייצוא נתונים לאקסל (CSV)
      </button>
    </div>

    <!-- General inventory table -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h2 class="text-lg font-bold text-slate-700 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          ספירה כללית של ציוד שנמשך (מחושב החזרות)
        </h2>
        <span class="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">מתעדכן בזמן אמת</span>
      </div>
      ${dashboardItems.length === 0 ?
        `<div class="p-8 text-center text-slate-500">טרם נמשכו פריטים במערכת וטרם הוזן מלאי כללי.</div>` :
        `<div class="overflow-x-auto">
          <table class="w-full text-right border-collapse">
            <thead>
              <tr class="bg-slate-100 text-slate-600 text-sm">
                <th class="p-4 font-bold border-b border-slate-200">שם פריט</th>
                <th class="p-4 font-bold border-b border-slate-200 text-center">מלאי כללי</th>
                <th class="p-4 font-bold border-b border-slate-200 text-center">נמשך לשטח</th>
                <th class="p-4 font-bold border-b border-slate-200 text-center">נותר במלאי</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${dashboardItems.map(item => {
                const stock = totalStock[item] || 0;
                const drawn = inventoryTotals[item] || 0;
                const remaining = stock - drawn;
                return `<tr class="hover:bg-slate-50 transition-colors">
                  <td class="p-4 font-medium text-slate-800">${escH(item)}</td>
                  <td class="p-4 text-center text-slate-600 font-bold">${stock > 0 ? stock : '-'}</td>
                  <td class="p-4 text-center">
                    ${drawn > 0 ? `<span class="inline-block bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-lg">${drawn}</span>` : `<span class="text-slate-400">-</span>`}
                  </td>
                  <td class="p-4 text-center">
                    ${(stock > 0 || drawn > 0) ? `<span class="inline-block font-bold px-3 py-1 rounded-lg ${remaining < 0 ? 'bg-red-100 text-red-800' : remaining === 0 && stock > 0 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}">${remaining}</span>` : `<span class="text-slate-400">-</span>`}
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`
      }
    </div>

    <!-- Weapons summary -->
    ${renderSerialTable('כלי נשק שנמצאים כרגע אצל חיילים', 'text-red-600', allWeapons, 'סוג נשק', 'אין נשקים שנמשכו')}
    <!-- Optics summary -->
    ${renderSerialTable('אופטיקה שנמצאת כרגע אצל חיילים', 'text-indigo-600', allOptics, 'סוג אופטיקה', 'אין אופטיקה שנמשכה')}
    <!-- Comms summary -->
    ${renderSerialTable('תקשוב שנמצא כרגע אצל חיילים', 'text-emerald-600', allComms, 'סוג תקשוב', 'אין תקשוב שנמשך')}

    <!-- Per-soldier detail -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="p-4 border-b border-slate-200 bg-slate-50">
        <h2 class="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          ציוד נוכחי לפי חייל
        </h2>
        <div class="w-full md:w-1/2 relative">
          <div class="relative">
            <input type="text"
              value="${escH(dashboardSearchTerm)}"
              placeholder="הקלד לחיפוש חייל..."
              class="w-full border border-slate-300 rounded-lg p-2.5 pl-10 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              oninput="onDashboardSearch(this.value)"
              onfocus="setState({isDashboardDropdownOpen:true});renderApp()"
              onblur="setTimeout(()=>{setState({isDashboardDropdownOpen:false});renderApp()},200)"
            />
            <svg class="w-5 h-5 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          ${isDashboardDropdownOpen ? `
          <ul class="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            ${filteredDashboard.length > 0 ?
              filteredDashboard.map(s =>
                `<li onmousedown="selectSoldierForDashboard(AppState.soldiersData[${AppState.soldiersData.indexOf(s)}])"
                    class="p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 text-slate-700">
                  ${escH(s.name)} <span class="text-slate-400 text-sm">${s.id ? `- ${s.id}` : ''} ${s.department ? `| ${s.department}` : ''}</span>
                </li>`).join('') :
              `<li class="p-3 text-slate-500 text-sm text-center">לא נמצאו חיילים</li>`
            }
          </ul>` : ''}
        </div>
      </div>
      ${selectedSoldier ? renderSoldierDetail(selectedSoldier) : ''}
    </div>

    <!-- History log -->
    ${renderHistoryLog()}
  </div>`;
}

function renderSerialTable(title, colorClass, items, typeLabel, emptyLabel) {
  return `
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="p-4 border-b border-slate-200 bg-slate-50">
      <h2 class="text-lg font-bold text-slate-700 flex items-center gap-2">
        <svg class="w-5 h-5 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
        ${title}
      </h2>
    </div>
    ${items.length === 0 ?
      `<div class="p-8 text-center text-slate-500">${emptyLabel}</div>` :
      `<div class="overflow-x-auto">
        <table class="w-full text-right border-collapse">
          <thead>
            <tr class="bg-slate-100 text-slate-600 text-sm">
              <th class="p-4 font-bold border-b border-slate-200">${typeLabel}</th>
              <th class="p-4 font-bold border-b border-slate-200">מספר סידורי</th>
              <th class="p-4 font-bold border-b border-slate-200">שם החייל</th>
              <th class="p-4 font-bold border-b border-slate-200">מספר אישי</th>
              <th class="p-4 font-bold border-b border-slate-200">תאריך משיכה</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${items.map(r => `
            <tr class="hover:bg-slate-50 transition-colors">
              <td class="p-4 font-medium text-slate-800">${escH(r.type)}</td>
              <td class="p-4 font-mono text-slate-600">${escH(r.serial)}</td>
              <td class="p-4">${escH(r.soldierName)}</td>
              <td class="p-4">${escH(r.personalNumber)}</td>
              <td class="p-4 text-sm text-slate-500">${formatDate(r.timestamp)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`
    }
  </div>`;
}

function renderSoldierDetail(soldierName) {
  const { submissionHistory } = AppState;
  const history = [...submissionHistory].filter(e => e.soldierName === soldierName).reverse();
  if (history.length === 0)
    return `<div class="p-4 text-center text-slate-500">לא נמצאו משיכות ציוד עבור חייל זה.</div>`;

  const totals = {};
  const wMap = new Map(), oMap = new Map(), cMap = new Map();
  history.forEach(e => {
    if (e.items) Object.entries(e.items).forEach(([k, v]) => totals[k] = (totals[k] || 0) + Number(v));
    (e.weapons || []).forEach(w => wMap.set(`${w.type}-${w.serial}`, w));
    (e.returnedWeapons || []).forEach(w => wMap.delete(`${w.type}-${w.serial}`));
    (e.optics || []).forEach(o => oMap.set(`${o.type}-${o.serial}`, o));
    (e.returnedOptics || []).forEach(o => oMap.delete(`${o.type}-${o.serial}`));
    (e.comms || []).forEach(c => cMap.set(`${c.type}-${c.serial}`, c));
    (e.returnedComms || []).forEach(c => cMap.delete(`${c.type}-${c.serial}`));
  });
  Object.keys(totals).forEach(k => { if (totals[k] <= 0) delete totals[k]; });

  const weapons = Array.from(wMap.values());
  const optics  = Array.from(oMap.values());
  const comms   = Array.from(cMap.values());

  if (Object.keys(totals).length === 0 && weapons.length === 0 && optics.length === 0 && comms.length === 0)
    return `<div class="p-4 text-center text-slate-500">החייל החזיר את כל הציוד שלו.</div>`;

  return `<div class="p-4">
    <div class="flex flex-wrap gap-3 mt-2">
      ${Object.entries(totals).sort((a,b)=>b[1]-a[1]).map(([item, qty]) =>
        `<div class="bg-indigo-50 border border-indigo-100 text-indigo-800 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
          <span class="font-medium">${escH(item)}</span>
          <span class="bg-indigo-200 text-indigo-900 font-bold px-2 py-0.5 rounded-md text-sm">${qty}</span>
        </div>`).join('')}
    </div>
    ${weapons.length > 0 ? `
    <div class="mt-4 pt-4 border-t border-slate-100">
      <h3 class="font-bold text-slate-600 mb-2">כלי נשק:</h3>
      <div class="flex flex-wrap gap-2">
        ${weapons.map(w => `<div class="bg-red-50 border border-red-100 text-red-800 px-3 py-1.5 rounded-md text-sm font-medium">${escH(w.type)} | מ. נשק: ${escH(w.serial)}</div>`).join('')}
      </div>
    </div>` : ''}
    ${optics.length > 0 ? `
    <div class="mt-4 pt-4 border-t border-slate-100">
      <h3 class="font-bold text-slate-600 mb-2">אופטיקה:</h3>
      <div class="flex flex-wrap gap-2">
        ${optics.map(o => `<div class="bg-indigo-50 border border-indigo-100 text-indigo-800 px-3 py-1.5 rounded-md text-sm font-medium">${escH(o.type)} | מספר: ${escH(o.serial)}</div>`).join('')}
      </div>
    </div>` : ''}
    ${comms.length > 0 ? `
    <div class="mt-4 pt-4 border-t border-slate-100">
      <h3 class="font-bold text-slate-600 mb-2">תקשוב:</h3>
      <div class="flex flex-wrap gap-2">
        ${comms.map(c => `<div class="bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md text-sm font-medium">${escH(c.type)} | מספר: ${escH(c.serial)}</div>`).join('')}
      </div>
    </div>` : ''}
  </div>`;
}

function renderHistoryLog() {
  const { submissionHistory } = AppState;
  if (submissionHistory.length === 0) return '';

  return `
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="p-4 border-b border-slate-200 bg-slate-50">
      <h2 class="text-lg font-bold text-slate-700 flex items-center gap-2">
        <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        היסטוריית משיכות והחזרות
      </h2>
    </div>
    <div class="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
      ${submissionHistory.map(entry => `
      <div class="p-4 hover:bg-slate-50">
        <div class="flex flex-col sm:flex-row justify-between items-start gap-1 mb-2">
          <span class="font-bold text-slate-800">${escH(entry.soldierName || 'לא ידוע')}</span>
          <span class="text-xs text-slate-400">${formatDate(entry.timestamp)}</span>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          ${Object.entries(entry.items || {}).map(([item, qty]) => {
            const isRet = qty < 0;
            return `<div class="text-sm px-3 py-1 rounded-full flex gap-1 border ${isRet ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-blue-50 border-blue-200 text-blue-800'}">
              <span>${isRet ? 'החזרה:' : 'משיכה:'} ${escH(item)}</span>
              <span class="font-bold">x${Math.abs(qty)}</span>
            </div>`;
          }).join('')}
          ${(entry.weapons || []).map(w => `<div class="text-sm bg-red-50 border border-red-200 text-red-800 px-3 py-1 rounded-full flex gap-1"><span>משיכת נשק: ${escH(w.type)}</span><span class="font-bold">(${escH(w.serial)})</span></div>`).join('')}
          ${(entry.returnedWeapons || []).map(w => `<div class="text-sm bg-orange-50 border border-orange-200 text-orange-800 px-3 py-1 rounded-full flex gap-1"><span>החזרת נשק: ${escH(w.type)}</span><span class="font-bold">(${escH(w.serial)})</span></div>`).join('')}
          ${(entry.optics || []).map(o => `<div class="text-sm bg-indigo-50 border border-indigo-200 text-indigo-800 px-3 py-1 rounded-full flex gap-1"><span>משיכת אופטיקה: ${escH(o.type)}</span><span class="font-bold">(${escH(o.serial)})</span></div>`).join('')}
          ${(entry.returnedOptics || []).map(o => `<div class="text-sm bg-purple-50 border border-purple-200 text-purple-800 px-3 py-1 rounded-full flex gap-1"><span>החזרת אופטיקה: ${escH(o.type)}</span><span class="font-bold">(${escH(o.serial)})</span></div>`).join('')}
          ${(entry.comms || []).map(c => `<div class="text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full flex gap-1"><span>משיכת תקשוב: ${escH(c.type)}</span><span class="font-bold">(${escH(c.serial)})</span></div>`).join('')}
          ${(entry.returnedComms || []).map(c => `<div class="text-sm bg-green-50 border border-green-200 text-green-800 px-3 py-1 rounded-full flex gap-1"><span>החזרת תקשוב: ${escH(c.type)}</span><span class="font-bold">(${escH(c.serial)})</span></div>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function onDashboardSearch(val) {
  setState({ dashboardSearchTerm: val, isDashboardDropdownOpen: true });
  if (val === '') selectSoldierForDashboard(null);
  else renderApp();
}
