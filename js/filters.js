// ══════════════════════════════════════════════════════════════════
// FILTER BUILDING
// ══════════════════════════════════════════════════════════════════
function buildFilters() {
  // Category
  const cats = ['All', ...new Set(LOCS.flatMap(l => _allCats(l)))];
  buildChipGroup('body-cat', cats, 'cat', cat => cat === 'All' ? 'All' : cat.split(' ')[0], cat => cat);

  // Style
  buildChipGroup('body-style', ['All',...STYLES], 'style', s => s, s => s);

  // Era
  buildChipGroup('body-era', ['All',...ERAS], 'era', e => e, e => e);

  // Access
  buildChipGroup('body-access', ACCESS, 'access',
    a => a === 'All' ? 'All' : `${ACCESS_META[a].icon} ${a}`,
    a => a
  );

  // Favorites
  buildChipGroup('body-fav', ['All', '★ Favorites', '✓ Visited'], 'fav',
    v => v, v => v);

  // Architect — scrollable list
  const archWrap = document.getElementById('body-arch');
  archWrap.innerHTML = '';
  ['All', ...ARCHITECTS].forEach(a => {
    const b = document.createElement('button');
    b.className = 'arch-item' + (a === 'All' ? ' active' : '');
    b.textContent = a;
    b.title = a;
    b.onclick = () => setFilter('arch', a);
    archWrap.appendChild(b);
  });

  // Neighborhood — scrollable list (same pattern as Architect)
  const hoodWrap = document.getElementById('body-hood');
  if (hoodWrap) {
    hoodWrap.innerHTML = '';
    ['All', ...NEIGHBORHOODS].forEach(h => {
      const b = document.createElement('button');
      b.className = 'hood-item' + (h === 'All' ? ' active' : '');
      b.textContent = h;
      b.title = h;
      b.onclick = () => setFilter('hood', h);
      hoodWrap.appendChild(b);
    });
  }
}

function buildChipGroup(containerId, items, key, labelFn, valueFn) {
  const wrap = document.getElementById(containerId);
  wrap.innerHTML = '';
  items.forEach(item => {
    const b = document.createElement('button');
    b.className = 'chip' + (item === 'All' ? ' active' : '');
    b.textContent = labelFn(item);
    b.title = valueFn(item);
    b.onclick = () => setFilter(key, valueFn(item));
    wrap.appendChild(b);
  });
}

// ══════════════════════════════════════════════════════════════════
// FILTER LOGIC
// ══════════════════════════════════════════════════════════════════
function setFilter(key, val) {
  if (_MULTI_KEYS.has(key)) {
    if (val === 'All') {
      state[key] = [];
    } else {
      const arr = state[key];
      const idx = arr.indexOf(val);
      if (idx >= 0) arr.splice(idx, 1); else arr.push(val);
    }
  } else {
    state[key] = val;
  }

  // Update chip/item highlight
  const bodyId = (key === 'arch' || key === 'hood') ? `body-${key}` : `body-${key}`;
  const selector = key === 'arch' ? '.arch-item' : key === 'hood' ? '.hood-item' : '.chip';
  if (_MULTI_KEYS.has(key)) {
    const isAll = state[key].length === 0;
    document.getElementById(bodyId).querySelectorAll(selector).forEach(b => {
      if (b.title === 'All') b.classList.toggle('active', isAll);
      else b.classList.toggle('active', state[key].includes(b.title));
    });
  } else {
    document.getElementById(bodyId).querySelectorAll(selector).forEach(b => {
      b.classList.toggle('active', b.title === val);
    });
  }

  // Dot indicator
  const dot = document.getElementById(`dot-${key}`);
  const hasFilter = _MULTI_KEYS.has(key) ? state[key].length > 0 : state[key] !== 'All';
  if (dot) dot.classList.toggle('show', hasFilter);

  // Per-section reset badge
  const resetBtn = document.getElementById(`reset-${key}`);
  if (resetBtn) resetBtn.classList.toggle('show', hasFilter);

  updateClearBtn();
  renderList();
  syncMarkers();
}

function setSort(val) { state.sort = val; renderList(); }

function clearAllFilters() {
  // Also clear "I feel like…" themes
  state.themes = [];
  var iflBtn = document.getElementById('ifl-btn');
  var mobIflBtn = document.getElementById('mob-ifl-btn');
  if (iflBtn) iflBtn.classList.remove('active');
  if (mobIflBtn) mobIflBtn.classList.remove('active');
  ['cat','style','era','access','arch','hood','fav'].forEach(k => {
    state[k] = _MULTI_KEYS.has(k) ? [] : 'All';
    const bodyId = `body-${k}`;
    const sel = k === 'arch' ? '.arch-item' : k === 'hood' ? '.hood-item' : '.chip';
    const el = document.getElementById(bodyId);
    if (el) el.querySelectorAll(sel).forEach(b =>
      b.classList.toggle('active', b.title === 'All')
    );
    const dot = document.getElementById(`dot-${k}`);
    if (dot) dot.classList.remove('show');
    const resetBtn = document.getElementById(`reset-${k}`);
    if (resetBtn) resetBtn.classList.remove('show');
  });
  updateClearBtn();
  renderList();
  syncMarkers();
}

function updateClearBtn() {
  const active = ['cat','style','era','access','arch','hood','fav'].some(k =>
    _MULTI_KEYS.has(k) ? state[k].length > 0 : state[k] !== 'All'
  ) || state.themes.length > 0;
  document.getElementById('sb-clear').classList.toggle('show', active);
}

function toggleFsec(id) {
  const sec = document.getElementById(`fsec-${id}`);
  sec.classList.toggle('open');
}

// ══════════════════════════════════════════════════════════════════
// "I FEEL LIKE…" THEME MODAL
// ══════════════════════════════════════════════════════════════════
var _iflSelection = []; // temporary selection inside modal

function openThemeModal() {
  _iflSelection = state.themes.slice(); // copy current active themes
  _renderThemeCards();
  document.getElementById('ifl-overlay').classList.add('open');
  document.getElementById('ifl-modal').classList.add('open');
  _updateIflTitle();
}

function closeThemeModal() {
  document.getElementById('ifl-overlay').classList.remove('open');
  document.getElementById('ifl-modal').classList.remove('open');
}

function _renderThemeCards() {
  const body = document.getElementById('ifl-body');
  body.innerHTML = THEME_DEFS.map(function(td) {
    const label = t('ifl_' + td.key);
    const sel = _iflSelection.includes(td.key);
    return '<button class="ifl-card' + (sel ? ' selected' : '') + '" data-theme="' + td.key + '" onclick="_toggleThemeCard(\'' + td.key + '\')">' +
      '<span class="ifl-card-icon">' + td.icon + '</span>' +
      '<span class="ifl-card-label">' + label + '</span>' +
      '</button>';
  }).join('');
}

function _toggleThemeCard(key) {
  const idx = _iflSelection.indexOf(key);
  if (idx >= 0) _iflSelection.splice(idx, 1);
  else _iflSelection.push(key);
  _renderThemeCards();
}

function _updateIflTitle() {
  const el = document.getElementById('ifl-title');
  if (el) el.textContent = t('ifl_title');
}

function applyThemes() {
  state.themes = _iflSelection.slice();
  closeThemeModal();
  // Update button active state
  var btn = document.getElementById('ifl-btn');
  var mobBtn = document.getElementById('mob-ifl-btn');
  if (btn) btn.classList.toggle('active', state.themes.length > 0);
  if (mobBtn) mobBtn.classList.toggle('active', state.themes.length > 0);
  updateClearBtn();
  renderList();
  syncMarkers();
  // Pulse the Route button to hint users can plan a route with filtered results
  if (state.themes.length > 0) _pulseRouteBtn();
}

function _pulseRouteBtn() {
  var desktop = document.getElementById('route-btn');
  var mobile = document.getElementById('mob-route-btn');
  [desktop, mobile].forEach(function(el) {
    if (!el) return;
    el.classList.add('pulse-hint');
    setTimeout(function() { el.classList.remove('pulse-hint'); }, 5000);
  });
}

function clearThemes() {
  _iflSelection = [];
  state.themes = [];
  _renderThemeCards();
  var btn = document.getElementById('ifl-btn');
  var mobBtn = document.getElementById('mob-ifl-btn');
  if (btn) btn.classList.remove('active');
  if (mobBtn) mobBtn.classList.remove('active');
  closeThemeModal();
  updateClearBtn();
  renderList();
  syncMarkers();
}

// ══════════════════════════════════════════════════════════════════
