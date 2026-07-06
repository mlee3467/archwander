// ══════════════════════════════════════════════════════════════════
// BUILDING INFLUENCE NETWORK
// Visual graph showing architectural connections between
// buildings and architects based on shared style/era/architect.
// Uses SVG with a simple spring-layout simulation.
// ══════════════════════════════════════════════════════════════════

function _buildInfluenceNetwork(archName) {
  var existing = document.getElementById('influence-overlay');
  if (existing) existing.parentNode.removeChild(existing);

  var allLocs = typeof LOCS !== 'undefined' ? LOCS : [];

  // ── Find this architect's works + their styles ──────────────────
  var mainWorks = allLocs.filter(function(l) {
    var archs = l.archs || (l.arch ? [l.arch] : []);
    return archs.some(function(a) { return a.toLowerCase() === archName.toLowerCase(); });
  });

  if (!mainWorks.length) {
    alert('No data for: ' + archName);
    return;
  }

  var mainStyles = new Set(mainWorks.flatMap(function(l) { return l.styleGroups || []; }));

  // ── Find related architects (share at least one style) ──────────
  var relatedMap = {};
  allLocs.forEach(function(l) {
    var sharedStyles = (l.styleGroups || []).filter(function(s) { return mainStyles.has(s); });
    if (!sharedStyles.length) return;
    var archs = l.archs || (l.arch ? [l.arch] : []);
    archs.forEach(function(a) {
      if (a.toLowerCase() === archName.toLowerCase()) return;
      if (!relatedMap[a]) relatedMap[a] = { styles: new Set(), count: 0 };
      sharedStyles.forEach(function(s) { relatedMap[a].styles.add(s); });
      relatedMap[a].count++;
    });
  });

  // Limit related architects to top 8 by shared work count
  var relatedArchs = Object.keys(relatedMap)
    .sort(function(a, b) { return relatedMap[b].count - relatedMap[a].count; })
    .slice(0, 8);

  // ── Build nodes and edges ────────────────────────────────────────
  var nodes = [];
  var edges = [];

  // Center node = main architect
  nodes.push({ id: 'arch:' + archName, label: archName, type: 'main-arch', r: 28 });

  // This architect's buildings (up to 6)
  mainWorks.slice(0, 6).forEach(function(l, i) {
    var nid = 'loc:' + l.id;
    nodes.push({ id: nid, label: l.name, sublabel: l.yr ? String(l.yr) : '', type: 'main-work', r: 16, loc: l });
    edges.push({ from: 'arch:' + archName, to: nid, type: 'designed' });
  });

  // Related architects
  relatedArchs.forEach(function(a) {
    var nid = 'arch:' + a;
    var sharedCount = relatedMap[a].count;
    nodes.push({ id: nid, label: a, sublabel: sharedCount + ' shared', type: 'related-arch', r: 18 });
    var sharedStylesArr = [...relatedMap[a].styles].slice(0, 2).join(', ');
    edges.push({ from: 'arch:' + archName, to: nid, type: 'style-shared', label: sharedStylesArr });
  });

  // ── Layout: force-directed via simple iteration ──────────────────
  var W = 560, H = 420;
  var cx = W / 2, cy = H / 2;

  // Initialize positions
  var posMap = {};
  posMap['arch:' + archName] = { x: cx, y: cy, vx: 0, vy: 0, fixed: true };

  // Place main works in a close inner ring
  mainWorks.slice(0, 6).forEach(function(l, i) {
    var angle = (i / Math.max(mainWorks.slice(0,6).length, 1)) * 2 * Math.PI - Math.PI / 2;
    var r = 120;
    var nid = 'loc:' + l.id;
    posMap[nid] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), vx: 0, vy: 0 };
  });

  // Place related archs in an outer ring
  relatedArchs.forEach(function(a, i) {
    var angle = (i / Math.max(relatedArchs.length, 1)) * 2 * Math.PI - Math.PI / 2;
    var r = 200;
    var nid = 'arch:' + a;
    posMap[nid] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), vx: 0, vy: 0 };
  });

  // Run spring simulation (50 iterations)
  var idealLengths = { 'designed': 120, 'style-shared': 200 };
  for (var iter = 0; iter < 50; iter++) {
    var forces = {};
    nodes.forEach(function(n) { forces[n.id] = { fx: 0, fy: 0 }; });

    // Spring forces along edges
    edges.forEach(function(e) {
      var a = posMap[e.from], b = posMap[e.to];
      if (!a || !b) return;
      var dx = b.x - a.x, dy = b.y - a.y;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var ideal = idealLengths[e.type] || 150;
      var force = (dist - ideal) * 0.05;
      var fx = (dx / dist) * force, fy = (dy / dist) * force;
      if (!posMap[e.from].fixed) { forces[e.from].fx += fx; forces[e.from].fy += fy; }
      if (!posMap[e.to].fixed) { forces[e.to].fx -= fx; forces[e.to].fy -= fy; }
    });

    // Repulsion between all nodes
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var na = posMap[nodes[i].id], nb = posMap[nodes[j].id];
        if (!na || !nb) continue;
        var dx = nb.x - na.x, dy = nb.y - na.y;
        var dist = Math.sqrt(dx * dx + dy * dy) || 1;
        var repulse = 3000 / (dist * dist);
        var fx = (dx / dist) * repulse, fy = (dy / dist) * repulse;
        if (!posMap[nodes[i].id].fixed) { forces[nodes[i].id].fx -= fx; forces[nodes[i].id].fy -= fy; }
        if (!posMap[nodes[j].id].fixed) { forces[nodes[j].id].fx += fx; forces[nodes[j].id].fy += fy; }
      }
    }

    // Apply forces + damping
    nodes.forEach(function(n) {
      if (posMap[n.id].fixed) return;
      var p = posMap[n.id];
      var f = forces[n.id];
      p.vx = (p.vx + f.fx) * 0.7;
      p.vy = (p.vy + f.fy) * 0.7;
      p.x = Math.max(40, Math.min(W - 40, p.x + p.vx));
      p.y = Math.max(40, Math.min(H - 40, p.y + p.vy));
    });
  }

  // ── Render SVG ───────────────────────────────────────────────────
  var nodeColors = {
    'main-arch': '#2563EB',
    'main-work': '#0891B2',
    'related-arch': '#7C3AED',
  };
  var edgeColors = { 'designed': '#2563EB', 'style-shared': '#7C3AED' };

  var svgEdges = edges.map(function(e) {
    var a = posMap[e.from], b = posMap[e.to];
    if (!a || !b) return '';
    var color = edgeColors[e.type] || '#999';
    var dash = e.type === 'style-shared' ? 'stroke-dasharray="6 3"' : '';
    var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    var labelEl = e.label
      ? '<text x="' + mx + '" y="' + (my - 4) + '" text-anchor="middle" fill="' + color + '" opacity="0.7" font-size="8" font-family="Inter,sans-serif">' + _netEscape(e.label) + '</text>'
      : '';
    return '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="' + color + '" stroke-width="1.5" opacity="0.5" ' + dash + '/>' + labelEl;
  }).join('');

  var svgNodes = nodes.map(function(n) {
    var p = posMap[n.id];
    if (!p) return '';
    var color = nodeColors[n.type] || '#999';
    var r = n.r;
    var isClickable = n.type === 'main-work' && n.loc;
    var clickAttr = isClickable
      ? 'onclick="closeInfluenceNetwork();if(typeof openLocById===\'function\')openLocById(\'' + n.loc.id + '\')" style="cursor:pointer"'
      : (n.type === 'related-arch' ? 'onclick="closeInfluenceNetwork();if(typeof openArchProfile===\'function\')openArchProfile(\'' + _netEscapeAttr(n.label) + '\')" style="cursor:pointer"' : '');

    // Truncate label for display
    var dispLabel = n.label.length > 16 ? n.label.slice(0, 15) + '…' : n.label;

    return '<g ' + clickAttr + '>'
      + '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + r + '" fill="' + color + '" fill-opacity="' + (n.type === 'main-arch' ? '0.9' : '0.75') + '" stroke="white" stroke-width="1.5"/>'
      + '<text x="' + p.x + '" y="' + (p.y + 3.5) + '" text-anchor="middle" fill="white" font-size="' + (n.type === 'main-arch' ? '8' : '7') + '" font-family="Inter,sans-serif" font-weight="600">' + _netEscape(dispLabel) + '</text>'
      + (n.sublabel ? '<text x="' + p.x + '" y="' + (p.y + r + 12) + '" text-anchor="middle" fill="var(--text-secondary)" font-size="9" font-family="Inter,sans-serif">' + _netEscape(n.sublabel) + '</text>' : '')
    + '</g>';
  }).join('');

  // Legend
  var legendHtml =
    '<div class="net-legend">'
      + '<span class="net-leg-item"><span class="net-leg-dot" style="background:#2563EB"></span>This architect</span>'
      + '<span class="net-leg-item"><span class="net-leg-dot" style="background:#0891B2"></span>Works</span>'
      + '<span class="net-leg-item"><span class="net-leg-dot" style="background:#7C3AED"></span>Related architects</span>'
      + '<span class="net-leg-item net-leg-line"><span class="net-leg-dash"></span>Shared style</span>'
    + '</div>';

  var overlay = document.createElement('div');
  overlay.id = 'influence-overlay';
  overlay.className = 'influence-overlay';
  overlay.innerHTML =
    '<div class="net-panel">'
      + '<div class="net-hdr">'
        + '<div class="net-hdr-title">🕸 Influence Network</div>'
        + '<div class="net-hdr-sub">' + archName + ' &amp; related architects</div>'
        + '<button class="net-close-btn" onclick="closeInfluenceNetwork()">✕</button>'
      + '</div>'
      + '<div class="net-body">'
        + '<svg class="net-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">'
          + svgEdges + svgNodes
        + '</svg>'
        + legendHtml
        + '<div class="net-hint">Click nodes to navigate to buildings or architect profiles.</div>'
      + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { overlay.classList.add('visible'); });
  });
}

function closeInfluenceNetwork() {
  var el = document.getElementById('influence-overlay');
  if (!el) return;
  el.classList.remove('visible');
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
}

function _netEscape(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function _netEscapeAttr(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
