// FAVORITES & VISITED
// ══════════════════════════════════════════════════════════════════
var _FAV_KEY = 'archwander_favs_v1';
var _VIS_KEY = 'archwander_visited_v1';
var _favSet = new Set(JSON.parse(localStorage.getItem(_FAV_KEY) || '[]'));
var _visSet = new Set(JSON.parse(localStorage.getItem(_VIS_KEY) || '[]'));
var _favFilterActive = false;

function _saveFavs() { localStorage.setItem(_FAV_KEY, JSON.stringify([..._favSet])); }
function _saveVis()  { localStorage.setItem(_VIS_KEY, JSON.stringify([..._visSet])); }

function isFav(id)     { return _favSet.has(id); }
function isVisited(id) { return _visSet.has(id); }

function toggleFav(id) {
  if (_favSet.has(id)) _favSet.delete(id); else _favSet.add(id);
  _saveFavs();
  _updateFavBtns(id);
  _refreshMarkerIcon(id);
  if (_favFilterActive) _applyFavFilter();
}

function toggleVisited(id) {
  if (_visSet.has(id)) _visSet.delete(id); else _visSet.add(id);
  _saveVis();
  _updateFavBtns(id);
  _refreshMarkerIcon(id);
  if (_favFilterActive) _applyFavFilter();
}

function _updateFavBtns(id) {
  const fb = document.getElementById('p-fav-btn');
  const vb = document.getElementById('p-vis-btn');
  if (fb) {
    fb.classList.toggle('fav-active', _favSet.has(id));
    fb.innerHTML = `<span class="act-icon">${_favSet.has(id) ? '★' : '☆'}</span> ${t('fav_label')}`;
  }
  if (vb) {
    vb.classList.toggle('vis-active', _visSet.has(id));
    vb.innerHTML = `<span class="act-icon">${_visSet.has(id) ? '✓' : '○'}</span> ${t('vis_label')}`;
  }
}

function _refreshMarkerIcon(id) {
  const entry = markers.find(e => e.loc.id === id);
  if (!entry) return;
  const loc = entry.loc;
  entry.m.setIcon(_buildLocIcon(loc));
}

function _buildLocIcon(loc) {
  const S = 26; // marker size (10% up from 24)
  const color = CAT_COLORS[_pCat(loc)] || '#111';
  const fav = isFav(loc.id);
  const vis = isVisited(loc.id);
  // Star overlay — same size for fav and fav+vis, with white outline
  const starOverlay = fav
    ? `<span style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:28px;color:#FF5F00;-webkit-text-stroke:2px white;paint-order:stroke fill;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4));transform:rotate(45deg);line-height:1">★</span>`
    : '';
  if (vis) {
    // Visited (or fav+vis): hollow — white fill, black outline
    return L.divIcon({
      className: '',
      html: `<div class="m-pin-wrap"><div style="position:relative;width:${S}px;height:${S}px;background:white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid #333;box-shadow:0 2px 8px rgba(0,0,0,0.15)">${starOverlay}</div></div>`,
      iconSize: [S, S], iconAnchor: [S/2, S]
    });
  }
  // Default (or fav-only) marker — original category color
  return L.divIcon({
    className: '',
    html: `<div class="m-pin-wrap"><div style="position:relative;width:${S}px;height:${S}px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${starOverlay}</div></div>`,
    iconSize: [S, S], iconAnchor: [S/2, S]
  });
}

function toggleFavFilter() {
  _favFilterActive = !_favFilterActive;
  document.getElementById('fav-btn').classList.toggle('active', _favFilterActive);
  // Show/hide export-import bar on all screen sizes
  document.getElementById('fav-io-bar').classList.toggle('visible', _favFilterActive);
  _applyFavFilter();
}

function closeFavIOBar() {
  document.getElementById('fav-io-bar').classList.remove('visible');
}

function _applyFavFilter() {
  if (!clusterGroup) return;
  const favVisIds = new Set([..._favSet, ..._visSet]);
  markers.forEach(({ loc, m }) => {
    if (loc.city !== activeCityKey) return;
    if (_favFilterActive && !favVisIds.has(loc.id)) {
      m.setOpacity(0.34);
    } else {
      m.setOpacity(1);
    }
  });
}

// ── Fav Export / Import ─────────────────────────────────────────
function favExportJSON() {
  if (!_favSet.size && !_visSet.size) {
    alert(t('fav_exp_empty'));
    return;
  }
  // Build simple array: { id, fav: "Y"/"N", visited: "Y"/"N" }
  const allIds = new Set([..._favSet, ..._visSet]);
  const entries = [...allIds].map(id => ({
    id,
    fav:     _favSet.has(id) ? 'Y' : 'N',
    visited: _visSet.has(id) ? 'Y' : 'N'
  }));
  const data = {
    _format: 'archwander-favs-v2',
    exported: new Date().toISOString(),
    data: entries
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `ArchWander_favorites_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

var _favImportMode = null; // 'overwrite' | 'append'

function favImportJSON() {
  // Show mode selection modal
  document.getElementById('fav-import-overlay').classList.add('visible');
}

function closeFavImportModal() {
  document.getElementById('fav-import-overlay').classList.remove('visible');
  _favImportMode = null;
}

function favDoImport(mode) {
  _favImportMode = mode;
  closeFavImportModal();
  // Trigger file picker
  document.getElementById('fav-import-file').value = '';
  document.getElementById('fav-import-file').click();
}

function _handleFavFileSelected(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      let importFavs = [], importVis = [];

      if (data._format === 'archwander-favs-v2' && Array.isArray(data.data)) {
        // v2: array of { id, fav:"Y"/"N", visited:"Y"/"N" }
        data.data.forEach(entry => {
          if (entry.fav === 'Y')     importFavs.push(entry.id);
          if (entry.visited === 'Y') importVis.push(entry.id);
        });
      } else if (data._format === 'archwander-favs-v1' && Array.isArray(data.favorites)) {
        // v1 backward compat
        importFavs = data.favorites;
        importVis  = data.visited || [];
      } else {
        alert(t('fav_imp_invalid'));
        return;
      }

      if (_favImportMode === 'overwrite') {
        _favSet = new Set(importFavs);
        _visSet = new Set(importVis);
      } else {
        importFavs.forEach(id => _favSet.add(id));
        importVis.forEach(id  => _visSet.add(id));
      }
      // Persist to localStorage
      localStorage.setItem(_FAV_KEY, JSON.stringify([..._favSet]));
      localStorage.setItem(_VIS_KEY, JSON.stringify([..._visSet]));
      // Refresh markers
      markers.forEach(({ loc, m }) => m.setIcon(_buildLocIcon(loc)));
      _applyFavFilter();
      renderList();
      alert(t('fav_imp_success'));
    } catch {
      alert(t('fav_imp_invalid'));
    }
  };
  reader.readAsText(file);
}

// ══════════════════════════════════════════════════════════════════
// CITY SELECTOR + LAZY LOADING
// ══════════════════════════════════════════════════════════════════
var CITY_META = {
  nyc: { key: 'new-york', label: '🗽 New York', localLang: 'en', lat: 40.7549, lng: -73.9840, zoom: 13, dataVar: 'LOCS_NEW_YORK', koVar: 'LOCS_KO_NEW_YORK' },
  sel: { key: 'seoul',    label: '🏙 Seoul',    localLang: 'ko', lat: 37.5665, lng: 126.9780, zoom: 13, dataVar: 'LOCS_SEOUL',    koVar: 'LOCS_KO_SEOUL' },
  lon: { key: 'london',   label: '🎡 London',   localLang: 'en', lat: 51.5074, lng: -0.1278,  zoom: 13, dataVar: 'LOCS_LONDON',   koVar: 'LOCS_KO_LONDON' },
  tky: { key: 'tokyo',    label: '🗼 Tokyo',    localLang: 'ja', lat: 35.6762, lng: 139.6503, zoom: 13, dataVar: 'LOCS_TOKYO',    koVar: 'LOCS_KO_TOKYO' }
};

// Track which city data files have been loaded
var _loadedCities = {};

// Dynamically load a script and return a Promise
// force=true re-adds the script even if already in DOM (for data reload after storage reset)
function _loadScript(src, force) {
  return new Promise(function(resolve, reject) {
    var existing = document.querySelector('script[src="' + src + '"]');
    if (existing && !force) { resolve(); return; }
    if (existing && force) existing.remove();
    var s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = function() { reject(new Error('Failed to load ' + src)); };
    document.head.appendChild(s);
  });
}

// Load city data file on demand → merge into LOCS
function loadCityData(cityCode) {
  if (_loadedCities[cityCode]) return Promise.resolve();
  var meta = CITY_META[cityCode];
  if (!meta) return Promise.reject(new Error('Unknown city: ' + cityCode));

  var dataFile = 'data-' + meta.key + '.js';
  var koFile   = 'data-ko-' + meta.key + '.js';
  // Force reload if script was previously loaded but _loadedCities was cleared
  var needsForce = !!document.querySelector('script[src="' + dataFile + '"]');

  return _loadScript(dataFile, needsForce).then(function() {
    // The data file defines a global variable (e.g. LOCS_NEW_YORK)
    var cityLocs = window[meta.dataVar];
    if (!cityLocs) { console.warn('[lazy] No data var:', meta.dataVar); return; }
    // Handle .push() pattern (London, NY) — data is already in the array
    var freshLocs = Array.isArray(cityLocs) ? cityLocs : [];
    // Merge with localStorage edits
    var merged = _mergeLocsFromStorage(freshLocs);
    // Filter: only this city's entries from merged data
    var cityIds = new Set(freshLocs.map(function(l) { return l.id; }));
    var cityMerged = merged.filter(function(l) { return cityIds.has(l.id); });
    // Add to LOCS (avoid duplicates)
    var existingIds = new Set(LOCS.map(function(l) { return l.id; }));
    cityMerged.forEach(function(l) {
      if (!existingIds.has(l.id)) LOCS.push(l);
    });
    _loadedCities[cityCode] = true;
    console.log('[lazy] Loaded ' + dataFile + ': ' + freshLocs.length + ' locations');
    // Also load Korean translation file and merge into LOCS_KO
    var koForce = !!document.querySelector('script[src="' + koFile + '"]');
    return _loadScript(koFile, koForce).then(function() {
      var koData = window[meta.koVar];
      if (koData && typeof LOCS_KO !== 'undefined') {
        Object.assign(LOCS_KO, koData);
        console.log('[lazy] Merged KO translations for ' + meta.key);
      }
    }).catch(function() { /* ko file optional */ });
  });
}

// Preload remaining cities in background after initial load
function _preloadOtherCities() {
  Object.keys(CITY_META).forEach(function(code) {
    if (!_loadedCities[code]) {
      setTimeout(function() { loadCityData(code); }, 500);
    }
  });
}

// ── Bilingual name / address helpers ──────────────────────────
// Returns the city's local language code for a given location
function _cityLocalLang(loc) {
  for (const m of Object.values(CITY_META)) if (m.key === loc.city) return m.localLang;
  return 'en';
}

// Get a field value in the city's local language (from LOCS_KO or loc.local* fields)
function _localField(loc, field) {
  const ll = _cityLocalLang(loc);
  if (ll === 'en') return loc[field] || '';                    // English city — original English value
  if (ll === 'ko') return (typeof LOCS_KO !== 'undefined' && LOCS_KO[loc.id]?.[field]) || '';
  // ja, fr, etc. — stored in data file as localName, localAddr, localHood
  const key = 'local' + field.charAt(0).toUpperCase() + field.slice(1);
  return loc[key] || '';
}

// Generic bilingual field:  uiValue / localValue  (when UI lang ≠ city local lang)
// transVal = optional pre-computed UI-language value (from runtime translation system)
function _biField(loc, field, transVal) {
  const ll = _cityLocalLang(loc);
  // UI-language value: trans > LOCS_KO > raw English
  const ui = transVal
    || ((LANG === 'ko' && typeof LOCS_KO !== 'undefined' && LOCS_KO[loc.id]?.[field]) ? LOCS_KO[loc.id][field] : '')
    || loc[field] || '';
  if (LANG === ll) return ui;                                  // same language → single value
  const local = _localField(loc, field);
  if (!local || local === ui) return ui;
  return `${ui} / ${local}`;
}

// Convenience wrappers
function _displayName(loc, transName) { return _biField(loc, 'name', transName); }
function _displayAddr(loc, transAddr) { return _biField(loc, 'addr', transAddr); }
function _displayHood(loc, transHood) { return _biField(loc, 'hood', transHood); }
var activeCity    = 'nyc';   // default — overridden by GPS in boot
var activeCityKey = 'new-york';

function selectCity(city) {
  if (city === activeCity) return;
  var meta = CITY_META[city];
  if (!meta) return;

  // Lazy-load city data if not yet loaded, then switch
  loadCityData(city).then(function() {
    activeCity    = city;
    activeCityKey = meta.key;
    // Clear walk filter when switching cities
    if (walkActive) clearWalkFilter();
    // Fly map to city center
    if (window.map) map.flyTo([meta.lat, meta.lng], meta.zoom, { duration: 1.2 });
    // Sync mobile city select
    var _msel = document.getElementById('city-select-mobile');
    if (_msel) _msel.value = city;
    refreshApp();
  }).catch(function(err) {
    console.error('[selectCity] Failed to load data for', city, err);
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // Cancel pin drop mode if active (go back to "waiting" state, not full deactivate)
    if (pinDropMode) {
      pinDropMode = false;
      map.getContainer().style.cursor = '';
      document.getElementById('walk-pin-btn').classList.remove('locating');
      return;
    }
    closePanel();
  }
});

// ══════════════════════════════════════════════════════════════════
// GPS → NEAREST CITY
// ══════════════════════════════════════════════════════════════════
function _nearestCity(lat, lng) {
  let best = 'nyc', bestDist = Infinity;
  for (const [code, m] of Object.entries(CITY_META)) {
    const dLat = lat - m.lat, dLng = lng - m.lng;
    const d = dLat * dLat + dLng * dLng;
    if (d < bestDist) { bestDist = d; best = code; }
  }
  return best;
}

function _initCityByGPS() {
  return new Promise(resolve => {
    if (!navigator.geolocation) { resolve('nyc'); return; }
    navigator.geolocation.getCurrentPosition(
      pos => resolve(_nearestCity(pos.coords.latitude, pos.coords.longitude)),
      () => resolve('nyc'),
      { timeout: 4000, maximumAge: 300000 }
    );
  });
}

// ══════════════════════════════════════════════════════════════════
