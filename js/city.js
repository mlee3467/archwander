// FAVORITES & VISITED
// ══════════════════════════════════════════════════════════════════
var _FAV_KEY      = 'archwander_favs_v1';
var _VIS_KEY      = 'archwander_visited_v1';
var _VIS_DATE_KEY = 'aw_visit_dates_v1';
var _VIS_NOTE_KEY = 'aw_visit_notes_v1';
var _favSet = new Set(JSON.parse(localStorage.getItem(_FAV_KEY) || '[]'));
var _visSet = new Set(JSON.parse(localStorage.getItem(_VIS_KEY) || '[]'));
var _favFilterActive = false;

function _saveFavs() { localStorage.setItem(_FAV_KEY, JSON.stringify([..._favSet])); }
function _saveVis()  { localStorage.setItem(_VIS_KEY, JSON.stringify([..._visSet])); }

function isFav(id)     { return _favSet.has(id); }
function isVisited(id) { return _visSet.has(id); }

// ── Visit date helpers ────────────────────────────────────────────
function _readVisitDates() { try { return JSON.parse(localStorage.getItem(_VIS_DATE_KEY) || '{}'); } catch(e) { return {}; } }
function _readVisitNotes() { try { return JSON.parse(localStorage.getItem(_VIS_NOTE_KEY) || '{}'); } catch(e) { return {}; } }
function getVisitDate(id) { return _readVisitDates()[id] || ''; }
function getVisitNote(id) { return _readVisitNotes()[id] || ''; }
function setVisitDate(id, date) {
  var d = _readVisitDates();
  if (date) d[id] = date; else delete d[id];
  localStorage.setItem(_VIS_DATE_KEY, JSON.stringify(d));
}
function setVisitNote(id, note) {
  var n = _readVisitNotes();
  if (note) n[id] = note; else delete n[id];
  localStorage.setItem(_VIS_NOTE_KEY, JSON.stringify(n));
}
function saveVisitDateFromUI(id) {
  var el = document.getElementById('visit-date-' + id);
  if (el) setVisitDate(id, el.value);
}
function saveVisitNoteFromUI(id) {
  var el  = document.getElementById('visit-note-' + id);
  var btn = document.getElementById('visit-note-save-' + id);
  if (!el) return;
  setVisitNote(id, el.value.trim());
  if (btn) {
    btn.textContent = '✓';
    setTimeout(function() { if (btn) btn.textContent = LANG === 'ko' ? '저장' : 'Save'; }, 1200);
  }
}

// Build the visit-date + note sub-section HTML
function _buildVisitSectionHTML(id) {
  var date  = getVisitDate(id);
  var note  = getVisitNote(id);
  var isKo  = LANG === 'ko';
  var safeNote = (note || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;');
  return '<div class="vs-row">' +
      '<span class="vs-label">' + (isKo ? '방문일' : 'Visit date') + '</span>' +
      '<input type="date" class="vs-date-input" id="visit-date-' + id + '"' +
        ' value="' + (date || '') + '" onchange="saveVisitDateFromUI(\'' + id + '\')">' +
    '</div>' +
    '<div class="vs-row">' +
      '<input type="text" class="vs-note-input" id="visit-note-' + id + '"' +
        ' value="' + safeNote + '"' +
        ' placeholder="' + (isKo ? '한 줄 메모 (선택)' : 'One-line note (optional)') + '" maxlength="140">' +
      '<button class="vs-save-btn" id="visit-note-save-' + id + '"' +
        ' onclick="saveVisitNoteFromUI(\'' + id + '\')">' + (isKo ? '저장' : 'Save') + '</button>' +
    '</div>';
}

// Called after toggling visited — refreshes the panel sub-section in place
function _updateVisitSection(id) {
  var sec = document.getElementById('visit-section-' + id);
  if (!sec) return;
  if (_visSet.has(id)) {
    sec.innerHTML = _buildVisitSectionHTML(id);
    sec.style.display = '';
  } else {
    sec.style.display = 'none';
  }
}

function toggleFav(id) {
  if (_favSet.has(id)) _favSet.delete(id); else _favSet.add(id);
  _saveFavs();
  _updateFavBtns(id);
  _refreshMarkerIcon(id);
  if (_favFilterActive) _applyFavFilter();
  _updatePassportStats();
}

function toggleVisited(id) {
  var wasVisited = _visSet.has(id);
  if (wasVisited) _visSet.delete(id); else _visSet.add(id);
  _saveVis();
  // Auto-record today when first marking visited; keep date if re-toggling
  if (!wasVisited && !getVisitDate(id)) {
    setVisitDate(id, new Date().toISOString().slice(0, 10));
  }
  _updateFavBtns(id);
  _updateVisitSection(id);
  _refreshMarkerIcon(id);
  if (_favFilterActive) _applyFavFilter();
  _updatePassportStats();
}

// ── My Passport stats ────────────────────────────────────────────
function _updatePassportStats() {
  var el = document.getElementById('passport-stats');
  if (!el) return;
  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';
  var visArr = [..._visSet];
  var favArr = [..._favSet];
  var total  = visArr.length;
  var totalF = favArr.length;
  if (total === 0 && totalF === 0) { el.innerHTML = ''; el.style.display = 'none'; return; }
  el.style.display = '';

  // Per-city breakdown of visited
  var cityMeta = typeof CITY_META !== 'undefined' ? CITY_META : {};
  var cityOrder = Object.keys(cityMeta);
  // Build counts from LOCS
  var visByCity = {};
  cityOrder.forEach(function(c) { visByCity[c] = 0; });
  if (typeof LOCS !== 'undefined') {
    LOCS.forEach(function(l) {
      if (_visSet.has(l.id) && visByCity.hasOwnProperty(l.city)) {
        visByCity[l.city]++;
      }
    });
  }
  // Most recent visit
  var dates = _readVisitDates();
  var recentId = null, recentDate = '';
  Object.keys(dates).forEach(function(id) {
    if (_visSet.has(id) && dates[id] > recentDate) {
      recentDate = dates[id]; recentId = id;
    }
  });
  var recentName = '';
  if (recentId && typeof LOCS !== 'undefined') {
    var rLoc = LOCS.find(function(l) { return l.id === recentId; });
    if (rLoc) recentName = rLoc.name;
  }

  // City bars
  var maxCityVis = Math.max(1, Math.max.apply(null, cityOrder.map(function(c) { return visByCity[c] || 0; })));
  var cityBars = cityOrder.filter(function(c) { return (visByCity[c] || 0) > 0; }).map(function(c) {
    var count = visByCity[c] || 0;
    var pct   = Math.round((count / maxCityVis) * 100);
    // Short label for passport bar: "NYC", "SEL", "LON", "TKY"
    var label = c.toUpperCase();
    return '<div class="pp-city-row">' +
      '<span class="pp-city-lbl">' + label + '</span>' +
      '<div class="pp-city-track"><div class="pp-city-fill" style="width:' + pct + '%"></div></div>' +
      '<span class="pp-city-num">' + count + '</span>' +
    '</div>';
  }).join('');

  var recentHtml = recentName
    ? '<div class="pp-recent">' + (isKo ? '최근: ' : 'Recent: ') + '<span>' + recentName + '</span></div>'
    : '';

  var legendHtml =
    '<div class="pp-legend">' +
      '<div class="pp-legend-row">' +
        '<span class="pp-legend-icon pp-leg-vis">✓</span>' +
        '<span class="pp-legend-desc">' + (isKo ? '방문 완료 — 체크마크로 기록, 날짜 자동 저장' : 'Visited — marked with ✓, date auto-saved') + '</span>' +
      '</div>' +
      '<div class="pp-legend-row">' +
        '<span class="pp-legend-icon pp-leg-fav">♥</span>' +
        '<span class="pp-legend-desc">' + (isKo ? '즐겨찾기 — 가고 싶은 곳 저장' : 'Favorites — places you want to visit') + '</span>' +
      '</div>' +
      '<div class="pp-legend-row">' +
        '<span class="pp-legend-icon pp-leg-route">🗺</span>' +
        '<span class="pp-legend-desc">' + (isKo ? '루트 — 계획한 도보 코스' : 'Route — your planned walking course') + '</span>' +
      '</div>' +
    '</div>';

  el.innerHTML =
    '<div class="pp-hdr">' +
      '<span class="pp-icon">🏛</span>' +
      '<span class="pp-title">' + (isKo ? '내 건축 여행' : 'My Journey') + '</span>' +
    '</div>' +
    '<div class="pp-counts">' +
      '<span class="pp-count-vis"><span class="pp-num">' + total + '</span> ' + (isKo ? '방문' : 'visited') + '</span>' +
      '<span class="pp-sep">·</span>' +
      '<span class="pp-count-fav"><span class="pp-num">' + totalF + '</span> ' + (isKo ? '즐겨찾기' : 'favorites') + '</span>' +
    '</div>' +
    (cityBars ? '<div class="pp-cities">' + cityBars + '</div>' : '') +
    recentHtml +
    legendHtml;
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
  // Pixel-art FLAG marker: vertical pole + colored flag rectangle (RPG map style)
  const color = _ccMeta(loc).color;
  const fav   = isFav(loc.id);
  const vis   = isVisited(loc.id);
  const fill  = vis ? '#f0f0ec' : color;
  // Flag dimensions (all in px)
  const poleW = 2, poleH = 22;
  const flagW = 11, flagH = 9;
  const totalW = poleW + flagW + 2; // +2 for right border
  // ★ inside flag for favorites (orange)
  const star = fav
    ? `<span style="position:absolute;inset:0;display:flex;align-items:center;` +
      `justify-content:center;font-size:7px;color:#FF5F00;` +
      `-webkit-text-stroke:0.5px white;line-height:1">★</span>`
    : '';
  // ✓ badge below base for visited (green dot)
  const visBadge = vis
    ? `<div style="position:absolute;bottom:-6px;left:-1px;` +
      `width:7px;height:7px;border-radius:50%;` +
      `background:#22c55e;border:1.5px solid #fff;` +
      `box-shadow:0 1px 3px rgba(0,0,0,0.4)"></div>`
    : '';
  return L.divIcon({
    className: '',
    html:
      `<div style="position:relative;width:${totalW}px;height:${poleH + 6}px">` +
        // Pole
        `<div style="position:absolute;left:0;top:0;width:${poleW}px;height:${poleH}px;background:#1a1a1a"></div>` +
        // Flag body
        `<div style="position:absolute;left:${poleW}px;top:1px;` +
             `width:${flagW}px;height:${flagH}px;background:${fill};` +
             `border:2px solid #1a1a1a;border-left:none;` +
             `box-shadow:2px 2px 0 rgba(0,0,0,0.38)">${star}</div>` +
        // Base foot
        `<div style="position:absolute;bottom:6px;left:-2px;width:6px;height:2px;background:#1a1a1a"></div>` +
        // Visited green dot
        visBadge +
      `</div>`,
    iconSize:   [totalW, poleH + 6],
    iconAnchor: [1, poleH]   // anchor = bottom of pole
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
  nyc: { key: 'new-york', label: '🗽 New York', localLang: 'en', lat: 40.7580, lng: -73.9855, zoom: 12, dataVar: 'LOCS_NEW_YORK', koVar: 'LOCS_KO_NEW_YORK' },
  sel: { key: 'seoul',    label: '🏙 Seoul',    localLang: 'ko', lat: 37.5663, lng: 126.9779, zoom: 13, dataVar: 'LOCS_SEOUL',    koVar: 'LOCS_KO_SEOUL' },
  lon: { key: 'london',   label: '🎡 London',   localLang: 'en', lat: 51.5101, lng: -0.0763,  zoom: 13, dataVar: 'LOCS_LONDON',   koVar: 'LOCS_KO_LONDON' },
  tky: { key: 'tokyo',    label: '🗼 Tokyo',    localLang: 'ja', lat: 35.6895, lng: 139.6917, zoom: 13, dataVar: 'LOCS_TOKYO',    koVar: 'LOCS_KO_TOKYO' }
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

// Try to read a global variable by name (works for both var and const)
function _getGlobal(name) {
  try { return (0, eval)(name); } catch(e) { return undefined; }
}

// Merge city location data into LOCS
function _mergeCityLocs(cityCode, meta) {
  var cityLocs = _getGlobal(meta.dataVar);
  if (!cityLocs) { console.warn('[lazy] No data var:', meta.dataVar); return; }
  var freshLocs = Array.isArray(cityLocs) ? cityLocs : [];
  var merged = _mergeLocsFromStorage(freshLocs);
  var cityIds = new Set(freshLocs.map(function(l) { return l.id; }));
  var cityMerged = merged.filter(function(l) { return cityIds.has(l.id); });
  var existingIds = new Set(LOCS.map(function(l) { return l.id; }));
  cityMerged.forEach(function(l) {
    if (!existingIds.has(l.id)) LOCS.push(l);
  });
  _loadedCities[cityCode] = true;
  console.log('[lazy] Loaded ' + meta.key + ': ' + freshLocs.length + ' locations');
}

// Merge Korean translations for a city into LOCS_KO
function _mergeKO(meta) {
  var koData = _getGlobal(meta.koVar);
  if (koData && typeof LOCS_KO !== 'undefined') {
    Object.assign(LOCS_KO, koData);
    console.log('[lazy] Merged KO translations for ' + meta.key);
  }
}

// ── DB row → LOCS object ─────────────────────────────────────
function _dbRowToLoc(row) {
  return {
    id:          row.id,
    name:        row.name,
    city:        row.city,
    lat:         row.lat,
    lng:         row.lng,
    cats:        row.cats         || [],
    cc:          row.cc           || '',
    styleGroups: row.style_groups || [],
    era:         row.era          || '',
    arch:        row.arch         || '',
    archs:       row.archs        || [],
    yr:          row.yr           || null,
    localName:   row.local_name   || '',
    access:      row.access       || '',
    addr:        row.addr         || '',
    hood:        row.hood         || '',
    localAddr:   row.local_addr   || '',
    localHood:   row.local_hood   || '',
    desc:        row.description  || '',
    hours:       row.hours        || '',
    lastEntry:   row.last_entry   || '',
    admission:   row.admission    || '',
    tourOk:      row.tour_ok      || false,
    tourInfo:    row.tour_info    || '',
    transit:     row.transit      || '',
    walkFrom:    row.walk_from    || '',
    tags:        row.tags         || [],
    photos:      row.photos       || [],
    sv:          row.sv           || null,
    svInt:       row.sv_int       || null,
  };
}

// ── Supabase city load ────────────────────────────────────────
function _loadCityDataSupabase(cityCode, meta) {
  return _supabase
    .from('locations')
    .select('*')
    .eq('city', meta.key)
    .then(function(result) {
      if (result.error) throw result.error;
      var freshLocs = result.data.map(_dbRowToLoc);
      // Merge with any localStorage edits (admin panel changes)
      var merged    = _mergeLocsFromStorage(freshLocs);
      var cityIds   = new Set(freshLocs.map(function(l) { return l.id; }));
      var cityMerged = merged.filter(function(l) { return cityIds.has(l.id); });
      var existingIds = new Set(LOCS.map(function(l) { return l.id; }));
      cityMerged.forEach(function(l) {
        if (!existingIds.has(l.id)) LOCS.push(l);
      });
      // Merge Korean translations from ko_* columns
      result.data.forEach(function(row) {
        if (row.ko_name || row.ko_desc) {
          LOCS_KO[row.id] = {
            name:      row.ko_name      || '',
            desc:      row.ko_desc      || '',
            hood:      row.ko_hood      || '',
            hours:     row.ko_hours     || '',
            admission: row.ko_admission || '',
            transit:   row.ko_transit   || '',
            walkFrom:  row.ko_walk_from || '',
          };
        }
      });
      _loadedCities[cityCode] = true;
      console.log('[supabase] Loaded', meta.key + ':', freshLocs.length, 'locations');
    });
}

// Load city data on demand.
// ① Supabase가 설정돼 있으면 API로 로드
// ② 아니면 기존 data-*.js 스크립트 방식으로 폴백
function loadCityData(cityCode) {
  if (_loadedCities[cityCode]) return Promise.resolve();
  var meta = CITY_META[cityCode];
  if (!meta) return Promise.reject(new Error('Unknown city: ' + cityCode));

  // ── Supabase path ──
  if (_supabase) return _loadCityDataSupabase(cityCode, meta);

  // ── Legacy script path (폴백) ──
  if (_getGlobal(meta.dataVar)) {
    _mergeCityLocs(cityCode, meta);
    _mergeKO(meta);
    return Promise.resolve();
  }
  var cb = '?_=' + Date.now();
  return _loadScript('data-' + meta.key + '.js' + cb).then(function() {
    _mergeCityLocs(cityCode, meta);
    return _loadScript('data-ko-' + meta.key + '.js' + cb)
      .then(function() { _mergeKO(meta); })
      .catch(function() { /* ko optional */ });
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
  return new Promise(function(resolve) {
    if (!navigator.geolocation) { console.log('[GPS] geolocation not available'); resolve('nyc'); return; }
    // Use low accuracy for fast city-level detection; generous timeout for mobile
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        var city = _nearestCity(pos.coords.latitude, pos.coords.longitude);
        console.log('[GPS] detected', pos.coords.latitude.toFixed(4), pos.coords.longitude.toFixed(4), '→', city);
        resolve(city);
      },
      function(err) {
        console.log('[GPS] error:', err.code, err.message, '→ fallback nyc');
        resolve('nyc');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  });
}

// ══════════════════════════════════════════════════════════════════
