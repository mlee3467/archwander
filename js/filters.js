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
  const bodyId = key === 'arch' ? 'body-arch' : `body-${key}`;
  const selector = key === 'arch' ? '.arch-item' : '.chip';
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
  ['cat','style','era','access','arch','fav'].forEach(k => {
    state[k] = _MULTI_KEYS.has(k) ? [] : 'All';
    const bodyId = k === 'arch' ? 'body-arch' : `body-${k}`;
    const sel = k === 'arch' ? '.arch-item' : '.chip';
    document.getElementById(bodyId).querySelectorAll(sel).forEach(b =>
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
  const active = ['cat','style','era','access','arch','fav'].some(k =>
    _MULTI_KEYS.has(k) ? state[k].length > 0 : state[k] !== 'All'
  );
  document.getElementById('sb-clear').classList.toggle('show', active);
}

function toggleFsec(id) {
  const sec = document.getElementById(`fsec-${id}`);
  sec.classList.toggle('open');
}

// ══════════════════════════════════════════════════════════════════
