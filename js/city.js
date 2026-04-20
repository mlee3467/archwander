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
  var totalR = typeof _getSavedRoutes === 'function' ? _getSavedRoutes().length : 0;
  if (total === 0 && totalF === 0 && totalR === 0) { el.innerHTML = ''; el.style.display = 'none'; return; }
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
      '<span class="pp-count-vis" onclick="_openPpList(\'vis\')" style="cursor:pointer" title="' + (isKo ? '방문 목록 보기' : 'View visited list') + '">' +
        '<span class="pp-num">' + total + '</span> ' + (isKo ? '방문' : 'visited') + '</span>' +
      '<span class="pp-sep">·</span>' +
      '<span class="pp-count-fav" onclick="_openPpList(\'fav\')" style="cursor:pointer" title="' + (isKo ? '즐겨찾기 목록 보기' : 'View favorites list') + '">' +
        '<span class="pp-num">' + totalF + '</span> ' + (isKo ? '즐겨찾기' : 'favs') + '</span>' +
      '<span class="pp-sep">·</span>' +
      '<span class="pp-count-route" onclick="if(typeof _openRouteManager===\'function\')_openRouteManager(\'saved\')" style="cursor:pointer" title="' + (isKo ? '저장된 루트 보기' : 'View saved routes') + '">' +
        '<span class="pp-num">' + totalR + '</span> ' + (isKo ? '루트' : 'routes') + '</span>' +
    '</div>' +
    (cityBars ? '<div class="pp-cities">' + cityBars + '</div>' : '') +
    recentHtml +
    legendHtml;
}

// ── Visited / Favs list popup ─────────────────────────────────────
function _openPpList(type) {
  var existing = document.getElementById('aw-pp-list');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var isKo      = typeof LANG !== 'undefined' && LANG === 'ko';
  var isFavType = (type === 'fav');
  var ids       = isFavType ? [..._favSet] : [..._visSet];
  var title     = isFavType
    ? (isKo ? '⭐ 즐겨찾기' : '⭐ Favorites')
    : (isKo ? '✓ 방문한 곳' : '✓ Visited');

  // Show popup immediately with loading state, then fill once all city data loads
  // (IDs may belong to cities not yet lazy-loaded, so we must preload all)
  var overlay = document.createElement('div');
  overlay.id = 'aw-pp-list';
  overlay.className = 'arm-overlay';
  overlay.addEventListener('click', function(e) { if (e.target === overlay) _closePpList(); });
  var panel = document.createElement('div');
  panel.className = 'arm-panel';
  panel.innerHTML =
    '<div class="arm-header">' +
      '<button class="arm-back" onclick="_closePpList()">⬅</button>' +
      '<span class="arm-title">' + title +
        ' <span style="font-size:12px;font-weight:400;color:#aaa">(' + ids.length + ')</span>' +
      '</span>' +
      '<button class="arm-close" onclick="_closePpList()">✕</button>' +
    '</div>' +
    '<div class="arm-scrollable" id="pp-list-body">' +
      '<div class="arm-empty">' + (isKo ? '불러오는 중…' : 'Loading…') + '</div>' +
    '</div>';
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // Load ALL city data (no-op for already-loaded cities) then render rows
  var allCodes = typeof CITY_META !== 'undefined' ? Object.keys(CITY_META) : [];
  var loads = allCodes.map(function(c) {
    return (typeof loadCityData === 'function') ? loadCityData(c).catch(function(){}) : Promise.resolve();
  });
  Promise.all(loads).then(function() {
    var body = document.getElementById('pp-list-body');
    if (body) body.innerHTML = _buildPpListRows(type, isFavType, isKo, ids);
  });

}

// Build the scrollable rows HTML for visited/favs list (called after all city data is loaded)
function _buildPpListRows(type, isFavType, isKo, ids) {
  // Build loc objects — LOCS now has all cities loaded
  var locs = [];
  if (typeof LOCS !== 'undefined') {
    ids.forEach(function(id) {
      var l = LOCS.find(function(x) { return x.id === id; });
      if (l) locs.push(l);
      // If still not found (edge case), show placeholder so count matches
      else locs.push({ id: id, name: id, city: '' });
    });
  } else {
    ids.forEach(function(id) { locs.push({ id: id, name: id, city: '' }); });
  }

  // City order from CITY_META
  var cityOrder = typeof CITY_META !== 'undefined' ? Object.keys(CITY_META) : [];
  var cityKeyOf = {};
  cityOrder.forEach(function(code) { cityKeyOf[CITY_META[code].key] = code; });

  // Group by city
  var byCity = {};
  cityOrder.forEach(function(code) { byCity[code] = []; });
  var unknown = [];
  locs.forEach(function(l) {
    var code = cityKeyOf[l.city];
    if (code) byCity[code].push(l);
    else unknown.push(l);
  });

  // Sort within each city: visited → newest first; favs → name a→z
  var dates2 = _readVisitDates();
  cityOrder.forEach(function(code) {
    if (!isFavType) {
      byCity[code].sort(function(a, b) {
        var da = dates2[a.id] || '', db = dates2[b.id] || '';
        return db > da ? 1 : db < da ? -1 : 0;
      });
    } else {
      byCity[code].sort(function(a, b) {
        return (a.name || '') < (b.name || '') ? -1 : 1;
      });
    }
  });

  if (!locs.length) {
    return '<div class="arm-empty">' +
      (isFavType
        ? (isKo ? '즐겨찾기가 없습니다' : 'No favorites yet')
        : (isKo ? '방문 기록이 없습니다' : 'No visited places yet')) +
    '</div>';
  }

  var allSections = [];
  cityOrder.concat(unknown.length ? ['__unknown'] : []).forEach(function(code) {
    var group = (code === '__unknown') ? unknown : byCity[code];
    if (!group || !group.length) return;
    var cityMeta = (typeof CITY_META !== 'undefined' && CITY_META[code]) ? CITY_META[code] : null;
    var cityLabel = cityMeta ? cityMeta.label : (isKo ? '기타' : 'Other');
    var sectionHtml =
      '<div style="padding:8px 14px 4px;font-size:10px;font-weight:700;' +
        'color:#aaa;letter-spacing:0.06em;text-transform:uppercase;' +
        'border-bottom:1px solid #f0f0f0;background:#fafaf8">' +
        cityLabel + ' <span style="font-weight:400">(' + group.length + ')</span>' +
      '</div>' +
      group.map(function(l) {
        var catBadge = (typeof _pCat === 'function') ? _pCat(l) : (l.cat || '');
        var catClass = (typeof CAT_CC_MAP !== 'undefined' && CAT_CC_MAP[catBadge]) ? CAT_CC_MAP[catBadge] : 'c-lmk';
        var hood    = l.hood ? '<span class="arm-tag">' + l.hood + '</span>' : '';
        var yr      = l.yr   ? '<span class="arm-tag">' + l.yr + '</span>' : '';
        var dateStr = (!isFavType && dates2[l.id])
          ? '<span class="arm-tag arm-tag-date">' + new Date(dates2[l.id]).toLocaleDateString() + '</span>' : '';
        var bothBadges = (isFav(l.id) && isVisited(l.id))
          ? '<span style="font-size:10px;margin-left:4px">⭐✓</span>' : '';
        return '<div class="arm-route-row" style="cursor:pointer" ' +
            'onclick="_ppListOpenLoc(\'' + l.id + '\',\'' + (l.city || '') + '\')">' +
          '<div class="arm-route-main">' +
            '<div class="arm-route-name">' + (l.name || l.id) + bothBadges + '</div>' +
            '<div class="arm-route-meta">' +
              (catBadge ? '<span class="cat-badge ' + catClass + '" style="font-size:10px">' + catBadge + '</span>' : '') +
              hood + yr + dateStr +
            '</div>' +
          '</div>' +
          '<span style="font-size:16px;color:#ccc;flex-shrink:0">›</span>' +
        '</div>';
      }).join('');
    allSections.push(sectionHtml);
  });
  return allSections.join('');
}

function _closePpList() {
  var overlay = document.getElementById('aw-pp-list');
  if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

// Called when user taps a row in the visited/favs list popup
function _ppListOpenLoc(locId, locCityKey) {
  _closePpList();
  if (typeof closeSidebar === 'function') closeSidebar();

  // Find the short city code (e.g. 'nyc') from loc.city value (e.g. 'new-york')
  var cityCode = null;
  if (typeof CITY_META !== 'undefined') {
    Object.keys(CITY_META).forEach(function(k) {
      if (CITY_META[k].key === locCityKey) cityCode = k;
    });
  }

  function _doOpenLoc() {
    // Switch active city state if different (without extra flyTo city center)
    if (cityCode && cityCode !== activeCity) {
      var meta = CITY_META[cityCode];
      activeCity    = cityCode;
      activeCityKey = meta.key;
      if (typeof refreshApp === 'function') refreshApp();
    }
    // Find location object
    var loc = (typeof LOCS !== 'undefined') ? LOCS.find(function(l) { return l.id === locId; }) : null;
    if (!loc) return;
    // Fly to location
    if (window.map) map.flyTo([loc.lat, loc.lng], 17, { duration: 1.2 });
    // After fly: show mini popup + activate favorites mode
    setTimeout(function() {
      if (typeof _showMapMarkerPopup === 'function') _showMapMarkerPopup(loc);
      if (!_favFilterActive && typeof toggleFavFilter === 'function') toggleFavFilter();
    }, 1400);
  }

  if (!cityCode || cityCode === activeCity) {
    _doOpenLoc();
  } else {
    // Load city data first (no-op if already loaded), then open
    if (typeof loadCityData === 'function') {
      loadCityData(cityCode).then(_doOpenLoc).catch(_doOpenLoc);
    } else {
      setTimeout(_doOpenLoc, 800);
    }
  }
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
  const scale = (_favFilterActive && (isFav(id) || isVisited(id))) ? 2 : 1;
  entry.m.setIcon(_buildLocIcon(loc, scale));
}

function _buildLocIcon(loc, scale) {
  // Pixel-art FLAG marker: pole + flag rectangle with SVG symbol inside
  // Fav   → yellow flag + white pixel star
  // Vis   → category-color flag + white pixel checkmark
  // Both  → yellow flag + star + green checkmark overlay
  // scale=2 used when fav filter is active for fav/visited markers
  scale = scale || 1;
  const color  = _ccMeta(loc).color;
  const fav    = isFav(loc.id);
  const vis    = isVisited(loc.id);

  // Flag fill: gold for fav, neutral for vis-only, category color otherwise
  const fill = fav ? '#F5C400' : (vis ? '#e8e8e2' : color);

  const poleW  = Math.round(2  * scale);
  const poleH  = Math.round(22 * scale);
  const flagW  = Math.round(11 * scale);
  const flagH  = Math.round(9  * scale);
  const footH  = Math.round(6  * scale);
  const totalW = poleW + flagW + Math.round(2 * scale);
  const totalH = poleH + footH;
  const borderW = Math.ceil(2 * scale);

  // ── SVG symbol inside the flag ────────────────────────────────
  // SVG is placed over the flag interior (inside the border)
  const innerW = flagW - borderW * 2;
  const innerH = flagH - borderW * 2;
  const svgL   = poleW + borderW;                    // left edge of inner flag
  const svgT   = Math.round(1 * scale) + borderW;   // top edge of inner flag

  // 5-point star (viewBox 0 0 10 9, white fill)
  const starD  = 'M5,0.5 L6.2,3.6 L9.5,3.6 L7,5.6 L8,8.5 L5,6.7 L2,8.5 L3,5.6 L0.5,3.6 L3.8,3.6 Z';
  // Checkmark (viewBox 0 0 10 9)
  const checkD = 'M1,4.5 L3.5,7 L9,2';

  let svgInner = '';
  if (fav && vis) {
    svgInner =
      `<path d="${starD}" fill="white" stroke="none"/>` +
      `<path d="${checkD}" fill="none" stroke="#16a34a" ` +
        `stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else if (fav) {
    svgInner =
      `<path d="${starD}" fill="white" stroke="none"/>`;
  } else if (vis) {
    svgInner =
      `<path d="${checkD}" fill="none" stroke="white" ` +
        `stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  const svgOverlay = (fav || vis)
    ? `<svg style="position:absolute;left:${svgL}px;top:${svgT}px;pointer-events:none;overflow:visible" ` +
        `width="${innerW}" height="${innerH}" viewBox="0 0 10 9" ` +
        `xmlns="http://www.w3.org/2000/svg">` +
        svgInner +
      `</svg>`
    : '';

  return L.divIcon({
    className: '',
    html:
      `<div style="position:relative;width:${totalW}px;height:${totalH}px;overflow:visible">` +
        // Pole
        `<div style="position:absolute;left:0;top:0;` +
          `width:${poleW}px;height:${poleH}px;background:#1a1a1a"></div>` +
        // Flag body
        `<div style="position:absolute;left:${poleW}px;top:${Math.round(1 * scale)}px;` +
          `width:${flagW}px;height:${flagH}px;background:${fill};` +
          `border:${borderW}px solid #1a1a1a;border-left:none;` +
          `box-shadow:${Math.round(2*scale)}px ${Math.round(2*scale)}px 0 rgba(0,0,0,0.38)"></div>` +
        // Symbol overlay (SVG star / checkmark)
        svgOverlay +
        // Base foot
        `<div style="position:absolute;bottom:${footH}px;left:-2px;` +
          `width:${Math.round(6*scale)}px;height:${Math.round(2*scale)}px;` +
          `background:#1a1a1a"></div>` +
      `</div>`,
    iconSize:   [totalW, totalH],
    iconAnchor: [1, poleH]
  });
}

function toggleFavFilter() {
  _favFilterActive = !_favFilterActive;
  document.getElementById('fav-btn').classList.toggle('active', _favFilterActive);
  var sbaFav = document.getElementById('sba-fav');
  if (sbaFav) sbaFav.classList.toggle('sba-active', _favFilterActive);
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
    const isFavVis = favVisIds.has(loc.id);
    if (_favFilterActive && !isFavVis) {
      m.setOpacity(0.34);
      m.setIcon(_buildLocIcon(loc, 1));
    } else {
      m.setOpacity(1);
      // scale=2 only for fav/visited in fav mode — icon is enlarged but star stays normal
      const scale = (_favFilterActive && isFavVis) ? 2 : 1;
      m.setIcon(_buildLocIcon(loc, scale));
    }
  });
  // Re-sync cluster/direct layers so fav markers bypass clustering
  if (typeof syncMarkers === 'function') syncMarkers();
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
    // Sync mobile city select + sidebar city select
    var _msel = document.getElementById('city-select-mobile');
    if (_msel) _msel.value = city;
    if (typeof _syncSbCitySelect === 'function') _syncSbCitySelect();
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

var _AW_DEFAULT_CITY_KEY = 'AW_DEFAULT_CITY';

function _initCityByGPS() {
  // Check if user has set a default city — skip GPS if so
  var defaultCity = localStorage.getItem(_AW_DEFAULT_CITY_KEY);
  if (defaultCity && CITY_META[defaultCity]) {
    console.log('[GPS] skipped — default city set:', defaultCity);
    return Promise.resolve(defaultCity);
  }
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
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  });
}

// ══════════════════════════════════════════════════════════════════
