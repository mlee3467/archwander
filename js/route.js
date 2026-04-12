// ══════════════════════════════════════════════════════════════════
// ROUTE PLANNER
// ══════════════════════════════════════════════════════════════════
// Neighborhood-based walking routes with OSRM routing.
// Extends the existing Near Me system.

var routeActive    = false;
var routeLocations = [];   // ordered list of locations in the route
var routeLine      = null; // Leaflet polyline for the route
var routeMarkers   = [];   // numbered step markers on map
var routeData      = null; // { distance, duration, steps: [...] }

// ── Route Panel UI ───────────────────────────────────────────────

function _getRouteLocs() {
  // When walk filter is active (GPS or pin), only show nearby locations
  if (walkActive && walkOrigin) return getFiltered();
  return LOCS.filter(function(l) { return l.city === activeCityKey; });
}

function refreshRouteList() {
  if (!routeActive) return;
  var locs = _getRouteLocs();
  var hoods = _groupByHood(locs);
  _renderRouteHoods(hoods, locs);
}

function openRoutePanel() {
  routeActive = true;
  var panel = document.getElementById('route-panel');
  if (!panel) _createRoutePanel();
  panel = document.getElementById('route-panel');
  panel.classList.remove('minimized');
  panel.classList.add('visible');
  refreshRouteList();
}

function closeRoutePanel() {
  routeActive = false;
  var panel = document.getElementById('route-panel');
  if (panel) { panel.classList.remove('visible'); panel.classList.remove('minimized'); }
  clearRoute();
}

function _createRoutePanel() {
  var div = document.createElement('div');
  div.id = 'route-panel';
  div.className = 'route-panel';
  div.innerHTML =
    '<div class="route-panel-hdr">' +
      '<span class="route-panel-title">🗺 ' + (LANG === 'ko' ? '루트 플래너' : 'Route Planner') + '</span>' +
      '<button class="route-panel-close" onclick="closeRoutePanel()">✕</button>' +
    '</div>' +
    '<div class="route-panel-body">' +
      '<div class="route-top-actions" id="route-top-actions">' +
        '<button class="route-btn route-btn-calc" id="route-top-calc" onclick="calcRoute()" style="display:none">🚶 <span class="rt-calc-text">' + (LANG === 'ko' ? '경로 계산' : 'Calculate Route') + '</span></button>' +
        '<button class="route-btn route-btn-clear" id="route-top-clear" onclick="clearRouteSelection()" style="display:none">✕ <span class="rt-clear-text">' + (LANG === 'ko' ? '전체 삭제' : 'Clear Route') + '</span></button>' +
        '<button class="route-btn route-btn-pdf" id="route-top-pdf" onclick="exportRoutePDF()" style="display:none">📄 <span class="rt-pdf-text">' + (LANG === 'ko' ? 'PDF' : 'PDF') + '</span></button>' +
      '</div>' +
      '<div class="route-time-row">' +
        '<label class="route-time-label">🕐 <span class="rt-time-text">' + (LANG === 'ko' ? '시작 시간' : 'Start time') + '</span></label>' +
        '<input type="time" id="route-start-time" class="route-time-input" value="">' +
        '<button class="route-btn route-btn-now" onclick="_setRouteTimeNow()">' + (LANG === 'ko' ? '지금' : 'Now') + '</button>' +
      '</div>' +
      '<div class="route-hood-list" id="route-hood-list"></div>' +
      '<div class="route-selected" id="route-selected">' +
        '<div class="route-sel-title" id="route-sel-title">Selected Stops (0)</div>' +
        '<div class="route-sel-list" id="route-sel-list"></div>' +
      '</div>' +
      '<div class="route-result" id="route-result" style="display:none"></div>' +
    '</div>';
  document.body.appendChild(div);
}

// Set route start time to current time
function _setRouteTimeNow() {
  var now = new Date();
  var hh = String(now.getHours()).padStart(2, '0');
  var mm = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('route-start-time').value = hh + ':' + mm;
}

// ── Neighborhood Grouping ────────────────────────────────────────

function _groupByHood(locs) {
  var groups = {};
  locs.forEach(function(loc) {
    var hood = loc.hood || (LANG === 'ko' ? '기타' : 'Other');
    if (!groups[hood]) groups[hood] = [];
    groups[hood].push(loc);
  });
  // Sort by number of locations (descending)
  var sorted = Object.keys(groups).sort(function(a, b) {
    return groups[b].length - groups[a].length;
  });
  return sorted.map(function(hood) {
    return { name: hood, locs: groups[hood] };
  });
}

function _renderRouteHoods(hoods, locs) {
  var container = document.getElementById('route-hood-list');
  if (!container) return;

  var walkInfo = '';
  if (walkActive && walkOrigin) {
    var mins = parseInt(document.getElementById('walk-slider').value, 10);
    var count = locs ? locs.length : 0;
    walkInfo = '<div class="route-walk-badge">' +
      '📍 ' + (LANG === 'ko' ? mins + '분 도보 범위 · ' + count + '개 장소' : mins + ' min walk · ' + count + ' places') +
      '</div>';
  }

  var addAllBtn = '<button class="route-addall-list" onclick="addAllFilteredToRoute()">+ ' +
    (LANG === 'ko' ? '리스트 전체 추가' : 'Add All from List') +
    ' (' + (locs ? locs.length : 0) + ')</button>';

  var ko = LANG === 'ko';
  var nearMeBtn = '<button class="route-addall-list route-nearbyme-btn" onclick="toggleRouteNearMeSlider()">' +
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" style="flex-shrink:0;vertical-align:-1px;margin-right:4px"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>' +
    (ko ? '내 주변 장소 추가' : 'Add locations around me') + '</button>' +
    '<div id="route-nearbyme-panel" style="display:none">' +
      '<div class="route-nearbyme-inner">' +
        /* ── Location source selector ── */
        '<div class="route-nm-src-label">' + (ko ? '기준 위치' : 'Location source') + '</div>' +
        '<div class="route-nm-src-row">' +
          '<button class="route-nm-src-btn" id="route-nm-gps-btn" onclick="routeNearMeUseGPS()">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>' +
            (ko ? 'GPS 위치' : 'Use GPS') +
          '</button>' +
          '<button class="route-nm-src-btn" id="route-nm-pin-btn" onclick="routeNearMeDropPin()">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
            (ko ? '핀으로 지정' : 'Drop a pin') +
          '</button>' +
        '</div>' +
        '<div id="route-nm-src-status" class="route-nm-src-status"></div>' +
        /* ── Distance slider ── */
        '<div class="route-nearbyme-row">' +
          '<label class="route-nearbyme-label">' + (ko ? '도보 거리' : 'Walking distance') + '</label>' +
          '<span class="route-nearbyme-val" id="route-nearbyme-val">10 ' + (ko ? '분' : 'min') + '</span>' +
        '</div>' +
        '<input type="range" id="route-nearbyme-slider" class="route-nearbyme-slider" min="5" max="60" step="5" value="10" oninput="updateRouteNearMeLabel(this.value)">' +
        '<div class="route-nearbyme-ticks"><span>5</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span></div>' +
        '<button class="route-nearbyme-go" onclick="addNearbyToRoute()">' +
          (ko ? '이 범위의 장소 모두 추가' : 'Add all within range') +
        '</button>' +
        '<div id="route-nearbyme-msg" class="route-nearbyme-msg"></div>' +
      '</div>' +
    '</div>';

  container.innerHTML = walkInfo + nearMeBtn + addAllBtn +
    '<div class="route-section-label">' +
    (LANG === 'ko' ? '동네별 건축물' : 'Architecture by Neighborhood') + '</div>' +
    hoods.map(function(h) {
      var isExpanded = h.locs.length <= 8;
      return '<div class="route-hood">' +
        '<button class="route-hood-hdr" onclick="toggleRouteHood(this)">' +
          '<span class="route-hood-name">' + _escHtml(h.name) + '</span>' +
          '<span class="route-hood-count">' + h.locs.length + '</span>' +
          '<span class="route-hood-arr">' + (isExpanded ? '▼' : '▶') + '</span>' +
        '</button>' +
        '<div class="route-hood-body" style="display:' + (isExpanded ? 'block' : 'none') + '">' +
          '<button class="route-hood-addall" onclick="addHoodToRoute(\'' + _escHtml(h.name).replace(/'/g, "\\'") + '\')">+ ' +
            (LANG === 'ko' ? '모두 추가' : 'Add All') + '</button>' +
          h.locs.map(function(loc) {
            var inRoute = routeLocations.some(function(r) { return r.id === loc.id; });
            return '<div class="route-loc-item' + (inRoute ? ' in-route' : '') + '" data-id="' + loc.id + '">' +
              '<span class="route-loc-name">' + _routeLocName(loc) + '</span>' +
              '<button class="route-loc-toggle" onclick="toggleRouteLocation(\'' + loc.id + '\')">' +
                (inRoute ? '−' : '+') + '</button>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');
}

function _routeLocName(loc) {
  if (LANG === 'ko' && typeof LOCS_KO !== 'undefined' && LOCS_KO[loc.id] && LOCS_KO[loc.id].name) {
    return LOCS_KO[loc.id].name + ' <span style="color:#999;font-size:0.85em">' + _escHtml(loc.name) + '</span>';
  }
  return _escHtml(loc.name);
}

function _escHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function toggleRouteHood(btn) {
  var body = btn.nextElementSibling;
  var arr  = btn.querySelector('.route-hood-arr');
  if (body.style.display === 'none') {
    body.style.display = 'block';
    arr.textContent = '▼';
  } else {
    body.style.display = 'none';
    arr.textContent = '▶';
  }
}

// ── Route Selection ──────────────────────────────────────────────

function toggleRouteLocation(locId) {
  var idx = routeLocations.findIndex(function(r) { return r.id === locId; });
  if (idx >= 0) {
    routeLocations.splice(idx, 1);
  } else {
    var loc = LOCS.find(function(l) { return l.id === locId; });
    if (loc) routeLocations.push(loc);
  }
  _refreshRouteUI();
}

function addHoodToRoute(hoodName) {
  var cityLocs = _getRouteLocs();
  var hoodLocs = cityLocs.filter(function(l) {
    return (l.hood || (LANG === 'ko' ? '기타' : 'Other')) === hoodName;
  });
  var existingIds = new Set(routeLocations.map(function(l) { return l.id; }));
  hoodLocs.forEach(function(loc) {
    if (!existingIds.has(loc.id)) routeLocations.push(loc);
  });
  _refreshRouteUI();
}

function addAllFilteredToRoute() {
  var locs = _getRouteLocs();
  var existingIds = new Set(routeLocations.map(function(l) { return l.id; }));
  locs.forEach(function(loc) {
    if (!existingIds.has(loc.id)) routeLocations.push(loc);
  });
  _refreshRouteUI();
}

function clearRouteSelection() {
  routeLocations = [];
  clearRoute();
  _refreshRouteUI();
}

function removeRouteStop(locId) {
  routeLocations = routeLocations.filter(function(l) { return l.id !== locId; });
  _refreshRouteUI();
  if (routeData) calcRoute(); // recalculate if route was shown
}

function _refreshRouteUI() {
  // Update selected list
  var selTitle = document.getElementById('route-sel-title');
  var selList  = document.getElementById('route-sel-list');
  var actions  = document.getElementById('route-actions');

  if (selTitle) selTitle.textContent = (LANG === 'ko' ? '선택한 경유지' : 'Selected Stops') + ' (' + routeLocations.length + ')';

  if (selList) {
    if (routeLocations.length === 0) {
      selList.innerHTML = '<div class="route-sel-empty">' +
        (LANG === 'ko' ? '동네에서 건축물을 추가하세요' : 'Add locations from neighborhoods above') + '</div>';
    } else {
      selList.innerHTML = routeLocations.map(function(loc, i) {
        return '<div class="route-sel-item" draggable="true" data-idx="' + i + '">' +
          '<span class="route-sel-num">' + (i + 1) + '</span>' +
          '<span class="route-sel-name">' + _routeLocName(loc) + '</span>' +
          '<button class="route-sel-remove" onclick="removeRouteStop(\'' + loc.id + '\')">✕</button>' +
        '</div>';
      }).join('');
    }
  }

  if (actions) actions.style.display = routeLocations.length >= 2 ? 'flex' : 'none';

  // Top action buttons: show calc when ≥2, clear when ≥1
  var topCalc = document.getElementById('route-top-calc');
  var topClear = document.getElementById('route-top-clear');
  var topPdf = document.getElementById('route-top-pdf');
  if (topCalc) topCalc.style.display = routeLocations.length >= 2 ? 'inline-flex' : 'none';
  if (topClear) topClear.style.display = routeLocations.length >= 1 ? 'inline-flex' : 'none';
  if (topPdf) topPdf.style.display = routeData ? 'inline-flex' : 'none';

  // Update hood list item states
  var items = document.querySelectorAll('.route-loc-item');
  var inRouteIds = new Set(routeLocations.map(function(l) { return l.id; }));
  items.forEach(function(item) {
    var id = item.getAttribute('data-id');
    var btn = item.querySelector('.route-loc-toggle');
    if (inRouteIds.has(id)) {
      item.classList.add('in-route');
      if (btn) btn.textContent = '−';
    } else {
      item.classList.remove('in-route');
      if (btn) btn.textContent = '+';
    }
  });
}

// ── Hours Parsing ───────────────────────────────────────────────
// Parse closing time from hours string. Returns minutes since midnight, or null if can't parse.
function _parseCloseTime(hoursStr) {
  if (!hoursStr) return null;
  // Pattern: "HH:MM AM/PM" or "HH:MM" or "HAM/PM"
  var timeRe = /(\d{1,2})(?::(\d{2}))?\s*(am|pm|AM|PM)?/g;
  var times = [];
  var m;
  while ((m = timeRe.exec(hoursStr)) !== null) {
    var h = parseInt(m[1]);
    var min = parseInt(m[2] || '0');
    if (m[3]) {
      var ampm = m[3].toLowerCase();
      if (ampm === 'pm' && h < 12) h += 12;
      if (ampm === 'am' && h === 12) h = 0;
    }
    times.push(h * 60 + min);
  }
  // The last time found is usually the closing time
  if (times.length >= 2) return times[times.length - 1];
  if (times.length === 1) return times[0];
  return null;
}

// ── OSRM Route Calculation ───────────────────────────────────────

function calcRoute() {
  if (routeLocations.length < 2) return;

  // Filter by opening hours if start time is set
  var startTimeEl = document.getElementById('route-start-time');
  var startTime = startTimeEl ? startTimeEl.value : '';
  if (startTime) {
    var parts = startTime.split(':');
    var startMins = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    var removed = [];
    routeLocations = routeLocations.filter(function(loc) {
      var closeTime = _parseCloseTime(loc.hours);
      if (closeTime === null) return true; // keep if unknown hours
      // Remove if closes within 30 min of start time
      if (closeTime > 0 && closeTime <= startMins + 30) {
        removed.push(loc.name);
        return false;
      }
      return true;
    });
    if (removed.length > 0) {
      var msg = LANG === 'ko'
        ? removed.length + '개 장소가 곧 닫혀 제외됨: ' + removed.join(', ')
        : removed.length + ' location(s) excluded (closing soon): ' + removed.join(', ');
      _routeStatus(msg);
    }
    _updateRouteSelectedUI();
    if (routeLocations.length < 2) {
      _routeStatus(LANG === 'ko' ? '최소 2개 이상의 장소가 필요합니다.' : 'Need at least 2 stops.');
      return;
    }
  }

  // Optimize order using nearest-neighbor heuristic
  var ordered = _optimizeOrder(routeLocations);
  routeLocations = ordered;
  _refreshRouteUI();

  // Build OSRM waypoints string
  var coords = ordered.map(function(loc) { return loc.lng + ',' + loc.lat; }).join(';');
  var url = 'https://routing.openstreetmap.de/routed-foot/route/v1/driving/' + coords +
            '?overview=full&geometries=geojson&steps=true';

  var resultDiv = document.getElementById('route-result');
  if (resultDiv) {
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="route-loading">' +
      (LANG === 'ko' ? '🚶 경로 계산 중...' : '🚶 Calculating route...') + '</div>';
  }

  fetch(url, { signal: AbortSignal.timeout(10000) })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.routes || !data.routes.length) throw new Error('No route found');
      _displayRoute(data.routes[0], ordered);
      _minimizeRoutePanelMobile();
    })
    .catch(function(err) {
      console.warn('[route] OSRM failed:', err);
      _displayStraightRoute(ordered);
      _minimizeRoutePanelMobile();
    });
}

function _minimizeRoutePanelMobile() {
  if (window.innerWidth > 900) return;
  var panel = document.getElementById('route-panel');
  if (panel) {
    panel.classList.add('minimized');
    // Ensure peek handle exists
    if (!document.getElementById('route-peek-handle')) {
      var handle = document.createElement('div');
      handle.id = 'route-peek-handle';
      handle.className = 'route-peek-handle';
      handle.innerHTML = '<div class="route-peek-bar"></div>' +
        '<span class="route-peek-label">' + (LANG === 'ko' ? '루트 플래너' : 'Route Planner') + '</span>';
      handle.onclick = function() { _restoreRoutePanel(); };
      panel.appendChild(handle);
    }
  }
}

function _restoreRoutePanel() {
  var panel = document.getElementById('route-panel');
  if (panel) panel.classList.remove('minimized');
}

function _optimizeOrder(locs) {
  // Nearest-neighbor heuristic from the first location
  if (locs.length <= 2) return locs.slice();
  var remaining = locs.slice(1);
  var ordered = [locs[0]];
  while (remaining.length > 0) {
    var last = ordered[ordered.length - 1];
    var nearestIdx = 0;
    var nearestDist = Infinity;
    for (var i = 0; i < remaining.length; i++) {
      var d = haversineM(last.lat, last.lng, remaining[i].lat, remaining[i].lng);
      if (d < nearestDist) { nearestDist = d; nearestIdx = i; }
    }
    ordered.push(remaining[nearestIdx]);
    remaining.splice(nearestIdx, 1);
  }
  return ordered;
}

function _displayRoute(route, ordered) {
  clearRoute();

  // Draw polyline
  var coords = route.geometry.coordinates.map(function(c) { return [c[1], c[0]]; });
  routeLine = L.polyline(coords, {
    color: '#D946A8', weight: 5, opacity: 0.85,
    dashArray: '10,7', lineCap: 'round'
  }).addTo(map);

  // Add numbered markers
  ordered.forEach(function(loc, i) {
    var icon = L.divIcon({
      html: '<div style="background:#D946A8;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-family:Inter,sans-serif">' + (i + 1) + '</div>',
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    var m = L.marker([loc.lat, loc.lng], { icon: icon })
      .bindTooltip((i + 1) + '. ' + loc.name, { direction: 'top', offset: [0, -14] })
      .on('click', function() { openLoc(loc); })
      .addTo(map);
    routeMarkers.push(m);
  });

  // Fit map
  map.fitBounds(routeLine.getBounds(), { padding: [60, 60] });

  // Show route summary
  var totalDist = route.distance;
  var totalDur  = route.duration;
  routeData = {
    distance: totalDist,
    duration: totalDur,
    stops: ordered.length,
    legs: route.legs || []
  };
  _renderRouteResult(routeData, ordered);
}

function _displayStraightRoute(ordered) {
  clearRoute();

  // Draw straight lines between stops
  var coords = ordered.map(function(loc) { return [loc.lat, loc.lng]; });
  routeLine = L.polyline(coords, {
    color: '#D946A8', weight: 4, opacity: 0.7,
    dashArray: '6,8', lineCap: 'round'
  }).addTo(map);

  // Add numbered markers
  ordered.forEach(function(loc, i) {
    var icon = L.divIcon({
      html: '<div style="background:#D946A8;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-family:Inter,sans-serif">' + (i + 1) + '</div>',
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    var m = L.marker([loc.lat, loc.lng], { icon: icon })
      .bindTooltip((i + 1) + '. ' + loc.name, { direction: 'top', offset: [0, -14] })
      .on('click', function() { openLoc(loc); })
      .addTo(map);
    routeMarkers.push(m);
  });

  map.fitBounds(routeLine.getBounds(), { padding: [60, 60] });

  // Estimate using straight-line distances
  var totalDist = 0;
  for (var i = 1; i < ordered.length; i++) {
    totalDist += haversineM(ordered[i-1].lat, ordered[i-1].lng, ordered[i].lat, ordered[i].lng);
  }
  var totalDur = totalDist / 1.33; // ~80m/min
  routeData = { distance: totalDist, duration: totalDur, stops: ordered.length, legs: [], estimated: true };
  _renderRouteResult(routeData, ordered);
}

function _renderRouteResult(data, ordered) {
  var resultDiv = document.getElementById('route-result');
  if (!resultDiv) return;

  var distStr = data.distance < 1000
    ? Math.round(data.distance) + 'm'
    : (data.distance / 1000).toFixed(1) + 'km';
  var durMin = Math.ceil(data.duration / 60);
  var durStr = durMin < 60
    ? durMin + (LANG === 'ko' ? '분' : ' min')
    : Math.floor(durMin / 60) + (LANG === 'ko' ? '시간 ' : 'h ') + (durMin % 60) + (LANG === 'ko' ? '분' : 'min');

  var html = '<div class="route-summary">' +
    '<div class="route-summary-stat">' +
      '<span class="route-stat-val">🚶 ' + distStr + '</span>' +
      '<span class="route-stat-label">' + (LANG === 'ko' ? '총 거리' : 'Total Distance') + '</span>' +
    '</div>' +
    '<div class="route-summary-stat">' +
      '<span class="route-stat-val">⏱ ' + durStr + '</span>' +
      '<span class="route-stat-label">' + (LANG === 'ko' ? '도보 시간' : 'Walking Time') + '</span>' +
    '</div>' +
    '<div class="route-summary-stat">' +
      '<span class="route-stat-val">📍 ' + data.stops + '</span>' +
      '<span class="route-stat-label">' + (LANG === 'ko' ? '경유지' : 'Stops') + '</span>' +
    '</div>' +
  '</div>';

  if (data.estimated) {
    html += '<div class="route-estimate-note">' +
      (LANG === 'ko' ? '⚠ 직선 거리 기반 추정치입니다' : '⚠ Estimated (straight-line distances)') + '</div>';
  }

  // Itinerary
  html += '<div class="route-itinerary">';
  ordered.forEach(function(loc, i) {
    var legInfo = '';
    if (data.legs && data.legs[i]) {
      var leg = data.legs[i];
      var legDist = leg.distance < 1000 ? Math.round(leg.distance) + 'm' : (leg.distance / 1000).toFixed(1) + 'km';
      var legDur  = Math.ceil(leg.duration / 60) + (LANG === 'ko' ? '분' : ' min');
      legInfo = '<div class="route-leg-info">🚶 ' + legDist + ' · ' + legDur + '</div>';
    }
    var catBadge = _pCat(loc);
    html += '<div class="route-stop">' +
      '<div class="route-stop-num">' + (i + 1) + '</div>' +
      '<div class="route-stop-info">' +
        '<div class="route-stop-name">' + _routeLocName(loc) + '</div>' +
        '<div class="route-stop-meta">' +
          '<span class="cat-badge ' + (CAT_CC_MAP[catBadge] || 'c-lmk') + '" style="font-size:10px">' + catBadge + '</span>' +
          (loc.hood ? ' · ' + _escHtml(loc.hood) : '') +
        '</div>' +
      '</div>' +
    '</div>';
    if (i < ordered.length - 1 && legInfo) {
      html += legInfo;
    }
  });
  html += '</div>';

  // Export button
  html += '<div class="route-export-actions">' +
    '<button class="route-btn route-btn-pdf" onclick="exportRoutePDF()">📄 ' +
      (LANG === 'ko' ? 'PDF 내보내기' : 'Export PDF') + '</button>' +
  '</div>';

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = html;

  // Show top PDF button
  var topPdf = document.getElementById('route-top-pdf');
  if (topPdf) topPdf.style.display = 'inline-flex';
}

function clearRoute() {
  if (routeLine) { map.removeLayer(routeLine); routeLine = null; }
  routeMarkers.forEach(function(m) { map.removeLayer(m); });
  routeMarkers = [];
  routeData = null;
  var resultDiv = document.getElementById('route-result');
  if (resultDiv) { resultDiv.style.display = 'none'; resultDiv.innerHTML = ''; }
  var topPdf = document.getElementById('route-top-pdf');
  if (topPdf) topPdf.style.display = 'none';
}

// Helper: Show status message in result area
function _routeStatus(msg) {
  var resultDiv = document.getElementById('route-result');
  if (resultDiv) {
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="route-status-msg">' + msg + '</div>';
  }
}

// Helper: Alias for _refreshRouteUI
function _updateRouteSelectedUI() {
  _refreshRouteUI();
}

// ── Add Locations Around Me ──────────────────────────────────────

function toggleRouteNearMeSlider() {
  var panel = document.getElementById('route-nearbyme-panel');
  if (!panel) return;
  var isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) _routeNearMeUpdateSrcUI();
}

function _routeNearMeUpdateSrcUI() {
  var gpsBtn = document.getElementById('route-nm-gps-btn');
  var pinBtn = document.getElementById('route-nm-pin-btn');
  var status = document.getElementById('route-nm-src-status');
  if (!gpsBtn || !pinBtn) return;
  // Clear active states
  gpsBtn.classList.remove('active');
  pinBtn.classList.remove('active');
  if (walkOrigin) {
    // Show which source is active
    if (pinDropMarker || (!userMarker && walkOrigin)) {
      pinBtn.classList.add('active');
    } else {
      gpsBtn.classList.add('active');
    }
    if (status) status.textContent = '✅ ' + (LANG === 'ko' ? '위치 준비됨' : 'Location ready');
  }
}

function updateRouteNearMeLabel(val) {
  var el = document.getElementById('route-nearbyme-val');
  if (el) el.textContent = val + (LANG === 'ko' ? '분' : ' min');
}

// GPS button
function routeNearMeUseGPS() {
  var status = document.getElementById('route-nm-src-status');
  var gpsBtn = document.getElementById('route-nm-gps-btn');
  var pinBtn = document.getElementById('route-nm-pin-btn');
  if (!navigator.geolocation) {
    if (status) status.textContent = LANG === 'ko' ? '위치 서비스 미지원' : 'Geolocation not supported';
    return;
  }
  if (status) status.textContent = LANG === 'ko' ? '📡 위치를 가져오는 중…' : '📡 Getting your location…';
  if (gpsBtn) { gpsBtn.classList.add('active'); gpsBtn.disabled = true; }
  if (pinBtn) pinBtn.classList.remove('active');

  navigator.geolocation.getCurrentPosition(
    function(pos) {
      walkOrigin = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      if (gpsBtn) { gpsBtn.classList.add('active'); gpsBtn.disabled = false; }
      if (status) {
        status.textContent = '✅ ' + (LANG === 'ko' ? 'GPS 위치 확인됨' : 'GPS location found');
        setTimeout(function() { if (status) status.textContent = ''; }, 3000);
      }
    },
    function() {
      if (gpsBtn) { gpsBtn.classList.remove('active'); gpsBtn.disabled = false; }
      if (status) status.textContent = LANG === 'ko' ? '⚠️ 위치를 가져올 수 없습니다' : '⚠️ Could not get location';
    }
  );
}

// Pin button — minimize route panel, enter pin drop mode
function routeNearMeDropPin() {
  // Minimize the route panel on mobile so the map is accessible
  _minimizeRoutePanelMobile();
  // On desktop just keep panel open but shift focus
  if (window.innerWidth <= 900) {
    // Show a toast hint below the minimized bar
    var panel = document.getElementById('route-panel');
    if (panel) {
      var existing = panel.querySelector('.route-pin-toast');
      if (!existing) {
        var toast = document.createElement('div');
        toast.className = 'route-pin-toast';
        toast.textContent = LANG === 'ko' ? '📍 지도를 탭해 위치를 지정하세요' : '📍 Tap the map to set location';
        panel.appendChild(toast);
      }
    }
  }
  // Enter route pin drop mode
  routePinDropMode = true;
  map.getContainer().style.cursor = 'crosshair';
}

// Called from init.js when map is clicked in routePinDropMode
function _onRoutePinDropped(lat, lng) {
  walkOrigin = { lat: lat, lng: lng };

  // Place a pin marker (reuse existing pinDropMarker slot)
  if (pinDropMarker) { pinDropMarker.remove(); pinDropMarker = null; }
  pinDropMarker = L.marker([lat, lng], {
    pane: 'walkMarker',
    draggable: true,
    icon: (typeof _personMarkerIcon === 'function') ? _personMarkerIcon() : L.marker([lat, lng]).options.icon
  }).addTo(map);
  pinDropMarker.on('dragend', function() {
    var p = pinDropMarker.getLatLng();
    walkOrigin = { lat: p.lat, lng: p.lng };
  });

  // Remove pin toast if present
  var panel = document.getElementById('route-panel');
  if (panel) {
    var toast = panel.querySelector('.route-pin-toast');
    if (toast) toast.remove();
  }

  // Restore route panel
  _restoreRoutePanel();
  // Re-open near me panel and show ready status
  var nmPanel = document.getElementById('route-nearbyme-panel');
  if (nmPanel) nmPanel.style.display = 'block';
  var pinBtn = document.getElementById('route-nm-pin-btn');
  var gpsBtn = document.getElementById('route-nm-gps-btn');
  if (pinBtn) pinBtn.classList.add('active');
  if (gpsBtn) gpsBtn.classList.remove('active');
  var status = document.getElementById('route-nm-src-status');
  if (status) {
    status.textContent = '✅ ' + (LANG === 'ko' ? '핀 위치 지정됨' : 'Pin location set');
    setTimeout(function() { if (status) status.textContent = ''; }, 3000);
  }
}

function addNearbyToRoute() {
  var msg = document.getElementById('route-nearbyme-msg');

  if (!walkOrigin) {
    if (msg) msg.textContent = LANG === 'ko' ? '📍 먼저 위치를 선택하세요.' : '📍 Choose a location first.';
    return;
  }

  var slider = document.getElementById('route-nearbyme-slider');
  var minutes = parseInt(slider ? slider.value : 10, 10);
  var radiusM = minutes * 80; // ~80 m/min

  var cityLocs = LOCS.filter(function(l) { return l.city === activeCityKey; });
  var nearby = cityLocs.filter(function(l) {
    return haversineM(walkOrigin.lat, walkOrigin.lng, l.lat, l.lng) <= radiusM;
  });

  if (nearby.length === 0) {
    if (msg) msg.textContent = LANG === 'ko' ? '이 범위 내에 장소가 없습니다.' : 'No locations found within this range.';
    return;
  }

  var existingIds = new Set(routeLocations.map(function(l) { return l.id; }));
  var added = 0;
  nearby.forEach(function(loc) {
    if (!existingIds.has(loc.id)) {
      routeLocations.push(loc);
      added++;
    }
  });

  if (msg) {
    msg.textContent = added > 0
      ? (LANG === 'ko' ? added + '개 장소가 추가되었습니다!' : added + ' locations added!')
      : (LANG === 'ko' ? '모두 이미 추가됨.' : 'All already added.');
    setTimeout(function() { if (msg) msg.textContent = ''; }, 2500);
  }

  // Close slider panel
  var panel = document.getElementById('route-nearbyme-panel');
  if (panel) panel.style.display = 'none';

  _refreshRouteUI();
}

// ══════════════════════════════════════════════════════════════════
