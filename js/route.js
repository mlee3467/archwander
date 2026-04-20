// ══════════════════════════════════════════════════════════════════
// ROUTE PLANNER
// ══════════════════════════════════════════════════════════════════
// Neighborhood-based walking routes with OSRM routing.
// Extends the existing Near Me system.

var routeActive      = false;
var routeLocations   = [];   // ordered list of locations in the route
var routeLine        = null; // Leaflet polyline for the route
var routeMarkers     = [];   // numbered step markers on map
var routeData        = null; // { distance, duration, steps: [...] }
var _routeSkipAnim   = false; // true when remove triggered — skip animation, show final instantly
var _rpsSelectedHoods = new Set(); // selected hoods in the presel modal (multi-select)
var _SAVED_ROUTE_KEY  = 'aw_saved_route_v1';   // legacy (unused)
var _SAVED_ROUTES_KEY = 'aw_saved_routes_v2';  // current: array of named routes

// ── Pixel Walker Animation ───────────────────────────────────────
// Character type: Canvas-rendered pixel art → dataURL → <img> in Leaflet divIcon.
// All graphics are coded/generated at runtime — no external image files.
var routeWalkerMarker  = null;
var _walkerAnimId      = null;
var _walkerSprites     = null;
var _walkerDistCovered = 0;     // cumulative meters walked
var _walkerRevealLine  = null;  // growing polyline that reveals the walked path
var _walkerRevealMs    = 0;     // reveal clock, always advances at full speed
var _walkerPassedStops = null;  // Set of stopIndices already visited
var _WALKER_FRAME_MS   = 60;    // ms per stride frame (3× faster total — 2× from prev)

// ── Distance thresholds (80 m/min average walking pace) ──────────
var _WLK_D30MIN  = 2400;   // 30 min  → 50% stamina, speed −50%
var _WLK_D_EMPTY = 3600;   // ~45 min → stamina 0%, speed −75%
var _WLK_D_STOP  = 6000;   // ~75 min → completely stopped, show rest icons

// ── 16×16 B&W pixel art character ────────────────────────────────
// Palette: 0=transparent  1=white  4=black
// 6 frames: [0,1]=happy  [2,3]=tired  [4,5]=exhausted  (×2 strides each)
// Each frame string = 16 cols × 16 rows = 256 chars
var _WALKER_PX_FRAMES = [
  // Frame 0: Happy Stride A
  '0000044444400000' +
  '0000411111140000' +
  '0004111111114000' +
  '0041111111111400' +
  '0041114114111400' +
  '0041114114111404' +
  '0041111111111444' +
  '0441111111111440' +
  '4441141111411400' +
  '4041114444111400' +
  '0004111111114000' +
  '0000411111140000' +
  '0000044444400000' +
  '0000044004000000' +
  '0000440004400000' +
  '0004400004440000',
  // Frame 1: Happy Stride B
  '0000044444400000' +
  '0000411111140000' +
  '0004111111114000' +
  '0041111111111400' +
  '0041114114111400' +
  '4041114114111400' +
  '4441111111111400' +
  '0441111111111440' +
  '0041141111411444' +
  '0041114444111404' +
  '0004111111114000' +
  '0000411111140000' +
  '0000044444400000' +
  '0000004004400000' +
  '0000044000440000' +
  '0000444000044000',
  // Frame 2: Tired Stride A
  '0000044444400000' +
  '0000411111140000' +
  '0004111111114000' +
  '0041111111111400' +
  '0041111111111400' +
  '0041144114411400' +
  '0041111111111404' +
  '0041111111111444' +
  '0441111111111440' +
  '0441114444111400' +
  '4404111111114000' +
  '0000411111140000' +
  '0000044444400000' +
  '0000044004000000' +
  '0000440004400000' +
  '0004400004440000',
  // Frame 3: Tired Stride B
  '0000044444400000' +
  '0000411111140000' +
  '0004111111114000' +
  '0041111111111400' +
  '0041111111111400' +
  '0041144114411400' +
  '4041111111111400' +
  '4441111111111400' +
  '0441111111111440' +
  '0041114444111440' +
  '0004111111114044' +
  '0000411111140000' +
  '0000044444400000' +
  '0000004004400000' +
  '0000044000440000' +
  '0000444000044000',
  // Frame 4: Exhausted Stride A
  '0000044444400000' +
  '0000411111140000' +
  '0004111111114000' +
  '0041111111111400' +
  '0041414114141400' +
  '0041141111411400' +
  '0041141111411400' +
  '0041414114141400' +
  '0041111111111400' +
  '0441111111111440' +
  '0404111441114040' +
  '0400411111140040' +
  '0400044444400040' +
  '0000044004400000' +
  '0000440044000000' +
  '0004400440000000',
  // Frame 5: Exhausted Stride B
  '0000044444400000' +
  '0000411111140000' +
  '0004111111114000' +
  '0041111111111400' +
  '0041414114141400' +
  '0041141111411400' +
  '0041141111411400' +
  '0041414114141400' +
  '0041111111111400' +
  '0441111111111440' +
  '0404111441114040' +
  '0400411111140040' +
  '0400044444400040' +
  '0000044004400000' +
  '0000440044000000' +
  '0004400440000000'
];
var _WALKER_PX_W = 16, _WALKER_PX_H = 16, _WALKER_PX_SCALE = 2;

// Four palettes: 0=transparent  1=body colour  4=outline
var _WALKER_PAL_HAPPY     = { '0':null, '1':'#ffffff', '4':'#111111' }; // Happy
var _WALKER_PAL_TIRED     = { '0':null, '1':'#FFF4AA', '4':'#111111' }; // Tired
var _WALKER_PAL_EXHAUSTED = { '0':null, '1':'#DFC8FF', '4':'#111111' }; // Exhausted
var _WALKER_PAL_STOPPED   = { '0':null, '1':'#aaaaaa', '4':'#444444' }; // Stopped
var _walkerSpriteCache    = {};  // keyed by body colour string

// Select base frame index from distance walked
function _walkerGetBaseFrame(dist) {
  if (dist < _WLK_D30MIN)  return 0;  // happy     → frames 0,1
  if (dist < _WLK_D_EMPTY) return 2;  // tired     → frames 2,3
  return 4;                            // exhausted/stopped → frames 4,5 (gray palette for stopped)
}

// Get the correct palette for current distance
function _walkerGetPalette(dist) {
  if (dist < _WLK_D30MIN)  return _WALKER_PAL_HAPPY;
  if (dist < _WLK_D_EMPTY) return _WALKER_PAL_TIRED;
  if (dist < _WLK_D_STOP)  return _WALKER_PAL_EXHAUSTED;
  return _WALKER_PAL_STOPPED;
}

// Build (or return cached) sprites for a given palette
function _buildWalkerSpritesForPalette(pal) {
  var cacheKey = pal['1'];  // body colour is the differentiator
  if (_walkerSpriteCache[cacheKey]) return _walkerSpriteCache[cacheKey];
  var px = _WALKER_PX_SCALE, W = _WALKER_PX_W, H = _WALKER_PX_H;
  var sprites = _WALKER_PX_FRAMES.map(function(f) {
    var c = document.createElement('canvas');
    c.width = W * px; c.height = H * px;
    var ctx = c.getContext('2d');
    for (var i = 0; i < f.length; i++) {
      var col = pal[f[i]]; if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect((i % W) * px, Math.floor(i / W) * px, px, px);
    }
    return c.toDataURL();
  });
  _walkerSpriteCache[cacheKey] = sprites;
  return sprites;
}

// Legacy helper — pre-build all four palettes
function _buildWalkerSprites() {
  _buildWalkerSpritesForPalette(_WALKER_PAL_HAPPY);
  _buildWalkerSpritesForPalette(_WALKER_PAL_TIRED);
  _buildWalkerSpritesForPalette(_WALKER_PAL_EXHAUSTED);
  _buildWalkerSpritesForPalette(_WALKER_PAL_STOPPED);
  return _walkerSpriteCache[_WALKER_PAL_HAPPY['1']];
}

// ── Route Marker Icon Builder ────────────────────────────────────
// visited=false → pink; visited=true → black; beyondLimit → gray
function _buildRouteMarkerIcon(num, name, visited, beyondLimit) {
  var circleBg  = beyondLimit ? '#aaaaaa' : visited ? '#111111' : '#D946A8';
  var circleBdr = beyondLimit ? '#cccccc' : 'white';
  var labelCol  = beyondLimit ? '#888' : '#111';
  var labelBg   = beyondLimit ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.92)';
  return L.divIcon({
    html:
      '<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;cursor:pointer;pointer-events:auto">' +
        '<div style="background:' + circleBg + ';color:white;width:28px;height:28px;border-radius:50%;' +
        'display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;' +
        'border:2px solid ' + circleBdr + ';box-shadow:0 2px 6px rgba(0,0,0,0.3);font-family:Inter,sans-serif;' +
        'flex-shrink:0;pointer-events:auto">' + num + '</div>' +
        '<div style="font-size:9px;font-family:Inter,sans-serif;font-weight:600;color:' + labelCol + ';' +
        'background:' + labelBg + ';padding:2px 5px;border-radius:3px;' +
        'box-shadow:0 1px 4px rgba(0,0,0,0.25);max-width:90px;overflow:hidden;text-overflow:ellipsis;' +
        'pointer-events:auto">' +
        _escHtml(name) + '</div>' +
      '</div>',
    className: '',
    iconSize:   [130, 28],
    iconAnchor: [14, 14]
  });
}

// ── Stamina helpers ──────────────────────────────────────────────
function _walkerGetStamina(dist) {
  if (dist <= _WLK_D30MIN)  return 100 - (dist / _WLK_D30MIN) * 50;
  if (dist <= _WLK_D_EMPTY) return 50 - ((dist - _WLK_D30MIN) / (_WLK_D_EMPTY - _WLK_D30MIN)) * 50;
  return 0;
}
function _walkerGetSpeedMod(dist) {
  if (dist >= _WLK_D_STOP) return 0;  // stopped
  return 1.0;                          // always full speed otherwise
}

// ── Icon builder — distance label + stamina bar + badge in divIcon HTML ──
// badge: null | 'camera' | 'stopped'
function _buildWalkerIcon(frameIdx, facingRight, dist, badge) {
  var pal      = _walkerGetPalette(dist);
  var sprites  = _buildWalkerSpritesForPalette(pal);
  var baseFrame = _walkerGetBaseFrame(dist);
  var src = sprites[Math.min(frameIdx + baseFrame, sprites.length - 1)];
  var stamina = _walkerGetStamina(dist);
  var stopped = dist >= _WLK_D_STOP;
  var spriteW = _WALKER_PX_W * _WALKER_PX_SCALE;  // 24px
  var spriteH = _WALKER_PX_H * _WALKER_PX_SCALE;  // 24px

  // Distance label (topmost)
  var distStr = dist < 1000
    ? Math.round(dist) + 'm'
    : (dist / 1000).toFixed(2) + 'km';
  var distHtml =
    '<div style="font-size:6px;font-family:\'Press Start 2P\',monospace;color:#fff;' +
    'background:rgba(0,0,0,0.72);padding:1px 3px;text-align:center;' +
    'white-space:nowrap;margin-bottom:2px;letter-spacing:0.3px">' + distStr + '</div>';
  var distH = 11;

  // Badge (below distance)
  var badgeHtml = '';
  if (badge === 'camera') {
    badgeHtml = '<div style="font-size:20px;line-height:1;text-align:center;margin-bottom:2px">📷</div>';
  }
  var badgeH = badgeHtml ? 24 : 0;

  // Status label
  var statusTxt = '';
  var statusColor = '#ffaa00';
  if (stopped)         { statusTxt = 'NEED REST!'; statusColor = '#ff8800'; }
  else if (stamina<=0) { statusTxt = 'EXHAUSTED';  statusColor = '#ff3333'; }
  else if (stamina<20) { statusTxt = 'CRITICAL!';  statusColor = '#ff5555'; }
  else if (stamina<50) { statusTxt = 'TIRED';      statusColor = '#ffaa00'; }
  var statusHtml = statusTxt
    ? '<div style="font-size:7px;font-family:\'Press Start 2P\',monospace;color:' + statusColor +
      ';background:rgba(0,0,0,0.75);padding:1px 4px;' +
      'text-align:center;white-space:nowrap;margin-top:-4px;margin-bottom:2px;letter-spacing:0.5px">' + statusTxt + '</div>'
    : '';
  var statusH = statusHtml ? 12 : 0;

  // Stamina bar (40px wide)
  var p = Math.max(0, Math.min(100, stamina));
  var r = p > 50 ? Math.round((100-p)/50*255) : 255;
  var g = p > 50 ? 200 : Math.round(p/50*200);
  var flickerOp = (p < 20 && !stopped) ? (0.45 + 0.55 * Math.abs(Math.sin(Date.now() / 120))) : 1;
  var barHtml =
    '<div style="width:40px;height:6px;background:#1a1a1a;border:1px solid #555;' +
    'margin-bottom:2px;overflow:hidden">' +
    '<div style="width:' + p + '%;height:100%;background:rgb(' + r + ',' + g + ',0);opacity:' + flickerOp.toFixed(2) + '"></div>' +
    '</div>';
  var barH = 10;

  var containerW = 52;
  var aboveH = distH + badgeH + statusH + barH;
  var totalH  = aboveH + spriteH;

  return L.divIcon({
    className: '',
    html: '<div style="display:flex;flex-direction:column;align-items:center;width:' + containerW + 'px;pointer-events:none">' +
          distHtml + badgeHtml + statusHtml + barHtml +
          '<img src="' + src + '" style="width:' + spriteW + 'px;height:' + spriteH + 'px;' +
          'image-rendering:pixelated;display:block;' +
          (facingRight ? '' : 'transform:scaleX(-1);') +
          'filter:drop-shadow(1px 1px 0 rgba(0,0,0,0.7))" draggable="false">' +
          '</div>',
    iconSize:   [containerW, totalH],
    iconAnchor: [containerW / 2, totalH]  // anchor at character feet
  });
}

// ── Photo Flash ──────────────────────────────────────────────────
function _doPhotoFlash(latLng) {
  try {
    var container = map.getContainer();
    var pt   = map.latLngToContainerPoint(latLng);
    var rect = container.getBoundingClientRect();
    var flash = document.createElement('div');
    flash.style.cssText =
      'position:fixed;left:' + (rect.left + pt.x - 20) + 'px;top:' + (rect.top + pt.y - 44) + 'px;' +
      'width:40px;height:40px;border-radius:50%;pointer-events:none;z-index:10000;opacity:1;' +
      'background:radial-gradient(circle,rgba(255,255,220,1) 10%,rgba(255,255,200,0) 70%);' +
      'transition:opacity 0.45s ease-out';
    document.body.appendChild(flash);
    flash.getBoundingClientRect();
    setTimeout(function() { flash.style.opacity = '0'; }, 40);
    setTimeout(function() { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 520);
  } catch(e) {}
}

// ── Nearest coord index helper ────────────────────────────────────
function _closestCoordIdx(coords, lat, lng) {
  var best = 0, bestDsq = Infinity;
  for (var i = 0; i < coords.length; i++) {
    var dl = coords[i][0]-lat, dn = coords[i][1]-lng;
    var dsq = dl*dl + dn*dn;
    if (dsq < bestDsq) { bestDsq = dsq; best = i; }
  }
  return best;
}

// ── Main animation ────────────────────────────────────────────────
// coords: full path points.  stopIndices: which coords[] are stop locations.
function _startWalkerAnimation(coords, stopIndices, ordered, cumDistAtStop) {
  cumDistAtStop = cumDistAtStop || [];
  _stopWalkerAnimation();
  if (!coords || coords.length < 2) return;
  if (!stopIndices || stopIndices.length < 2) stopIndices = [0, coords.length - 1];
  if (!ordered) ordered = [];
  _buildWalkerSprites();
  _walkerDistCovered = 0;
  _walkerPassedStops = new Set();

  // ── Build timeline ──────────────────────────────────────────────
  var PAUSE_MS = 750;
  var segDists = [], totalTravelDist = 0;
  for (var s = 0; s < stopIndices.length - 1; s++) {
    var d = 0;
    for (var ci = stopIndices[s]; ci < stopIndices[s+1] && ci+1 < coords.length; ci++) {
      d += haversineM(coords[ci][0], coords[ci][1], coords[ci+1][0], coords[ci+1][1]);
    }
    segDists.push(d); totalTravelDist += d;
  }
  if (totalTravelDist < 1) return;

  // Set stamina thresholds to equal thirds of this route's total distance
  _WLK_D30MIN  = totalTravelDist / 3;        // 0–1/3  → fresh
  _WLK_D_EMPTY = totalTravelDist * 2 / 3;    // 1/3–2/3 → tired
  _WLK_D_STOP  = totalTravelDist;            // 2/3–end → exhausted, then stopped

  // Travel duration: 10ms/m, clamped 5-20s (2× faster than before)
  var travelMs = Math.min(10000, Math.max(2500, totalTravelDist * 5));

  // pause → travel → pause → travel → ...
  var timeline = [], tCursor = 0;
  timeline.push({ type:'pause', t0:tCursor, t1:tCursor+PAUSE_MS, stopIdx:0 });
  tCursor += PAUSE_MS;
  for (var s = 0; s < stopIndices.length - 1; s++) {
    var segMs = (segDists[s] / totalTravelDist) * travelMs;
    timeline.push({ type:'travel', t0:tCursor, t1:tCursor+segMs,
                    fromIdx:stopIndices[s], toIdx:stopIndices[s+1], segDistM:segDists[s] });
    tCursor += segMs;
    timeline.push({ type:'pause', t0:tCursor, t1:tCursor+PAUSE_MS, stopIdx:s+1 });
    tCursor += PAUSE_MS;
  }
  var timelineTotal = tCursor;

  // Create initial marker
  routeWalkerMarker = L.marker(coords[stopIndices[0]], {
    icon: _buildWalkerIcon(0, true, 0, 'camera'),
    zIndexOffset: 1000, interactive: false
  }).addTo(map);

  // Reveal polyline: only the walked segment is drawn (pink dotted, grows as char walks)
  var _revealStartPt = coords[stopIndices[0]];
  _walkerRevealLine = L.polyline([_revealStartPt, _revealStartPt], {
    color: '#D946A8', weight: 5, opacity: 0.9,
    dashArray: '4 4', lineCap: 'square'
  }).addTo(map);
  _walkerRevealMs = 0;

  // Animation state
  var lastTs = null, accumMs = 0;
  var prevEntryType = null, prevStopIdx = -1;
  var lastIconKey = ''; // for throttling setIcon calls

  function _findEntry() {
    for (var i = 0; i < timeline.length; i++) {
      if (accumMs >= timeline[i].t0 && accumMs < timeline[i].t1) return timeline[i];
    }
    return timeline[timeline.length - 1];
  }

  function animate(ts) {
    if (!routeWalkerMarker) return;
    if (!lastTs) lastTs = ts;
    var dt = Math.min(ts - lastTs, 80); // cap to avoid big jumps
    lastTs = ts;

    // ── Reveal path at full speed (independent of character stamina) ─
    _walkerRevealMs = Math.min(_walkerRevealMs + dt, timelineTotal - 1);
    var revealAccum = _walkerRevealMs;
    var revealEntry = timeline[timeline.length - 1];
    for (var ri = 0; ri < timeline.length; ri++) {
      if (revealAccum >= timeline[ri].t0 && revealAccum < timeline[ri].t1) {
        revealEntry = timeline[ri]; break;
      }
    }
    var revealCoordIdx;
    if (revealEntry.type === 'pause') {
      revealCoordIdx = stopIndices[revealEntry.stopIdx];
    } else {
      var revealProg = Math.max(0, Math.min(1, (revealAccum - revealEntry.t0) / (revealEntry.t1 - revealEntry.t0)));
      revealCoordIdx = Math.min(
        Math.floor(revealEntry.fromIdx + revealProg * (revealEntry.toIdx - revealEntry.fromIdx)),
        revealEntry.toIdx
      );
    }
    var slice = coords.slice(0, revealCoordIdx + 1);
    if (_walkerRevealLine && slice.length >= 2) _walkerRevealLine.setLatLngs(slice);

    // ── Mark visited stops (turn marker black when reveal passes them) ──
    if (_walkerPassedStops) {
      for (var vi = 0; vi < stopIndices.length; vi++) {
        if (!_walkerPassedStops.has(vi) && revealCoordIdx >= stopIndices[vi]) {
          _walkerPassedStops.add(vi);
          if (routeMarkers[vi] && ordered[vi]) {
            routeMarkers[vi].setIcon(_buildRouteMarkerIcon(vi + 1, ordered[vi].name, true));
          }
        }
      }
    }

    // ── Speed mod from distance ──────────────────────────────────
    var stopped  = _walkerDistCovered >= _WLK_D_STOP;
    var speedMod = _walkerGetSpeedMod(_walkerDistCovered);

    // ── Advance virtual clock (no loop — play once and stop) ─────
    if (!stopped) {
      var virtualDt = dt * speedMod;
      var preEntry = _findEntry();
      if (preEntry.type === 'travel') {
        var segMs = preEntry.t1 - preEntry.t0;
        if (segMs > 0) _walkerDistCovered += (virtualDt / segMs) * preEntry.segDistM;
      }
      accumMs = Math.min(accumMs + virtualDt, timelineTotal - 1);
    }

    // ── Animation complete — stop at final stop ──────────────────
    if (accumMs >= timelineTotal - 1 && !stopped) {
      var finalIdx = stopIndices[stopIndices.length - 1];
      if (routeWalkerMarker) routeWalkerMarker.setLatLng(coords[finalIdx]);
      // Show full reveal line
      if (_walkerRevealLine) _walkerRevealLine.setLatLngs(coords);
      // Mark all stops visited
      if (_walkerPassedStops) {
        for (var fi = 0; fi < stopIndices.length; fi++) {
          if (!_walkerPassedStops.has(fi) && ordered[fi]) {
            _walkerPassedStops.add(fi);
            if (routeMarkers[fi]) routeMarkers[fi].setIcon(_buildRouteMarkerIcon(fi+1, ordered[fi].name, true, cumDistAtStop[fi] > _WLK_D_STOP));
          }
        }
      }
      // Leave walker visible at final position — don't loop
      return;
    }

    // ── Resolve current entry ────────────────────────────────────
    var entry = _findEntry();

    // ── Flash on pause entry ─────────────────────────────────────
    var isNewPause = !stopped && entry.type === 'pause' &&
      (prevEntryType !== 'pause' || prevStopIdx !== entry.stopIdx);
    if (isNewPause) _doPhotoFlash(coords[stopIndices[entry.stopIdx]]);
    prevEntryType = entry.type;
    prevStopIdx   = (entry.type === 'pause') ? entry.stopIdx : -1;

    // ── Position & icon ──────────────────────────────────────────
    var frameIdx = Math.floor(ts / _WALKER_FRAME_MS) % 2;  // walking: normal stride (0-1, 2-3, 4-5)
    var isPaused = stopped || entry.type === 'pause';
    var badge    = (!stopped && entry.type === 'pause') ? 'camera' : null;
    var stamPct  = Math.round(_walkerGetStamina(_walkerDistCovered) * 2) / 2; // 0.5% steps
    var dist     = _walkerDistCovered;

    if (isPaused) {
      if (!stopped) {
        var stopCoord = coords[stopIndices[entry.stopIdx]];
        routeWalkerMarker.setLatLng(stopCoord);
      }
      var distKey = Math.floor(dist / 5); // update every 5 m
      var iconKey = 'p:' + badge + ':' + stamPct + ':' + distKey + ':' + (Math.floor(ts / 200) % 2);
      if (iconKey !== lastIconKey) {
        routeWalkerMarker.setIcon(_buildWalkerIcon(0, true, dist, badge));
        lastIconKey = iconKey;
      }
    } else {
      var segProgress = Math.max(0, Math.min(1, (accumMs - entry.t0) / (entry.t1 - entry.t0)));
      var span = entry.toIdx - entry.fromIdx;
      var rawIdx = entry.fromIdx + segProgress * span;
      var c0 = Math.min(Math.floor(rawIdx), entry.toIdx - 1);
      var c1 = Math.min(c0 + 1, entry.toIdx);
      var ct = rawIdx - c0;
      var lat = coords[c0][0] + ct * (coords[c1][0] - coords[c0][0]);
      var lng = coords[c0][1] + ct * (coords[c1][1] - coords[c0][1]);
      var facingRight = (coords[c1][1] - coords[c0][1]) >= 0;

      routeWalkerMarker.setLatLng([lat, lng]);

      var distKey2 = Math.floor(dist / 5);
      var iconKey2 = 't:' + frameIdx + ':' + (facingRight?1:0) + ':' + stamPct + ':' + distKey2 + ':' + (Math.floor(ts / 200) % 2);
      if (iconKey2 !== lastIconKey) {
        routeWalkerMarker.setIcon(_buildWalkerIcon(frameIdx, facingRight, dist, null));
        lastIconKey = iconKey2;
      }
    }

    _walkerAnimId = requestAnimationFrame(animate);
  }
  _walkerAnimId = requestAnimationFrame(animate);
}

function _stopWalkerAnimation() {
  if (_walkerAnimId) { cancelAnimationFrame(_walkerAnimId); _walkerAnimId = null; }
  if (routeWalkerMarker) {
    try { map.removeLayer(routeWalkerMarker); } catch(e) {}
    routeWalkerMarker = null;
  }
  if (_walkerRevealLine) {
    try { map.removeLayer(_walkerRevealLine); } catch(e) {}
    _walkerRevealLine = null;
  }
  _walkerDistCovered = 0;
  _walkerRevealMs    = 0;
  _walkerPassedStops = null;
}

// ── Route Panel UI ───────────────────────────────────────────────

var routePinDropMode  = false;  // kept for init.js compatibility
var _routeActivePopup = null;   // currently open route marker popup

function _getRouteLocs() {
  return typeof getFiltered === 'function'
    ? getFiltered()
    : LOCS.filter(function(l) { return l.city === activeCityKey; });
}

var _ROUTE_PRESEL_THRESHOLD = 12; // max locations before pre-selection modal

function openRoutePanel() {
  routeActive = true;
  var sbaRoute = document.getElementById('sba-route');
  if (sbaRoute) sbaRoute.classList.add('sba-active');
  if (typeof _updateSetRouteFab === 'function') _updateSetRouteFab(); // hide FAB
  if (!document.getElementById('route-panel')) _createRoutePanel();
  var panel = document.getElementById('route-panel');
  panel.classList.remove('minimized');
  panel.classList.add('visible');

  // If we already have route locations (e.g. "Back to Map" was pressed), restore UI
  if (routeLocations.length > 0) {
    _refreshRouteUI();
    return;
  }

  // If too many locations, show pre-selection modal first
  var locs = _getRouteLocs();
  if (locs.length > _ROUTE_PRESEL_THRESHOLD) {
    _showRoutePreselModal(locs);
    return;
  }

  // Auto-populate from current filtered list
  routeLocations = locs.slice();
  _refreshRouteUI();
  if (routeLocations.length >= 2) calcRoute();
}

function closeRoutePanel() {
  routeActive = false;
  var sbaRoute = document.getElementById('sba-route');
  if (sbaRoute) sbaRoute.classList.remove('sba-active');
  _closeRouteCustomPopup();
  if (typeof _updateSetRouteFab === 'function') _updateSetRouteFab(); // re-show FAB
  var panel = document.getElementById('route-panel');
  if (panel) { panel.classList.remove('visible'); panel.classList.remove('minimized'); }
  clearRoute();
}

function _createRoutePanel() {
  var div = document.createElement('div');
  div.id = 'route-panel';
  div.className = 'route-panel';
  div.innerHTML =
    '<div class="route-panel-hdr" style="position:relative">' +
      '<button class="route-panel-back" onclick="_routePanelBack()" title="' + (LANG === 'ko' ? '지도로 돌아가기' : 'Back to map') + '">⬅</button>' +
      '<span class="route-panel-title">🗺 ' + (LANG === 'ko' ? '루트 플래너' : 'Route Planner') + '</span>' +
      '<div class="route-hdr-right">' +
        '<button class="route-btn-save" onclick="_saveMyRoute()" title="' + (LANG === 'ko' ? '루트 저장' : 'Save route') + '">💾</button>' +
        '<button class="route-btn-load" onclick="_loadMyRoute()" title="' + (LANG === 'ko' ? '저장된 루트 불러오기' : 'Load saved route') + '">📂</button>' +
        '<button class="route-btn route-btn-clear" id="route-top-clear" onclick="clearRouteSelection()" style="display:none">✕ ' +
          (LANG === 'ko' ? '초기화' : 'Clear') + '</button>' +
        '<button class="route-panel-close" onclick="closeRoutePanel()" title="' + (LANG === 'ko' ? '닫기 및 초기화' : 'Close & clear') + '">✕</button>' +
      '</div>' +
      '<div class="route-save-toast" id="route-save-toast"></div>' +
    '</div>' +
    '<div class="route-panel-body" id="route-panel-body">' +
      '<div class="route-stop-list" id="route-sel-list"></div>' +
      '<div class="route-result" id="route-result" style="display:none"></div>' +
    '</div>';
  document.body.appendChild(div);
}

function clearRouteSelection() {
  _closeRouteCustomPopup();
  routeLocations = [];
  clearRoute();
  _refreshRouteUI();
}

// Hide route panel without clearing route state (Back to Map)
function _routePanelBack() {
  var panel = document.getElementById('route-panel');
  if (!panel) return;
  // On mobile, if a route has been built keep the minimized peek bar visible
  if (window.innerWidth <= 900 && routeLocations.length >= 2) {
    _minimizeRoutePanelMobile();
  } else {
    panel.classList.remove('visible');
  }
  // Keep routeActive, routeLocations, and drawn route intact
}

// ══════════════════════════════════════════════════════════════════
// ROUTE SETTINGS (persisted)
// ══════════════════════════════════════════════════════════════════

var _ROUTE_SETTINGS_KEY = 'aw_route_settings_v1';
var _routeMaxDistM      = 6000;   // max before 6km warning
var _routeAnimEnabled   = true;   // walker animation

(function _loadRouteSettings() {
  try {
    var s = JSON.parse(localStorage.getItem(_ROUTE_SETTINGS_KEY) || '{}');
    if (typeof s.maxDistM    === 'number') { _routeMaxDistM = s.maxDistM; _WLK_D_STOP = s.maxDistM; }
    if (typeof s.animEnabled === 'boolean') _routeAnimEnabled = s.animEnabled;
  } catch(e) {}
})();

function _saveRouteSettings() {
  localStorage.setItem(_ROUTE_SETTINGS_KEY, JSON.stringify({
    maxDistM: _routeMaxDistM, animEnabled: _routeAnimEnabled
  }));
}

// ── Saved Routes Storage ─────────────────────────────────────────

function _getSavedRoutes() {
  try { return JSON.parse(localStorage.getItem(_SAVED_ROUTES_KEY) || '[]'); }
  catch(e) { return []; }
}
function _putSavedRoutes(routes) {
  localStorage.setItem(_SAVED_ROUTES_KEY, JSON.stringify(routes));
}

// Generate default name: e.g. "seoul-gangnam-15mins-01"
function _generateDefaultRouteName() {
  var city = (typeof activeCityKey !== 'undefined' && activeCityKey) ? activeCityKey : 'city';

  // Most common neighborhood
  var hoodCount = {};
  routeLocations.forEach(function(l) {
    if (l.hood) hoodCount[l.hood] = (hoodCount[l.hood] || 0) + 1;
  });
  var hood = 'area', maxCnt = 0;
  Object.keys(hoodCount).forEach(function(h) {
    if (hoodCount[h] > maxCnt) { maxCnt = hoodCount[h]; hood = h; }
  });
  var hoodSlug = hood.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'area';

  // Duration
  var durMin = 15;
  if (routeData && routeData.duration) durMin = Math.ceil(routeData.duration / 60);
  else if (routeLocations.length > 0) durMin = routeLocations.length * 5;
  var durRounded = Math.max(5, Math.round(durMin / 5) * 5);
  var durStr = durRounded + 'mins';

  // Auto-increment index
  var saved = _getSavedRoutes();
  var prefix = city + '-' + hoodSlug + '-' + durStr + '-';
  var maxIdx = 0;
  saved.forEach(function(r) {
    if (r.name && r.name.indexOf(prefix) === 0) {
      var n = parseInt(r.name.slice(prefix.length), 10);
      if (!isNaN(n) && n > maxIdx) maxIdx = n;
    }
  });
  return prefix + String(maxIdx + 1).padStart(2, '0');
}

// Show save dialog with editable name
function _saveMyRoute() {
  if (!routeLocations.length) return;
  var defaultName = _generateDefaultRouteName();
  var existing = document.getElementById('aw-save-route-dialog');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var ko = typeof LANG !== 'undefined' && LANG === 'ko';
  var dlg = document.createElement('div');
  dlg.id = 'aw-save-route-dialog';
  dlg.className = 'aw-dialog-overlay';
  dlg.innerHTML =
    '<div class="aw-dialog-box">' +
      '<div class="aw-dialog-title">' + (ko ? '루트 저장' : 'Save Route') + '</div>' +
      '<div class="aw-dialog-sub">' + (ko ? '루트 이름을 설정하세요' : 'Name this route') + '</div>' +
      '<input class="aw-dialog-input" id="aw-route-name-input" type="text"' +
        ' value="' + _escHtml(defaultName) + '" maxlength="60" autocomplete="off" spellcheck="false">' +
      '<div class="aw-dialog-btns">' +
        '<button class="aw-dialog-btn aw-dialog-cancel" onclick="_cancelSaveRoute()">✕&nbsp;' + (ko ? '취소' : 'Cancel') + '</button>' +
        '<button class="aw-dialog-btn aw-dialog-confirm" onclick="_confirmSaveRoute()">✓&nbsp;' + (ko ? '저장' : 'Save') + '</button>' +
      '</div>' +
    '</div>';
  dlg.addEventListener('click', function(e) { if (e.target === dlg) _cancelSaveRoute(); });
  document.body.appendChild(dlg);
  var inp = document.getElementById('aw-route-name-input');
  if (inp) {
    inp.focus(); inp.select();
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') _confirmSaveRoute();
      if (e.key === 'Escape') _cancelSaveRoute();
    });
  }
}

function _cancelSaveRoute() {
  var dlg = document.getElementById('aw-save-route-dialog');
  if (dlg && dlg.parentNode) dlg.parentNode.removeChild(dlg);
}

function _confirmSaveRoute() {
  var inp = document.getElementById('aw-route-name-input');
  var name = inp ? inp.value.trim() : '';
  if (!name) name = _generateDefaultRouteName();

  var hoodCount = {};
  routeLocations.forEach(function(l) {
    if (l.hood) hoodCount[l.hood] = (hoodCount[l.hood] || 0) + 1;
  });
  var topHood = '', maxCnt = 0;
  Object.keys(hoodCount).forEach(function(h) {
    if (hoodCount[h] > maxCnt) { maxCnt = hoodCount[h]; topHood = h; }
  });

  var entry = {
    id:          'r-' + Date.now(),
    name:        name,
    city:        (typeof activeCityKey !== 'undefined') ? activeCityKey : '',
    locationIds: routeLocations.map(function(l) { return l.id; }),
    stops:       routeLocations.length,
    hood:        topHood,
    duration:    routeData ? Math.round(routeData.duration) : 0,
    distance:    routeData ? Math.round(routeData.distance) : 0,
    savedAt:     Date.now()
  };
  var routes = _getSavedRoutes();
  routes.push(entry);
  _putSavedRoutes(routes);
  // Immediately refresh My Journey count so sidebar shows updated number
  if (typeof _updatePassportStats === 'function') _updatePassportStats();
  _cancelSaveRoute();

  var toast = document.getElementById('route-save-toast');
  if (toast) {
    var ko = typeof LANG !== 'undefined' && LANG === 'ko';
    toast.textContent = (ko ? '저장됨 ✓ ' : 'Saved ✓ ') + name;
    toast.style.opacity = '1';
    setTimeout(function() { if (toast) toast.style.opacity = '0'; }, 2500);
  }
}

// 📂 button in route panel → open manager at saved-routes level
function _loadMyRoute() { _openRouteManager('saved'); }

// Load a specific saved route into the planner
function _loadSavedRouteById(id) {
  var routes = _getSavedRoutes();
  var found  = routes.find(function(r) { return r.id === id; });
  if (!found) return;
  var allLocs = typeof LOCS !== 'undefined' ? LOCS : [];
  var loaded  = found.locationIds.map(function(lid) {
    return allLocs.find(function(l) { return l.id === lid; });
  }).filter(Boolean);
  if (!loaded.length) {
    var ko = typeof LANG !== 'undefined' && LANG === 'ko';
    alert(ko ? '현재 도시 데이터에서 위치를 찾을 수 없습니다.' : 'Could not find locations in current city data.');
    return;
  }
  _closeRouteManager();
  routeLocations = loaded;
  if (!document.getElementById('route-panel')) _createRoutePanel();
  var panel = document.getElementById('route-panel');
  panel.classList.remove('minimized');
  panel.classList.add('visible');
  routeActive = true;
  if (typeof _updateSetRouteFab === 'function') _updateSetRouteFab();
  _refreshRouteUI();
  if (routeLocations.length >= 2) calcRoute();
}

// ══════════════════════════════════════════════════════════════════
// ROUTE MANAGER POPUP  (multi-level: home → saved | settings)
// ══════════════════════════════════════════════════════════════════

function _openRouteManager(startLevel) {
  var sbaRoute = document.getElementById('sba-route');
  if (sbaRoute) sbaRoute.classList.add('sba-active');
  var existing = document.getElementById('aw-route-manager');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var overlay = document.createElement('div');
  overlay.id  = 'aw-route-manager';
  overlay.className = 'arm-overlay';
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) _closeRouteManager();
  });
  var panel = document.createElement('div');
  panel.className = 'arm-panel';
  panel.id = 'arm-panel';
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  _rmRender(startLevel || 'home');
}

function _closeRouteManager() {
  var el = document.getElementById('aw-route-manager');
  if (el && el.parentNode) el.parentNode.removeChild(el);
  // sba-route only stays active if route panel is also open
  if (!routeActive) {
    var sbaRoute = document.getElementById('sba-route');
    if (sbaRoute) sbaRoute.classList.remove('sba-active');
  }
}

function _rmRender(level) {
  var panel = document.getElementById('arm-panel');
  if (!panel) return;
  var ko = typeof LANG !== 'undefined' && LANG === 'ko';
  if      (level === 'home')     panel.innerHTML = _rmHomeHTML(ko);
  else if (level === 'saved')    panel.innerHTML = _rmSavedHTML(ko);
  else if (level === 'settings') panel.innerHTML = _rmSettingsHTML(ko);
}

function _rmHomeHTML(ko) {
  return '<div class="arm-header">' +
    '<button class="arm-back" onclick="_closeRouteManager()">⬅</button>' +
    '<span class="arm-title">🗺&nbsp;' + (ko ? '루트 매니저' : 'Route Manager') + '</span>' +
    '<button class="arm-close" onclick="_closeRouteManager()">✕</button>' +
  '</div>' +
  '<div class="arm-menu">' +
    '<button class="arm-item arm-item-create" onclick="_rmCreateRoute()">' +
      '<span class="arm-item-icon">▶</span>' +
      '<span class="arm-item-text">' +
        '<span class="arm-item-label">' + (ko ? '루트 만들기' : 'Create Route') + '</span>' +
        '<span class="arm-item-sub">' + (ko ? '현재 필터를 기반으로 루트 생성' : 'Build from current filter') + '</span>' +
      '</span>' +
    '</button>' +
    '<button class="arm-item" onclick="_rmRender(\'saved\')">' +
      '<span class="arm-item-icon">📂</span>' +
      '<span class="arm-item-text">' +
        '<span class="arm-item-label">' + (ko ? '저장된 루트' : 'Saved Routes') + '</span>' +
        '<span class="arm-item-sub">' + (ko ? '저장된 루트 목록에서 선택' : 'Load from your saved routes') + '</span>' +
      '</span>' +
      '<span class="arm-item-arrow">›</span>' +
    '</button>' +
    '<button class="arm-item" onclick="_rmRender(\'settings\')">' +
      '<span class="arm-item-icon">⚙</span>' +
      '<span class="arm-item-text">' +
        '<span class="arm-item-label">' + (ko ? '루트 설정' : 'Route Settings') + '</span>' +
        '<span class="arm-item-sub">' + (ko ? '반경, 거리, 애니메이션 설정' : 'Radius, distance, animation') + '</span>' +
      '</span>' +
      '<span class="arm-item-arrow">›</span>' +
    '</button>' +
  '</div>';
}

function _rmSavedHTML(ko) {
  var routes = _getSavedRoutes();
  var rowsHtml = '';
  if (!routes.length) {
    rowsHtml = '<div class="arm-empty">' + (ko ? '저장된 루트가 없습니다' : 'No saved routes yet') + '</div>';
  } else {
    rowsHtml = routes.slice().reverse().map(function(r) {
      var durMin  = r.duration ? Math.ceil(r.duration / 60) : 0;
      var durStr  = durMin > 0
        ? (durMin < 60 ? durMin + (ko ? '분' : 'min') : Math.floor(durMin/60) + 'h ' + (durMin%60) + (ko ? '분' : 'min'))
        : '—';
      var distStr = r.distance > 0
        ? (r.distance < 1000 ? Math.round(r.distance) + 'm' : (r.distance/1000).toFixed(1) + 'km') : '—';
      var dateStr = r.savedAt ? new Date(r.savedAt).toLocaleDateString() : '';
      return '<div class="arm-route-row">' +
        '<div class="arm-route-main">' +
          '<div class="arm-route-name">' + _escHtml(r.name) + '</div>' +
          '<div class="arm-route-meta">' +
            (r.city ? '<span class="arm-tag">' + _escHtml(r.city) + (r.hood ? ' · ' + _escHtml(r.hood) : '') + '</span>' : '') +
            (r.stops ? '<span class="arm-tag">📍 ' + r.stops + (ko ? '개' : '') + '</span>' : '') +
            (durStr !== '—' ? '<span class="arm-tag">⏱ ' + durStr + '</span>' : '') +
            (distStr !== '—' ? '<span class="arm-tag">🚶 ' + distStr + '</span>' : '') +
            (dateStr ? '<span class="arm-tag arm-tag-date">' + dateStr + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="arm-route-btns">' +
          '<button class="arm-load-btn" onclick="_rmLoadRoute(\'' + r.id + '\')">' + (ko ? '불러오기' : 'Load') + '</button>' +
          '<button class="arm-del-btn"  onclick="_rmDeleteRoute(\'' + r.id + '\')">🗑</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }
  return '<div class="arm-header">' +
    '<button class="arm-back" onclick="_rmRender(\'home\')">⬅</button>' +
    '<span class="arm-title">📂&nbsp;' + (ko ? '저장된 루트' : 'Saved Routes') + '</span>' +
    '<button class="arm-close" onclick="_closeRouteManager()">✕</button>' +
  '</div>' +
  '<div class="arm-scrollable">' + rowsHtml + '</div>' +
  (routes.length > 0
    ? '<div class="arm-footer"><button class="arm-export-btn" onclick="_exportSavedRoutesJson()">⬇&nbsp;' + (ko ? 'JSON 내보내기' : 'Export JSON') + '</button></div>'
    : '');
}

function _rmSettingsHTML(ko) {
  var maxKm = (_routeMaxDistM / 1000).toFixed(1);
  var radius = typeof walkRadius !== 'undefined' ? walkRadius : 15;
  return '<div class="arm-header">' +
    '<button class="arm-back" onclick="_rmRender(\'home\')">⬅</button>' +
    '<span class="arm-title">⚙&nbsp;' + (ko ? '루트 설정' : 'Route Settings') + '</span>' +
    '<button class="arm-close" onclick="_closeRouteManager()">✕</button>' +
  '</div>' +
  '<div class="arm-settings">' +
    '<div class="arm-srow">' +
      '<div class="arm-slabel">' +
        '<span class="arm-sname">' + (ko ? '기본 도보 반경' : 'Default Walk Radius') + '</span>' +
        '<span class="arm-sdesc">' + (ko ? 'Near Me 기본 반경 (분)' : 'Near Me default radius') + '</span>' +
      '</div>' +
      '<div class="arm-sctrl">' +
        '<input type="number" class="arm-num" id="arm-walk-radius" value="' + radius + '" min="5" max="60" step="5">' +
        '<span class="arm-unit">' + (ko ? '분' : 'min') + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="arm-srow">' +
      '<div class="arm-slabel">' +
        '<span class="arm-sname">' + (ko ? '최대 루트 거리' : 'Max Route Distance') + '</span>' +
        '<span class="arm-sdesc">' + (ko ? '초과 시 경고 표시' : 'Warning threshold') + '</span>' +
      '</div>' +
      '<div class="arm-sctrl">' +
        '<input type="number" class="arm-num" id="arm-max-dist" value="' + maxKm + '" min="1" max="30" step="0.5">' +
        '<span class="arm-unit">km</span>' +
      '</div>' +
    '</div>' +
    '<div class="arm-srow">' +
      '<div class="arm-slabel">' +
        '<span class="arm-sname">' + (ko ? '루트 애니메이션' : 'Route Animation') + '</span>' +
        '<span class="arm-sdesc">' + (ko ? '워커 캐릭터 애니메이션' : 'Walker character animation') + '</span>' +
      '</div>' +
      '<div class="arm-sctrl">' +
        '<label class="arm-toggle">' +
          '<input type="checkbox" id="arm-anim-toggle"' + (_routeAnimEnabled ? ' checked' : '') + ' onchange="_routeAnimEnabled=this.checked">' +
          '<span class="arm-toggle-track"><span class="arm-toggle-thumb"></span></span>' +
        '</label>' +
      '</div>' +
    '</div>' +
    '<div class="arm-srow arm-srow-apply">' +
      '<button class="arm-apply-btn" onclick="_rmApplySettings()">' + (ko ? '설정 저장' : 'Apply & Save') + '</button>' +
    '</div>' +
    '<div class="arm-srow arm-srow-export">' +
      '<div class="arm-slabel">' +
        '<span class="arm-sname">' + (ko ? '루트 데이터 내보내기' : 'Export Route Data') + '</span>' +
        '<span class="arm-sdesc">' + (ko ? '저장된 모든 루트를 JSON으로' : 'All saved routes as JSON') + '</span>' +
      '</div>' +
      '<button class="arm-export-inline" onclick="_exportSavedRoutesJson()">⬇ JSON</button>' +
    '</div>' +
  '</div>';
}

function _rmCreateRoute() {
  _closeRouteManager();
  openRoutePanel();
}

function _rmLoadRoute(id) {
  _loadSavedRouteById(id);
}

function _rmDeleteRoute(id) {
  var routes = _getSavedRoutes().filter(function(r) { return r.id !== id; });
  _putSavedRoutes(routes);
  _rmRender('saved');
}

function _rmApplySettings() {
  var rInp = document.getElementById('arm-walk-radius');
  var dInp = document.getElementById('arm-max-dist');
  if (rInp) {
    var r = parseInt(rInp.value, 10);
    if (!isNaN(r) && r >= 5 && r <= 60 && typeof walkRadius !== 'undefined') {
      walkRadius = r;
      var sl = document.getElementById('walk-slider'), lb = document.getElementById('walk-label');
      if (sl) sl.value = r;
      if (lb) lb.textContent = r + ' min';
    }
  }
  if (dInp) {
    var d = parseFloat(dInp.value);
    if (!isNaN(d) && d >= 1 && d <= 30) {
      _routeMaxDistM = Math.round(d * 1000);
      _WLK_D_STOP    = _routeMaxDistM;
    }
  }
  _saveRouteSettings();
  // Success toast inside panel
  var panel = document.getElementById('arm-panel');
  if (!panel) return;
  var prev = panel.querySelector('.arm-toast');
  if (prev) prev.parentNode.removeChild(prev);
  var t = document.createElement('div');
  t.className = 'arm-toast';
  var ko = typeof LANG !== 'undefined' && LANG === 'ko';
  t.textContent = ko ? '설정 저장됨 ✓' : 'Settings saved ✓';
  panel.appendChild(t);
  setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 2200);
}

// Shared export (called from multiple levels)
function _deleteSavedRoute(id) {
  // alias used by old code paths; route manager is the canonical UI now
  _rmDeleteRoute(id);
}

function _exportSavedRoutesJson() {
  var routes = _getSavedRoutes();
  var json   = JSON.stringify(routes, null, 2);
  var blob   = new Blob([json], { type: 'application/json' });
  var url    = URL.createObjectURL(blob);
  var a      = document.createElement('a');
  a.href = url;
  a.download = 'archwander-routes-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() { URL.revokeObjectURL(url); if (a.parentNode) a.parentNode.removeChild(a); }, 1000);
}

function removeRouteStop(locId) {
  _closeRouteCustomPopup();
  routeLocations = routeLocations.filter(function(l) { return l.id !== locId; });
  _refreshRouteUI();
  if (routeLocations.length >= 2) {
    _routeSkipAnim = true; // instant redraw — no animation restart
    calcRoute();
  } else {
    clearRoute();
  }
}

function _refreshRouteUI() {
  var selList  = document.getElementById('route-sel-list');
  var topClear = document.getElementById('route-top-clear');
  if (topClear) topClear.style.display = routeLocations.length >= 1 ? 'inline-flex' : 'none';
  if (!selList) return;
  if (routeLocations.length === 0) {
    selList.innerHTML = '<div class="route-sel-empty">' +
      (LANG === 'ko' ? '현재 필터에 장소가 없습니다' : 'No locations match current filters') + '</div>';
    return;
  }
  // Summary header: total stops + distance (if route already calculated)
  var ko = LANG === 'ko';
  var distPart = '';
  if (typeof routeData !== 'undefined' && routeData && routeData.distance > 0) {
    var dStr = routeData.distance < 1000
      ? Math.round(routeData.distance) + 'm'
      : (routeData.distance / 1000).toFixed(1) + 'km';
    distPart = '<span class="rsl-dist">🚶 ' + dStr + '</span>';
  }
  var header = '<div class="rsl-header">' +
    '<span class="rsl-count">📍 ' + (ko ? '총 ' + routeLocations.length + ' 곳' : routeLocations.length + ' stop' + (routeLocations.length !== 1 ? 's' : '')) + '</span>' +
    distPart +
  '</div>';

  selList.innerHTML = header + routeLocations.map(function(loc, i) {
    return '<div class="route-sel-item" data-id="' + loc.id + '">' +
      '<span class="route-sel-num">' + (i + 1) + '</span>' +
      '<span class="route-sel-name">' + _routeLocName(loc) + '</span>' +
      '<button class="route-sel-remove" onclick="removeRouteStop(\'' + loc.id + '\')">✕</button>' +
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

// ── OSRM Route Calculation ───────────────────────────────────────

function calcRoute() {
  if (routeLocations.length < 2) return;

  // Optimize order using nearest-neighbor heuristic
  var ordered = _optimizeOrder(routeLocations);
  routeLocations = ordered;
  _refreshRouteUI();

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

  var coords = route.geometry.coordinates.map(function(c) { return [c[1], c[0]]; });
  routeLine = null;

  // Cumulative distance at each stop via OSRM leg distances
  var cumDistAtStop = [0];
  var cumDist = 0;
  if (route.legs) {
    route.legs.forEach(function(leg) {
      cumDist += leg.distance;
      cumDistAtStop.push(cumDist);
    });
  }

  var stopIndices = [];
  ordered.forEach(function(loc, i) {
    var distAtStop = cumDistAtStop[i] || 0;
    var beyondLimit = distAtStop > _WLK_D_STOP;
    var m = L.marker([loc.lat, loc.lng], {
      icon: _buildRouteMarkerIcon(i + 1, loc.name, false, beyondLimit),
      opacity: beyondLimit ? 0.35 : 1.0,
      zIndexOffset: beyondLimit ? -100 : 0
    })
    .on('click', (function(l, beyond) {
      return function(e) {
        L.DomEvent.stopPropagation(e);
        _showRouteMarkerPopup(l, beyond);
      };
    })(loc, beyondLimit))
    .addTo(map);
    routeMarkers.push(m);
    stopIndices.push(_closestCoordIdx(coords, loc.lat, loc.lng));
  });

  map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
  routeData = { distance: route.distance, duration: route.duration, stops: ordered.length, legs: route.legs || [] };
  _renderRouteResult(routeData, ordered, cumDistAtStop);
  // Hide regular flag markers for route stops (numbered markers now show instead)
  if (typeof syncMarkers === 'function') syncMarkers();
  // Warn if total route exceeds 6km
  _check6kmWarning();

  if (_routeSkipAnim) {
    _routeSkipAnim = false;
    // Instant final state: draw full reveal line, mark all stops as visited
    _walkerRevealLine = L.polyline(coords, {
      color: '#D946A8', weight: 5, opacity: 0.85, dashArray: '4 4', lineCap: 'square'
    }).addTo(map);
    routeMarkers.forEach(function(m, i) {
      if (ordered[i]) m.setIcon(_buildRouteMarkerIcon(i+1, ordered[i].name, true, (cumDistAtStop[i]||0) > _WLK_D_STOP));
    });
  } else {
    _startWalkerAnimation(coords, stopIndices, ordered, cumDistAtStop);
  }
}

function _displayStraightRoute(ordered) {
  clearRoute();

  var coords = ordered.map(function(loc) { return [loc.lat, loc.lng]; });
  routeLine = null;

  // Compute cumulative straight-line distances
  var cumDistAtStop = [0];
  var running = 0;
  for (var i = 1; i < ordered.length; i++) {
    running += haversineM(ordered[i-1].lat, ordered[i-1].lng, ordered[i].lat, ordered[i].lng);
    cumDistAtStop.push(running);
  }

  ordered.forEach(function(loc, i) {
    var distAtStop = cumDistAtStop[i] || 0;
    var beyondLimit = distAtStop > _WLK_D_STOP;
    var m = L.marker([loc.lat, loc.lng], {
      icon: _buildRouteMarkerIcon(i + 1, loc.name, false, beyondLimit),
      opacity: beyondLimit ? 0.35 : 1.0,
      zIndexOffset: beyondLimit ? -100 : 0
    })
    .on('click', (function(l, beyond) {
      return function(e) {
        L.DomEvent.stopPropagation(e);
        _showRouteMarkerPopup(l, beyond);
      };
    })(loc, beyondLimit))
    .addTo(map);
    routeMarkers.push(m);
  });

  map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
  routeData = { distance: running, duration: running / 1.33, stops: ordered.length, legs: [], estimated: true };
  _renderRouteResult(routeData, ordered, cumDistAtStop);
  // Hide regular flag markers for route stops (numbered markers now show instead)
  if (typeof syncMarkers === 'function') syncMarkers();
  // Warn if total route exceeds 6km
  _check6kmWarning();
  var stopIndices = coords.map(function(_, i) { return i; });

  if (_routeSkipAnim) {
    _routeSkipAnim = false;
    _walkerRevealLine = L.polyline(coords, {
      color: '#D946A8', weight: 5, opacity: 0.85, dashArray: '4 4', lineCap: 'square'
    }).addTo(map);
    routeMarkers.forEach(function(m, i) {
      if (ordered[i]) m.setIcon(_buildRouteMarkerIcon(i+1, ordered[i].name, true, (cumDistAtStop[i]||0) > _WLK_D_STOP));
    });
  } else {
    _startWalkerAnimation(coords, stopIndices, ordered, cumDistAtStop);
  }
}

// ── Route Marker Popup (custom DOM — works on mobile) ────────────

function _showRouteMarkerPopup(loc, beyondLimit) {
  _closeRouteCustomPopup();

  var catBadge = _pCat(loc);
  var catClass = (typeof CAT_CC_MAP !== 'undefined' && CAT_CC_MAP[catBadge]) ? CAT_CC_MAP[catBadge] : 'c-lmk';
  var beyondNote = beyondLimit
    ? '<div class="rmp-beyond">⚠ ' + (LANG === 'ko' ? '6km 범위 밖' : 'Beyond 6km') + '</div>'
    : '';

  // Thumbnail: SV primary (orientation-aware) → photo fallback → nothing
  var thumbHtml = '';
  var hasSvKey = typeof GOOGLE_MAPS_API_KEY !== 'undefined' && GOOGLE_MAPS_API_KEY;
  var svEmbedSrc = '';
  if (loc.sv && hasSvKey) {
    var svLat = loc.sv.lat || loc.lat;
    var svLng = loc.sv.lng || loc.lng;
    var svQ = 'key=' + GOOGLE_MAPS_API_KEY +
      '&heading=' + (loc.sv.heading || 0) +
      '&pitch='   + (loc.sv.pitch   || 0) +
      '&fov='     + (loc.sv.fov     || 90);
    if (loc.sv.panoId) svQ += '&pano=' + loc.sv.panoId;
    else               svQ += '&location=' + svLat + ',' + svLng;
    svEmbedSrc = 'https://www.google.com/maps/embed/v1/streetview?' + svQ;
  }
  var SV_ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; magnetometer; picture-in-picture';
  var svIntArr = (loc.svInt && loc.svInt.length) ? loc.svInt : (loc.svInt ? [loc.svInt] : []);
  var hasInt = svIntArr.length > 0;

  if (svEmbedSrc) {
    // SV is primary — device orientation/direction works on mobile
    var togBar = '';
    if (hasInt) {
      var togBtns = '<button class="rmp-sv-tog active" onclick="_rmpSvToggle(this,\'outdoor\')">' +
        (LANG === 'ko' ? '외부' : 'Outdoor') + '</button>';
      for (var ii = 0; ii < svIntArr.length; ii++) {
        var intLabel = svIntArr.length === 1
          ? (LANG === 'ko' ? '내부' : 'Interior')
          : (LANG === 'ko' ? '내부 ' + (ii + 1) : 'Interior ' + (ii + 1));
        togBtns += '<button class="rmp-sv-tog" onclick="_rmpSvToggle(this,\'interior-' + ii + '\')">' + intLabel + '</button>';
      }
      togBar = '<div class="rmp-sv-tog-bar">' + togBtns + '</div>';
    }
    var outdoorPane = '<div class="rmp-sv-pane rmp-sv-outdoor">' +
      '<iframe src="' + svEmbedSrc + '" allowfullscreen allow="' + SV_ALLOW + '" loading="lazy"></iframe>' +
      '</div>';
    var intPanes = '';
    if (hasInt) {
      for (var ji = 0; ji < svIntArr.length; ji++) {
        var si = svIntArr[ji];
        var svCfgObj = {
          panoId: si.panoId || null,
          lat:    (si.lat     != null) ? si.lat     : loc.lat,
          lng:    (si.lng     != null) ? si.lng     : loc.lng,
          h:      (si.heading != null) ? si.heading : 0,
          p:      (si.pitch   != null) ? si.pitch   : 0,
          f:      Math.min(100, Math.max(10, (si.fov != null) ? si.fov : 90))
        };
        var svCfgStr = JSON.stringify(svCfgObj).replace(/'/g, '&#39;');
        intPanes += '<div class="rmp-sv-pane rmp-sv-interior" data-sv-cfg=\'' + svCfgStr + '\' style="display:none"></div>';
      }
    }
    thumbHtml = '<div class="rmp-sv-wrap">' + togBar + outdoorPane + intPanes + '</div>';
  } else if (loc.photos && loc.photos.length > 0) {
    // Photo fallback (no SV data for this location)
    var pUrl = loc.photos[0];
    if (pUrl.indexOf('wikimedia') >= 0 || pUrl.indexOf('commons') >= 0) {
      pUrl = pUrl.replace(/[?&]width=\d+/, '') + (pUrl.indexOf('?') >= 0 ? '&' : '?') + 'width=400';
    }
    thumbHtml = '<div class="rmp-thumb">' +
      '<img src="' + pUrl + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'">' +
      '</div>';
  }

  var el = document.createElement('div');
  el.id = 'route-custom-popup';
  el.className = 'route-custom-popup';
  // rmp-close sits at popup root (absolute, z:10) — floats over thumb or body
  el.innerHTML =
    '<button class="rmp-close" onclick="_closeRouteCustomPopup()" aria-label="close">✕</button>' +
    thumbHtml +
    '<div class="rmp-body">' +
      '<div class="rmp-name" onclick="_closeRouteCustomPopup();openLocById(\'' + loc.id + '\')" style="cursor:pointer;text-decoration:underline;text-underline-offset:2px">' + _escHtml(loc.name) + '</div>' +
      '<div class="rmp-meta">' +
        '<span class="cat-badge ' + catClass + '" style="font-size:10px">' + catBadge + '</span>' +
        (loc.hood ? '<span style="color:#888"> · ' + _escHtml(loc.hood) + '</span>' : '') +
      '</div>' +
      beyondNote +
      '<button class="rmp-remove" onclick="_routePopupRemove(\'' + loc.id + '\')">✕ ' +
        (LANG === 'ko' ? '루트에서 제거' : 'Remove from route') +
      '</button>' +
    '</div>';
  document.body.appendChild(el);

  var isMobile = window.innerWidth <= 900;
  if (isMobile) {
    // Fixed bottom card, above the minimized panel peek bar (52px) + small gap
    el.style.cssText =
      'position:fixed;bottom:64px;left:50%;transform:translateX(-50%);z-index:3000;';
  } else {
    // Position near marker on desktop — get marker's screen coordinates
    var pt  = map.latLngToContainerPoint([loc.lat, loc.lng]);
    var box = map.getContainer().getBoundingClientRect();
    var sx  = box.left + pt.x;
    var sy  = box.top  + pt.y;
    // After appending we can measure el size
    var pw = el.offsetWidth  || 220;
    var ph = el.offsetHeight || 110;
    var left = Math.max(8, Math.min(sx - pw / 2, window.innerWidth  - pw - 8));
    var top  = Math.max(8, Math.min(sy - ph - 16, window.innerHeight - ph - 8));
    el.style.cssText =
      'position:fixed;left:' + left + 'px;top:' + top + 'px;z-index:3000;';
  }

  _routeActivePopup = el;

  // Close when user taps elsewhere on the map
  setTimeout(function() {
    map.once('click', function() { _closeRouteCustomPopup(); });
  }, 80);
}

function _closeRouteCustomPopup() {
  var el = document.getElementById('route-custom-popup');
  if (el && el.parentNode) el.parentNode.removeChild(el);
  _routeActivePopup = null;
}

function _routePopupRemove(locId) {
  removeRouteStop(locId);
}

// Toggle outdoor ↔ interior SV in route marker popup
function _rmpSvToggle(btn, mode) {
  var wrap = btn.closest ? btn.closest('.rmp-sv-wrap') : null;
  if (!wrap) return;
  // Update active button
  var togs = wrap.querySelectorAll('.rmp-sv-tog');
  for (var i = 0; i < togs.length; i++) togs[i].classList.remove('active');
  btn.classList.add('active');
  // Show/hide panes
  var outdoor   = wrap.querySelector('.rmp-sv-outdoor');
  var interiors = wrap.querySelectorAll('.rmp-sv-interior');
  if (mode === 'outdoor') {
    if (outdoor) outdoor.style.display = '';
    for (var a = 0; a < interiors.length; a++) interiors[a].style.display = 'none';
  } else {
    var idx = parseInt(mode.replace('interior-', ''), 10);
    if (outdoor) outdoor.style.display = 'none';
    for (var b = 0; b < interiors.length; b++) {
      var pane = interiors[b];
      if (b === idx) {
        pane.style.display = '';
        if (!pane._svInited) {
          pane._svInited = true;
          if (typeof initIntSVPane === 'function') initIntSVPane(pane);
        }
      } else {
        pane.style.display = 'none';
      }
    }
  }
}

function _renderRouteResult(data, ordered, cumDistAtStop) {
  var resultDiv = document.getElementById('route-result');
  if (!resultDiv) return;

  var distStr = data.distance < 1000
    ? Math.round(data.distance) + 'm'
    : (data.distance / 1000).toFixed(1) + 'km';
  var durMin = Math.ceil(data.duration / 60);
  var durStr = durMin < 60
    ? durMin + (LANG === 'ko' ? '분' : ' min')
    : Math.floor(durMin / 60) + (LANG === 'ko' ? '시간 ' : 'h ') + (durMin % 60) + (LANG === 'ko' ? '분' : 'min');

  var html =
    '<div class="route-summary">' +
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

  html += '<div class="route-itinerary">';
  ordered.forEach(function(loc, i) {
    var distAtStop = (cumDistAtStop && cumDistAtStop[i]) ? cumDistAtStop[i] : 0;
    var beyond = distAtStop > _WLK_D_STOP;
    var legInfo = '';
    if (data.legs && data.legs[i]) {
      var leg = data.legs[i];
      var legDist = leg.distance < 1000 ? Math.round(leg.distance) + 'm' : (leg.distance / 1000).toFixed(1) + 'km';
      var legDur  = Math.ceil(leg.duration / 60) + (LANG === 'ko' ? '분' : ' min');
      legInfo = '<div class="route-leg-info">🚶 ' + legDist + ' · ' + legDur + '</div>';
    }
    var catBadge = _pCat(loc);
    html += '<div class="route-stop' + (beyond ? ' route-stop-beyond' : '') + '">' +
      '<div class="route-stop-num" style="background:' + (beyond ? '#aaa' : '#3B82F6') + '">' + (i + 1) + '</div>' +
      '<div class="route-stop-info">' +
        '<div class="route-stop-name">' + _routeLocName(loc) + '</div>' +
        '<div class="route-stop-meta">' +
          '<span class="cat-badge ' + (CAT_CC_MAP[catBadge] || 'c-lmk') + '" style="font-size:10px">' + catBadge + '</span>' +
          (loc.hood ? ' · ' + _escHtml(loc.hood) : '') +
          (beyond ? ' <span style="color:#f59e0b;font-size:10px">· ⚠ ' + (LANG === 'ko' ? '6km 범위 밖' : 'Beyond 6km') + '</span>' : '') +
        '</div>' +
      '</div>' +
    '</div>';
    if (i < ordered.length - 1 && legInfo) html += legInfo;
  });
  html += '</div>';

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = html;
}

function clearRoute() {
  _stopWalkerAnimation();
  _closeRouteCustomPopup();
  if (routeLine) { try { map.removeLayer(routeLine); } catch(e) {} routeLine = null; }
  routeMarkers.forEach(function(m) { try { map.removeLayer(m); } catch(e) {} });
  routeMarkers = [];
  routeData = null;
  var resultDiv = document.getElementById('route-result');
  if (resultDiv) { resultDiv.style.display = 'none'; resultDiv.innerHTML = ''; }
  // Restore regular flag markers for route stops
  if (typeof syncMarkers === 'function') syncMarkers();
}

function _routeStatus(msg) {
  var resultDiv = document.getElementById('route-result');
  if (resultDiv) {
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="route-status-msg">' + msg + '</div>';
  }
}

function _updateRouteSelectedUI() { _refreshRouteUI(); }

// ── Stubs kept for backward compatibility ─────────────────────────
function refreshRouteList()        { /* removed in v0.3 */ }
function toggleRouteLocation()     { /* removed in v0.3 */ }
function addHoodToRoute()          { /* removed in v0.3 */ }
function addAllFilteredToRoute()   { /* removed in v0.3 */ }
function toggleRouteNearMeSlider() { /* removed in v0.3 */ }
function updateRouteNearMeLabel()  { /* removed in v0.3 */ }
function routeNearMeUseGPS()       { /* removed in v0.3 */ }
function routeNearMeDropPin()      { routePinDropMode = false; }
function _onRoutePinDropped()      { /* removed in v0.3 */ }
function addNearbyToRoute()        { /* removed in v0.3 */ }

// ══════════════════════════════════════════════════════════════════
// ROUTE PRE-SELECTION MODAL
// ══════════════════════════════════════════════════════════════════

function _showRoutePreselModal(locs) {
  var overlay = document.getElementById('route-presel-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'route-presel-overlay';
    overlay.className = 'route-presel-overlay';
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) _closeRoutePresel();
    });
    document.body.appendChild(overlay);
  }

  // Build unique, sorted neighborhood list from the current locs
  var hoods = [];
  var seen = {};
  locs.forEach(function(l) {
    if (l.hood && !seen[l.hood]) { seen[l.hood] = true; hoods.push(l.hood); }
  });
  hoods.sort();

  // Count per hood
  var hoodCount = {};
  locs.forEach(function(l) { if (l.hood) hoodCount[l.hood] = (hoodCount[l.hood] || 0) + 1; });

  var ko = typeof LANG !== 'undefined' && LANG === 'ko';
  var chipsHtml = hoods.map(function(h) {
    var cnt  = hoodCount[h] || 0;
    var hEsc = h.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    return '<button class="rps-hood-chip" data-hood="' + _escHtml(h) + '" onclick="_rpsToggleHood(\'' + hEsc + '\')">' +
      _escHtml(h) + ' <span style="opacity:0.5;font-size:11px">(' + cnt + ')</span></button>';
  }).join('');

  overlay.innerHTML =
    '<div class="rps-box">' +
      '<div class="rps-title">' +
        (ko ? '루트에 ' + locs.length + '개 위치가 있습니다' : locs.length + ' locations in route') +
      '</div>' +
      '<div class="rps-sub">' +
        (ko
          ? '동네를 하나 이상 선택한 뒤 진행하거나, 전체 위치로 바로 진행하거나, 직접 선택 모드를 사용하세요.'
          : 'Select one or more neighborhoods then proceed, proceed with all, or pick manually.') +
      '</div>' +
      '<button class="rps-set-loc-btn" onclick="_closeRoutePresel(true);if(typeof _sbaMyLocation===\'function\')_sbaMyLocation();">' +
        '📍 ' + (ko ? '내 위치 설정' : 'Set My Location') +
      '</button>' +
      '<div class="rps-btns">' +
        '<button class="rps-proceed-btn" onclick="_routePreselProceed()">' +
          '▶ ' + (ko ? '전체 진행' : 'Proceed') +
        '</button>' +
        '<button class="rps-manual-btn" onclick="_routePreselManual()">' +
          '📍 ' + (ko ? '직접 선택' : 'Manual') +
        '</button>' +
        '<button class="rps-cancel-btn" onclick="_closeRoutePresel(true)">' +
          (ko ? '취소' : 'Cancel') +
        '</button>' +
      '</div>' +
      '<div class="rps-section-label" style="margin-top:18px">' + (ko ? '동네 선택' : 'Choose a neighborhood') + '</div>' +
      '<div class="rps-hoods">' + (chipsHtml || ('<span style="color:#999;font-size:12px">' + (ko ? '동네 정보 없음' : 'No neighborhood data') + '</span>')) + '</div>' +
    '</div>';

  overlay.classList.add('open');
}

function _rpsToggleHood(hood) {
  if (_rpsSelectedHoods.has(hood)) {
    _rpsSelectedHoods.delete(hood);
  } else {
    _rpsSelectedHoods.add(hood);
  }
  // Update chip visual state
  var chips = document.querySelectorAll('.rps-hood-chip');
  chips.forEach(function(chip) {
    if (chip.dataset.hood === hood) chip.classList.toggle('selected', _rpsSelectedHoods.has(hood));
  });
  // Update Proceed button to show selected count
  var proceedBtn = document.querySelector('.rps-proceed-btn');
  if (proceedBtn) {
    var ko = typeof LANG !== 'undefined' && LANG === 'ko';
    var n = _rpsSelectedHoods.size;
    proceedBtn.textContent = n > 0
      ? '▶ ' + (ko ? '선택 진행 (' + n + ')' : 'Proceed (' + n + ' hoods)')
      : '▶ ' + (ko ? '전체 진행' : 'Proceed');
  }
}

function _routePreselProceed() {
  var allLocs = _getRouteLocs();
  if (_rpsSelectedHoods.size > 0) {
    var sel = _rpsSelectedHoods;
    routeLocations = allLocs.filter(function(l) { return l.hood && sel.has(l.hood); });
  } else {
    routeLocations = allLocs.slice();
  }
  _closeRoutePresel();
  _refreshRouteUI();
  if (routeLocations.length >= 2) calcRoute();
}

function _routePreselManual() {
  _closeRoutePresel();
  // Open route panel empty — user can remove stops or use filters then re-open
  routeLocations = [];
  _refreshRouteUI();
  // Show a hint in the empty list state (handled by _refreshRouteUI)
}

function _closeRoutePresel(andClosePanel) {
  _rpsSelectedHoods.clear();
  var overlay = document.getElementById('route-presel-overlay');
  if (overlay) overlay.classList.remove('open');
  if (andClosePanel) {
    closeRoutePanel();
  }
}

// ══════════════════════════════════════════════════════════════════
// ROUTE 6KM WARNING
// ══════════════════════════════════════════════════════════════════

function _check6kmWarning() {
  if (!routeData || routeData.distance <= _WLK_D_STOP) return;
  var overlay = document.getElementById('route-6km-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'route-6km-overlay';
    overlay.className = 'route-6km-overlay';
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) _6kmNo();
    });
    document.body.appendChild(overlay);
  }

  var ko = typeof LANG !== 'undefined' && LANG === 'ko';
  var dist = (routeData.distance / 1000).toFixed(1);

  overlay.innerHTML =
    '<div class="r6km-box">' +
      '<div class="r6km-icon">⚠️</div>' +
      '<div class="r6km-msg">' +
        (ko
          ? '총 이동거리가 <strong>' + dist + 'km</strong>입니다.<br>location list를 조정하시겠습니까?'
          : 'Total route is <strong>' + dist + 'km</strong>.<br>Would you like to adjust the location list?') +
      '</div>' +
      '<div class="r6km-btns">' +
        '<button class="r6km-yes" onclick="_6kmYes()">' + (ko ? '예' : 'Yes') + '</button>' +
        '<button class="r6km-no"  onclick="_6kmNo()">'  + (ko ? '아니요' : 'No') + '</button>' +
      '</div>' +
    '</div>';

  overlay.classList.add('open');
}

function _6kmYes() {
  // Dismiss warning and re-open route panel for editing
  var overlay = document.getElementById('route-6km-overlay');
  if (overlay) overlay.classList.remove('open');
  var panel = document.getElementById('route-panel');
  if (panel) { panel.classList.remove('minimized'); panel.classList.add('visible'); }
}

function _6kmNo() {
  // Dismiss warning, keep route as-is
  var overlay = document.getElementById('route-6km-overlay');
  if (overlay) overlay.classList.remove('open');
}

// ══════════════════════════════════════════════════════════════════
