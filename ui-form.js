// ===== ui-form.js =====
// טאב טופס מאסטר - משיכות והחזרות ציוד

function renderFormTab() {
  const {
    soldierName, formSearchTerm, isFormDropdownOpen,
    inventoryCategories, cart, originalCart,
    weaponsData, selectedWeaponType, selectedWeaponSerial, cartWeapons, originalWeapons,
    opticsData, selectedOpticType, selectedOpticSerial, cartOptics, originalOptics,
    commsData, selectedCommType, selectedCommSerial, cartComms, originalComms,
    isSubmitting, submitMessage
  } = AppState;

  const totalItems = getTotalItemsInCart();
  const filtered = getFilteredSoldiers(formSearchTerm);

  return `
  <div class="space-y-6">

    <!-- Soldier search -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <h2 class="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        בחר חייל להצגה ועדכון ציוד
      </h2>

      <!-- Two columns: name search + personal number display -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Column right: soldier name search -->
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1">חיפוש חייל (שם או מ.א.)</label>
          <div class="relative">
            <input
              type="text"
              id="form-soldier-search"
              value="${escH(formSearchTerm)}"
              placeholder="הקלד לחיפוש חייל..."
              autocomplete="off"
              class="w-full border border-slate-300 rounded-lg p-2.5 pr-10 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              oninput="onFormSearch(this.value)"
              onfocus="setState({isFormDropdownOpen:true});renderApp()"
              onblur="setTimeout(()=>{setState({isFormDropdownOpen:false});renderApp()},200)"
            />
            <svg class="w-5 h-5 text-slate-400 absolute right-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            ${isFormDropdownOpen ? `
            <ul class="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              ${filtered.length > 0 ? filtered.map(s =>
                `<li onmousedown="selectSoldierForForm(AppState.soldiersData[${AppState.soldiersData.indexOf(s)}])"
                    class="p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 text-slate-700">
                  ${escH(s.name)} <span class="text-slate-400 text-sm">${s.id ? `- ${s.id}` : ''} ${s.department ? `| ${s.department}` : ''}</span>
                </li>`).join('') :
                `<li class="p-3 text-slate-500 text-sm text-center">לא נמצאו חיילים</li>`
              }
            </ul>` : ''}
          </div>
        </div>

        <!-- Column left: personal number (auto-filled) -->
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1">מספר אישי מקושר</label>
          <input
            type="text"
            readonly
            value="${escH(AppState.personalNumber)}"
            placeholder="מספר אישי יופיע כאן אוטומטית"
            class="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-500 outline-none cursor-default font-mono"
          />
        </div>

      </div>
    </div>

    ${soldierName ? `

    <!-- Inventory categories -->
    ${Object.entries(inventoryCategories).map(([catName, items]) => `
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="bg-slate-100 px-4 py-3 border-b border-slate-200">
        <h3 class="font-bold text-slate-700">${escH(catName)}</h3>
      </div>
      <div class="divide-y divide-slate-100">
        ${items.map(item => {
          const origQty = originalCart[item] || 0;
          const curQty  = cart[item] || 0;
          const changed = curQty !== origQty;
          return `
          <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${changed ? 'bg-yellow-50' : 'hover:bg-slate-50'}">
            <div class="flex flex-col">
              <span class="font-medium text-slate-800">${escH(item)}</span>
              ${origQty > 0 ? `<span class="text-xs text-slate-500">כמות מקורית לפני עדכון: ${origQty}</span>` : ''}
            </div>
            <div class="flex items-center justify-end gap-2">
              <button onclick="handleDecrement('${escH(item)}')"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-slate-300 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
              </button>
              <input type="number" min="0"
                value="${curQty === 0 ? '' : curQty}"
                placeholder="0"
                onchange="handleQuantityChange('${escH(item)}', this.value)"
                class="w-16 h-10 text-center border rounded-lg outline-none font-bold text-lg ${changed ? 'border-yellow-400 focus:ring-2 focus:ring-yellow-500 bg-white' : 'border-slate-300 focus:ring-2 focus:ring-blue-500'}"/>
              <button onclick="handleIncrement('${escH(item)}')"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-300 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`).join('')}

    <!-- Weapons section -->
    ${renderEquipmentSection('נשק', 'text-red-600', weaponsData, selectedWeaponType, selectedWeaponSerial, cartWeapons, originalWeapons,
      'setSelectedWeaponType', 'setSelectedWeaponSerial', 'handleAddWeapon', 'handleRemoveWeapon',
      'M4 M16 נגב מ"א', 'כלי נשק נוכחיים (ניתן למחוק במידה והוחזרו):', 'אין נשקים חתומים על החייל.')}

    <!-- Optics section -->
    ${renderEquipmentSection('אופטיקה', 'text-indigo-600', opticsData, selectedOpticType, selectedOpticSerial, cartOptics, originalOptics,
      'setSelectedOpticType', 'setSelectedOpticSerial', 'handleAddOptic', 'handleRemoveOptic',
      'ליאור שח"ע עכבר', 'אופטיקה נוכחית (ניתן למחוק במידה והוחזרו):', 'אין אופטיקה חתומה על החייל.')}

    <!-- Comms section -->
    ${renderEquipmentSection('תקשוב', 'text-emerald-600', commsData, selectedCommType, selectedCommSerial, cartComms, originalComms,
      'setSelectedCommType', 'setSelectedCommSerial', 'handleAddComm', 'handleRemoveComm',
      'קשר 710 רחפן', 'תקשוב נוכחי (ניתן למחוק במידה והוחזרו):', 'אין פריטי תקשוב חתומים על החייל.')}

    <!-- Submit -->
    ${submitMessage ? `<div class="bg-green-100 text-green-700 p-4 rounded-lg font-bold text-center shadow-sm">${escH(submitMessage)}</div>` : ''}
    <div class="sticky bottom-4 mt-6">
      <button onclick="handleSubmitForm()"
        ${isSubmitting || !soldierName ? 'disabled' : ''}
        class="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${isSubmitting || !soldierName ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-500 hover:bg-green-600 text-white hover:shadow-xl'}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        ${isSubmitting ? 'מעדכן נתונים...' : 'שמור שינויים בציוד החייל'}
      </button>
    </div>

    <!-- Inventory categories label below button -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mt-2">
      <h2 class="text-lg font-bold text-slate-700">הציוד של החייל (ניתן לעדכן כמויות ולשמור)</h2>
      <p class="text-sm text-slate-500 mt-1">הוסף למשיכה חדשה, או הפחת כדי לסמן החזרת ציוד.
        <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-bold mr-3">
          סה"כ: ${totalItems} פריטים
        </span>
      </p>
    </div>` : `
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-400">
      <svg class="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      <p class="text-lg font-medium">בחר חייל מהרשימה כדי להתחיל</p>
    </div>`}
  </div>`;
}

function renderEquipmentSection(title, colorClass, data, selType, selSerial, cartItems, origItems,
    setTypeFn, setSerialFn, addFn, removeFn, placeholder, currentLabel, emptyLabel) {
  const iconMap = {
    'נשק': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>`,
    'אופטיקה': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>`,
    'תקשוב': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>`
  };

  return `
  <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
    <h2 class="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
      <svg class="w-5 h-5 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${iconMap[title] || ''}</svg>
      ${title}
    </h2>

    <!-- Two selects side by side -->
    <div class="grid grid-cols-2 gap-3 mb-3">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">הוסף ${title} חדש (סוג)</label>
        <select onchange="${setTypeFn}(this.value)"
          class="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
          <option value="" ${!selType ? 'selected' : ''} disabled>בחר סוג...</option>
          ${Object.keys(data).map(t => `<option value="${escH(t)}" ${selType === t ? 'selected' : ''}>${escH(t)}</option>`).join('')}
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">מספר ${title === 'נשק' ? 'נשק' : 'סידורי'}</label>
        <select onchange="${setSerialFn}(this.value)"
          ${!selType ? 'disabled' : ''}
          class="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-100 disabled:text-slate-400 text-slate-700">
          <option value="" ${!selSerial ? 'selected' : ''} disabled>בחר מספר...</option>
          ${selType ? (data[selType] || []).filter(s => s.trim() !== '').map(s =>
            `<option value="${escH(s)}" ${selSerial === s ? 'selected' : ''}>${escH(s)}</option>`
          ).join('') : ''}
        </select>
      </div>
    </div>

    <!-- Full-width add button -->
    <button onclick="${addFn}()"
      ${!selType || !selSerial ? 'disabled' : ''}
      class="w-full bg-slate-400 hover:bg-slate-600 disabled:bg-slate-200 disabled:text-slate-400 text-white p-2.5 rounded-lg font-bold transition-colors mb-4">
      הוסף לחייל
    </button>

    ${cartItems.length > 0 ? `
    <div class="border-t border-slate-100 pt-4">
      <h3 class="text-sm font-bold text-slate-600 mb-2">${currentLabel}</h3>
      <div class="space-y-2">
        ${cartItems.map((item, idx) => {
          const isNew = !origItems.find(o => o.type === item.type && o.serial === item.serial);
          return `
          <div class="flex justify-between items-center px-3 py-2 rounded-lg border ${isNew ? 'bg-green-50 border-green-200 text-green-900' : 'bg-slate-50 border-slate-200 text-slate-800'}">
            <span class="font-medium">${escH(item.type)} - ${escH(item.serial)}
              ${isNew ? '<span class="text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded mr-2">נוסף כעת</span>' : ''}
            </span>
            <button onclick="${removeFn}(${idx})" title="הסר מהחייל (החזרה)"
              class="text-red-500 hover:text-red-700 p-1 bg-white rounded shadow-sm border border-red-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>`;
        }).join('')}
      </div>
    </div>` : `<div class="text-sm text-slate-500 border-t border-slate-100 pt-4">${emptyLabel}</div>`}
  </div>`;
}

// Helper setters wired to global state
function setSelectedWeaponType(v) { setState({ selectedWeaponType: v, selectedWeaponSerial: '' }); renderApp(); }
function setSelectedWeaponSerial(v) { setState({ selectedWeaponSerial: v }); renderApp(); }
function setSelectedOpticType(v) { setState({ selectedOpticType: v, selectedOpticSerial: '' }); renderApp(); }
function setSelectedOpticSerial(v) { setState({ selectedOpticSerial: v }); renderApp(); }
function setSelectedCommType(v) { setState({ selectedCommType: v, selectedCommSerial: '' }); renderApp(); }
function setSelectedCommSerial(v) { setState({ selectedCommSerial: v }); renderApp(); }
function onFormSearch(val) {
  setState({ formSearchTerm: val, isFormDropdownOpen: true });
  if (val === '') selectSoldierForForm(null);
  else renderApp();
}
