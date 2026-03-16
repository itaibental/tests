// ===== ui-categories.js =====
// טאב ניהול סוגי פריטים וקטגוריות

function renderCategoriesTab() {
  const { inventoryCategories, isSavingCategories, categoriesSaveMessage } = AppState;

  return `
  <div class="space-y-6">
    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-lg font-bold text-slate-700">ניהול סוגי פריטים</h2>
        <p class="text-sm text-slate-500">ערוך, הוסף ושנה את סוגי הפריטים והקטגוריות הזמינים למשיכה ומופיעים במלאי.</p>
      </div>
      <button onclick="handleSaveCategories()"
        ${isSavingCategories ? 'disabled' : ''}
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:bg-slate-300 w-full sm:w-auto">
        ${isSavingCategories ? 'שומר...' : `שמור שינויים <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>`}
      </button>
    </div>

    ${categoriesSaveMessage ? `<div class="bg-green-100 text-green-700 p-4 rounded-lg font-medium shadow-sm">${escH(categoriesSaveMessage)}</div>` : ''}

    <!-- Category editor -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 class="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
        <span class="mr-2">קטגוריות ופריטים למשיכה</span>
      </h2>
      <div class="space-y-4">
        ${Object.keys(inventoryCategories).map(catName => `
        <div class="border border-slate-200 rounded-lg p-3 bg-slate-50 relative">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-slate-800">${escH(catName)}</span>
            <button onclick="catDeleteType('${escH(catName)}')" title="מחק קטגוריה זו"
              class="text-red-500 hover:text-red-700 p-1 bg-white rounded shadow-sm border border-red-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
          <textarea rows="3"
            placeholder="הזן פריטים מופרדים בשורות חדשות (אנטר)"
            class="w-full border border-slate-300 rounded p-2 text-sm text-right bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            onchange="catUpdateType('${escH(catName)}',this.value)"
            onblur="catUpdateType('${escH(catName)}',this.value)"
          >${escH((inventoryCategories[catName] || []).join('\n'))}</textarea>
        </div>`).join('')}
      </div>
      <div class="mt-4 flex gap-2">
        <input id="new-cat-type" placeholder="הוסף קטגוריה חדשה..."
          class="flex-1 border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
        <button onclick="catAddType()"
          class="bg-slate-800 hover:bg-slate-900 transition-colors text-white px-4 py-2 rounded-lg text-sm font-bold">
          הוסף
        </button>
      </div>
    </div>
  </div>`;
}

function catUpdateType(catName, value) {
  const data = { ...AppState.inventoryCategories };
  data[catName] = value.split('\n');
  setState({ inventoryCategories: data });
}

function catDeleteType(catName) {
  const data = { ...AppState.inventoryCategories };
  delete data[catName];
  setState({ inventoryCategories: data });
  renderApp();
}

function catAddType() {
  const input = document.getElementById('new-cat-type');
  const newType = input.value.trim();
  if (newType && !AppState.inventoryCategories[newType]) {
    const data = { ...AppState.inventoryCategories, [newType]: [] };
    setState({ inventoryCategories: data });
    input.value = '';
    renderApp();
  }
}
