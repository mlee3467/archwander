// ══════════════════════════════════════════════════════════════════
// COMPARE VIEW
// Select 2 buildings → side-by-side comparison overlay
// ══════════════════════════════════════════════════════════════════

var _compareList = [];  // max 2 location IDs

function toggleCompare(locId) {
  var idx = _compareList.indexOf(locId);
  if (idx > -1) {
    _compareList.splice(idx, 1);
  } else {
    if (_compareList.length >= 2) {
      _compareList.shift();  // drop oldest
    }
    _compareList.push(locId);
  }
  _updateCompareBar();
}

function _isInCompare(locId) {
  return _compareList.indexOf(locId) > -1;
}

function _updateCompareBar() {
  var bar = document.getElementById('compare-bar');
  if (!bar) return;

  if (_compareList.length === 0) {
    bar.style.display = 'none';
    bar.classList.remove('visible');
    return;
  }

  bar.style.display = 'flex';
  requestAnimationFrame(function() { bar.classList.add('visible'); });

  var locsMap = {};
  (typeof LOCS !== 'undefined' ? LOCS : []).forEach(function(l) { locsMap[l.id] = l; });

  var slots = _compareList.map(function(id) {
    var l = locsMap[id];
    return '<div class="cmp-bar-slot">'
      + '<span class="cmp-bar-name">' + (l ? l.name : id) + '</span>'
      + '<button class="cmp-bar-remove" onclick="toggleCompare(\'' + id + '\')">✕</button>'
    + '</div>';
  }).join('');

  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';
  var compareBtn = _compareList.length === 2
    ? '<button class="cmp-bar-go" onclick="openCompareOverlay()">' + (isKo ? '비교하기 →' : 'Compare →') + '</button>'
    : '<span class="cmp-bar-hint">' + (isKo ? '건물을 1개 더 선택하세요' : 'Select 1 more') + '</span>';

  document.getElementById('compare-bar-slots').innerHTML = slots + compareBtn;

  // Refresh compare buttons in open panels
  document.querySelectorAll('.p-compare-btn').forEach(function(btn) {
    var id = btn.dataset.locId;
    btn.classList.toggle('cmp-active', _compareList.indexOf(id) > -1);
    btn.textContent = (_compareList.indexOf(id) > -1) ? '⊖ Comparing' : '⊕ Compare';
  });
}

function openCompareOverlay() {
  if (_compareList.length < 2) return;
  var locsMap = {};
  (typeof LOCS !== 'undefined' ? LOCS : []).forEach(function(l) { locsMap[l.id] = l; });
  var a = locsMap[_compareList[0]];
  var b = locsMap[_compareList[1]];
  if (!a || !b) return;

  var existing = document.getElementById('compare-overlay');
  if (existing) existing.parentNode.removeChild(existing);

  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';

  function _colHtml(loc) {
    var photo = (loc.photos && loc.photos[0])
      ? '<img class="cmp-photo" src="' + (typeof photoUrl === 'function' ? photoUrl(loc.photos[0], false, 'popup') : loc.photos[0]) + '" alt="' + loc.name + '" onerror="this.style.display=\'none\'">'
      : '<div class="cmp-photo-placeholder">🏛</div>';

    var styles = (loc.styleGroups || []).map(function(s) {
      return '<span class="cmp-style-chip">' + s + '</span>';
    }).join('');

    var eraLabel = '—';
    if (loc.yr) {
      if (loc.yr < 1900) eraLabel = 'Pre-1900';
      else if (loc.yr < 1930) eraLabel = 'Pre-1930';
      else if (loc.yr < 1970) eraLabel = '1930–1969';
      else if (loc.yr < 2000) eraLabel = '1970–1999';
      else eraLabel = '2000–Present';
    }

    var catMeta = (typeof _ccMeta === 'function') ? _ccMeta(loc) : null;
    var catBadge = catMeta
      ? '<span class="cmp-cat-badge" style="background:' + catMeta.bg + ';color:' + catMeta.color + '">'
          + ((typeof CC_LABEL !== 'undefined' && loc.cc) ? CC_LABEL[loc.cc] || loc.cc : loc.cc || '') + '</span>'
      : '';

    return '<div class="cmp-col">'
      + '<div class="cmp-photo-wrap">' + photo + '</div>'
      + '<div class="cmp-col-body">'
        + catBadge
        + '<div class="cmp-name">' + loc.name + '</div>'
        + '<div class="cmp-row"><span class="cmp-lbl">' + (isKo ? '건축가' : 'Architect') + '</span><span class="cmp-val">' + (loc.arch || '—') + '</span></div>'
        + '<div class="cmp-row"><span class="cmp-lbl">' + (isKo ? '완공' : 'Completed') + '</span><span class="cmp-val">' + (loc.yr || '—') + '</span></div>'
        + '<div class="cmp-row"><span class="cmp-lbl">' + (isKo ? '시대' : 'Era') + '</span><span class="cmp-val">' + eraLabel + '</span></div>'
        + '<div class="cmp-row"><span class="cmp-lbl">' + (isKo ? '스타일' : 'Style') + '</span><span class="cmp-val cmp-styles">' + (styles || '—') + '</span></div>'
        + '<div class="cmp-row"><span class="cmp-lbl">' + (isKo ? '지역' : 'Neighborhood') + '</span><span class="cmp-val">' + (loc.hood || '—') + '</span></div>'
        + '<div class="cmp-row"><span class="cmp-lbl">' + (isKo ? '접근성' : 'Access') + '</span><span class="cmp-val">'
            + (loc.access ? ((typeof ACCESS_META !== 'undefined' && ACCESS_META[loc.access] ? ACCESS_META[loc.access].icon + ' ' : '') + loc.access) : '—') + '</span></div>'
        + '<button class="cmp-open-btn" onclick="closeCompareOverlay();openLocById(\'' + loc.id + '\')">'
            + (isKo ? '자세히 보기 →' : 'View details →') + '</button>'
      + '</div>'
    + '</div>';
  }

  // Highlight shared styles
  var stylesA = new Set(a.styleGroups || []);
  var stylesB = new Set(b.styleGroups || []);
  var sharedStyles = [...stylesA].filter(function(s) { return stylesB.has(s); });
  var sameArch = a.arch && b.arch && a.arch === b.arch;
  var sameEraFn = function(l) {
    if (!l.yr) return null;
    if (l.yr < 1900) return 'Pre-1900';
    if (l.yr < 1930) return 'Pre-1930';
    if (l.yr < 1970) return '1930–1969';
    if (l.yr < 2000) return '1970–1999';
    return '2000–Present';
  };
  var sameEra = sameEraFn(a) !== null && sameEraFn(a) === sameEraFn(b);

  var insightsHtml = '';
  if (sharedStyles.length || sameArch || sameEra) {
    var items = [];
    if (sameArch) items.push((isKo ? '같은 건축가: ' : 'Same architect: ') + a.arch);
    if (sameEra) items.push((isKo ? '같은 시대: ' : 'Same era: ') + sameEraFn(a));
    if (sharedStyles.length) items.push((isKo ? '공통 스타일: ' : 'Shared style: ') + sharedStyles.join(', '));
    insightsHtml = '<div class="cmp-insights">'
      + '<span class="cmp-insights-label">🔗 ' + (isKo ? '공통점' : 'In common') + '</span>'
      + items.map(function(i) { return '<span class="cmp-insight-chip">' + i + '</span>'; }).join('')
      + '</div>';
  }

  var overlay = document.createElement('div');
  overlay.id = 'compare-overlay';
  overlay.className = 'compare-overlay';
  overlay.innerHTML =
    '<div class="compare-panel">'
      + '<div class="cmp-hdr">'
        + '<div class="cmp-hdr-title">⚖ ' + (isKo ? '비교 뷰' : 'Compare') + '</div>'
        + '<button class="cmp-close-btn" onclick="closeCompareOverlay()">✕</button>'
      + '</div>'
      + insightsHtml
      + '<div class="cmp-cols">'
        + _colHtml(a)
        + '<div class="cmp-divider"></div>'
        + _colHtml(b)
      + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { overlay.classList.add('visible'); });
  });
}

function closeCompareOverlay() {
  var el = document.getElementById('compare-overlay');
  if (!el) return;
  el.classList.remove('visible');
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
}

function clearCompare() {
  _compareList = [];
  _updateCompareBar();
}
