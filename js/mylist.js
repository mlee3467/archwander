// ══════════════════════════════════════════════════════════════════
// MY LIST  —  custom location curation & saved lists
// ══════════════════════════════════════════════════════════════════

var _ML_ACTIVE_KEY = 'aw_my_list_v1';
var _ML_SAVED_KEY  = 'aw_saved_lists_v1';

var _myListIds = [];          // ordered array of location IDs (active/working list)
var _myListSet = new Set();   // fast O(1) membership test

// ── Boot ──────────────────────────────────────────────────────────
(function _mlBoot() {
  try {
    var raw = localStorage.getItem(_ML_ACTIVE_KEY);
    if (raw) {
      _myListIds = JSON.parse(raw) || [];
      _myListSet = new Set(_myListIds);
    }
  } catch(e) {}
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _mlUpdateBadge);
  } else {
    _mlUpdateBadge();
  }
})();

// ── Public: toggle a location in/out of the working list ──────────
function toggleMyList(locId) {
  if (_myListSet.has(locId)) {
    _myListIds = _myListIds.filter(function(id) { return id !== locId; });
    _myListSet.delete(locId);
  } else {
    _myListIds.push(locId);
    _myListSet.add(locId);
  }
  _mlSaveActive();
  _mlUpdateBadge();

  // Refresh the action button in the detail panel if it's showing this loc
  var btn = document.getElementById('p-list-btn');
  if (btn && btn.getAttribute('data-loc-id') === locId) {
    var active = _myListSet.has(locId);
    btn.className = 'p-action-btn' + (active ? ' list-active' : '');
    btn.innerHTML = '<span class="act-icon">' + (active ? '✓' : '+') + '</span> ' +
                    (active ? 'In List' : 'List');
  }

  // Re-render panel body if panel is visible
  var panel = document.getElementById('mylist-panel');
  if (panel && panel.classList.contains('visible')) _mlRenderBody();
}

// ── Public: check membership (used by core.js renderDetail) ───────
function isInMyList(locId) {
  return _myListSet.has(locId);
}

// ── Persistence ───────────────────────────────────────────────────
function _mlSaveActive() {
  try { localStorage.setItem(_ML_ACTIVE_KEY, JSON.stringify(_myListIds)); } catch(e) {}
}

function _mlGetSaved() {
  try { return JSON.parse(localStorage.getItem(_ML_SAVED_KEY) || '[]'); } catch(e) { return []; }
}

function _mlPutSaved(arr) {
  try { localStorage.setItem(_ML_SAVED_KEY, JSON.stringify(arr)); } catch(e) {}
}

// ── Badge on the sba-list button ──────────────────────────────────
function _mlUpdateBadge() {
  var badge = document.getElementById('sba-list-badge');
  if (!badge) return;
  var n = _myListIds.length;
  badge.textContent = n > 99 ? '99+' : String(n);
  badge.style.display = n > 0 ? '' : 'none';
}

// ── Resolve IDs → location objects (from global LOCS) ─────────────
function _mlResolveLocs(ids) {
  if (typeof LOCS === 'undefined' || !LOCS) return [];
  var lookup = {};
  LOCS.forEach(function(l) { lookup[l.id] = l; });
  return ids.map(function(id) { return lookup[id]; }).filter(Boolean);
}

// ══════════════════════════════════════════════════════════════════
// PANEL OPEN / CLOSE
// ══════════════════════════════════════════════════════════════════

function openMyListPanel() {
  var panel = document.getElementById('mylist-panel');
  if (!panel) { _mlCreatePanel(); panel = document.getElementById('mylist-panel'); }
  panel.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { panel.classList.add('visible'); });
  });
  _mlRenderBody();
  var sbaBtn = document.getElementById('sba-list');
  if (sbaBtn) sbaBtn.classList.add('sba-active');
}

function closeMyListPanel() {
  var panel = document.getElementById('mylist-panel');
  if (!panel) return;
  panel.classList.remove('visible');
  setTimeout(function() {
    if (!panel.classList.contains('visible')) panel.style.display = 'none';
  }, 220);
  var sbaBtn = document.getElementById('sba-list');
  if (sbaBtn) sbaBtn.classList.remove('sba-active');
}

function _mlCreatePanel() {
  var el = document.createElement('div');
  el.id = 'mylist-panel';
  el.style.display = 'none';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'My List');
  el.innerHTML =
    '<div class="ml-box" onclick="event.stopPropagation()">' +
      '<div class="ml-hdr">' +
        '<span class="ml-title">My List</span>' +
        '<button class="ml-hdr-close" onclick="closeMyListPanel()" aria-label="Close">✕</button>' +
      '</div>' +
      '<div class="ml-body" id="ml-body"></div>' +
    '</div>';
  el.addEventListener('click', function(e) { if (e.target === el) closeMyListPanel(); });
  document.body.appendChild(el);
}

// ══════════════════════════════════════════════════════════════════
// RENDER PANEL BODY
// ══════════════════════════════════════════════════════════════════

function _mlRenderBody() {
  var body = document.getElementById('ml-body');
  if (!body) return;

  var locs  = _mlResolveLocs(_myListIds);
  var saved = _mlGetSaved();
  var html  = '';

  // ── Current selection ──────────────────────────────────────────
  html += '<div class="ml-section">';
  html += '<div class="ml-sec-hdr">';
  html += '<span class="ml-sec-title">Current selection' +
          (locs.length > 0 ? ' <span class="ml-count">(' + locs.length + ')</span>' : '') + '</span>';
  if (locs.length > 0) {
    html += '<div class="ml-sec-acts">' +
      '<button class="ml-btn ml-btn-primary" onclick="_mlUseInRoute()">→ Route</button>' +
      '<button class="ml-btn ml-btn-save" onclick="_mlShowSavePrompt()">Save</button>' +
      '<button class="ml-btn ml-btn-clear" onclick="_mlClearActive()">Clear</button>' +
    '</div>';
  }
  html += '</div>'; // .ml-sec-hdr

  if (locs.length === 0) {
    html += '<div class="ml-empty">' +
      '<div class="ml-empty-title">No locations selected</div>' +
      '<div class="ml-empty-desc">Open any location and tap <strong>+ List</strong> to add it here.</div>' +
    '</div>';
  } else {
    html += '<div class="ml-items">';
    locs.forEach(function(loc) {
      var color = (typeof _ccMeta === 'function') ? _ccMeta(loc).color : '#888';
      html += '<div class="ml-item">' +
        '<div class="ml-item-dot" style="background:' + color + '"></div>' +
        '<div class="ml-item-info">' +
          '<div class="ml-item-name">' + _mlEsc(loc.name || '') + '</div>' +
          '<div class="ml-item-meta">' +
            _mlEsc((loc.city || '').replace(/-/g, ' ')) +
            (loc.hood ? ' · ' + _mlEsc(loc.hood) : '') +
          '</div>' +
        '</div>' +
        '<button class="ml-item-del" onclick="toggleMyList(\'' + loc.id + '\')" aria-label="Remove">✕</button>' +
      '</div>';
    });
    html += '</div>'; // .ml-items
  }
  html += '</div>'; // .ml-section

  // ── Save-name prompt (shown on demand) ─────────────────────────
  html += '<div class="ml-save-row" id="ml-save-row" style="display:none">' +
    '<input class="ml-save-input" id="ml-save-input" type="text" placeholder="List name…" maxlength="60"' +
      ' onkeydown="if(event.key===\'Enter\')_mlConfirmSave()">' +
    '<button class="ml-btn ml-btn-primary" onclick="_mlConfirmSave()">Save</button>' +
    '<button class="ml-btn" onclick="_mlHideSavePrompt()">Cancel</button>' +
  '</div>';

  // ── Saved lists ────────────────────────────────────────────────
  html += '<div class="ml-section ml-saved-section">';
  html += '<div class="ml-sec-hdr">' +
    '<span class="ml-sec-title">Saved lists' +
    (saved.length > 0 ? ' <span class="ml-count">(' + saved.length + ')</span>' : '') +
    '</span></div>';

  if (saved.length === 0) {
    html += '<div class="ml-saved-empty">Save your selection to reuse it later.</div>';
  } else {
    saved.forEach(function(list) {
      html += '<div class="ml-saved-item">' +
        '<div class="ml-saved-info">' +
          '<div class="ml-saved-name">' + _mlEsc(list.name) + '</div>' +
          '<div class="ml-saved-meta">' + list.locIds.length + ' locations · ' + _mlFmtDate(list.date) + '</div>' +
        '</div>' +
        '<div class="ml-saved-btns">' +
          '<button class="ml-load-btn" onclick="_mlLoadSaved(\'' + list.id + '\')">Load</button>' +
          '<button class="ml-del-btn" onclick="_mlDeleteSaved(\'' + list.id + '\')" aria-label="Delete">✕</button>' +
        '</div>' +
      '</div>';
    });
  }
  html += '</div>'; // .ml-saved-section

  body.innerHTML = html;
}

// ══════════════════════════════════════════════════════════════════
// ACTIONS
// ══════════════════════════════════════════════════════════════════

// Send working list to route planner
function _mlUseInRoute() {
  var locs = _mlResolveLocs(_myListIds);
  if (!locs.length) return;
  closeMyListPanel();
  if (typeof _buildRouteChunks === 'function' && typeof openRoutePanel === 'function') {
    _routeChunks   = _buildRouteChunks(locs);
    _activeChunkIdx = 0;
    _chunkStarts   = _routeChunks.map(function() { return null; });
    routeLocations = _routeChunks[0].slice();
    openRoutePanel();
  }
}

// Show/hide save-name prompt
function _mlShowSavePrompt() {
  var row = document.getElementById('ml-save-row');
  if (!row) return;
  row.style.display = 'flex';
  var inp = document.getElementById('ml-save-input');
  if (inp) { inp.value = ''; setTimeout(function() { inp.focus(); }, 50); }
}

function _mlHideSavePrompt() {
  var row = document.getElementById('ml-save-row');
  if (row) row.style.display = 'none';
}

function _mlConfirmSave() {
  var inp = document.getElementById('ml-save-input');
  var name = inp ? inp.value.trim() : '';
  if (!name) { if (inp) inp.focus(); return; }
  var saved = _mlGetSaved();
  saved.unshift({
    id:     'ml-' + Date.now(),
    name:   name,
    locIds: _myListIds.slice(),
    date:   new Date().toISOString()
  });
  _mlPutSaved(saved);
  _mlHideSavePrompt();
  _mlRenderBody();
}

// Clear the working list
function _mlClearActive() {
  _myListIds = [];
  _myListSet = new Set();
  _mlSaveActive();
  _mlUpdateBadge();
  _mlRenderBody();
  // Reset any open detail-panel button
  var btn = document.getElementById('p-list-btn');
  if (btn) {
    btn.className = 'p-action-btn';
    btn.innerHTML = '<span class="act-icon">+</span> List';
  }
}

// Load a saved list into the working list
function _mlLoadSaved(listId) {
  var list = _mlGetSaved().filter(function(l) { return l.id === listId; })[0];
  if (!list) return;
  _myListIds = list.locIds.slice();
  _myListSet = new Set(_myListIds);
  _mlSaveActive();
  _mlUpdateBadge();
  _mlRenderBody();
  // Refresh detail-panel button if open
  var btn = document.getElementById('p-list-btn');
  if (btn) {
    var locId  = btn.getAttribute('data-loc-id');
    var active = locId ? _myListSet.has(locId) : false;
    btn.className = 'p-action-btn' + (active ? ' list-active' : '');
    btn.innerHTML = '<span class="act-icon">' + (active ? '✓' : '+') + '</span> ' +
                    (active ? 'In List' : 'List');
  }
}

function _mlDeleteSaved(listId) {
  _mlPutSaved(_mlGetSaved().filter(function(l) { return l.id !== listId; }));
  _mlRenderBody();
}

// ── Helpers ───────────────────────────────────────────────────────
function _mlEsc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function _mlFmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined,
      { month: 'short', day: 'numeric', year: 'numeric' });
  } catch(e) { return ''; }
}
