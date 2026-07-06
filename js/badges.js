// ══════════════════════════════════════════════════════════════════
// BADGES + EXPLORER RANK SYSTEM
// All data from localStorage — no backend required.
// Hooks: called from toggleVisited(), toggleFav(), saveReview(), saveRoute()
// ══════════════════════════════════════════════════════════════════

var _BADGES_KEY = 'aw_badges_earned_v1';

// ── Rank levels ───────────────────────────────────────────────────
var RANK_LEVELS = [
  { min: 0,   id: 'tourist',    label: 'Tourist',             labelKo: '관광객',         icon: '🧳', color: '#888888' },
  { min: 3,   id: 'visitor',    label: 'Visitor',             labelKo: '방문자',         icon: '👀', color: '#22BB55' },
  { min: 10,  id: 'explorer',   label: 'Explorer',            labelKo: '탐험가',         icon: '🗺️', color: '#2563EB' },
  { min: 25,  id: 'connoisseur',label: 'Connoisseur',         labelKo: '감식가',         icon: '🎨', color: '#7C3AED' },
  { min: 50,  id: 'critic',     label: 'Architecture Critic', labelKo: '건축 비평가',    icon: '🏛️', color: '#D97706' },
  { min: 100, id: 'master',     label: 'Archwander Master',   labelKo: '아크원더 마스터', icon: '🏆', color: '#DC2626' },
];

function _getRank(visCount) {
  var rank = RANK_LEVELS[0];
  for (var i = 0; i < RANK_LEVELS.length; i++) {
    if (visCount >= RANK_LEVELS[i].min) rank = RANK_LEVELS[i];
  }
  return rank;
}

function _getNextRank(visCount) {
  for (var i = 0; i < RANK_LEVELS.length; i++) {
    if (RANK_LEVELS[i].min > visCount) return RANK_LEVELS[i];
  }
  return null; // already max rank
}

// ── Badge definitions ─────────────────────────────────────────────
var BADGE_DEFS = [
  // ── Milestone: visit count ─────────────────────────────────────
  {
    id: 'first-step', icon: '🚶', color: '#22BB55',
    name: 'First Step', nameKo: '첫 발걸음',
    desc: 'Visit your first building', descKo: '첫 번째 건물 방문',
    check: function(d) { return d.vis >= 1; },
    progress: function(d) { return { cur: Math.min(d.vis, 1), max: 1 }; },
  },
  {
    id: 'on-the-map', icon: '📍', color: '#2563EB',
    name: 'On the Map', nameKo: '지도 위에',
    desc: 'Visit 5 buildings', descKo: '건물 5곳 방문',
    check: function(d) { return d.vis >= 5; },
    progress: function(d) { return { cur: Math.min(d.vis, 5), max: 5 }; },
  },
  {
    id: 'dedicated', icon: '🗺️', color: '#2563EB',
    name: 'Dedicated Explorer', nameKo: '열정 탐험가',
    desc: 'Visit 20 buildings', descKo: '건물 20곳 방문',
    check: function(d) { return d.vis >= 20; },
    progress: function(d) { return { cur: Math.min(d.vis, 20), max: 20 }; },
  },
  {
    id: 'devotee', icon: '🏛️', color: '#7C3AED',
    name: 'Architecture Devotee', nameKo: '건축 마니아',
    desc: 'Visit 50 buildings', descKo: '건물 50곳 방문',
    check: function(d) { return d.vis >= 50; },
    progress: function(d) { return { cur: Math.min(d.vis, 50), max: 50 }; },
  },
  {
    id: 'elite', icon: '🏆', color: '#DC2626',
    name: 'Archwander Elite', nameKo: '아크원더 엘리트',
    desc: 'Visit 100 buildings', descKo: '건물 100곳 방문',
    check: function(d) { return d.vis >= 100; },
    progress: function(d) { return { cur: Math.min(d.vis, 100), max: 100 }; },
  },

  // ── Style ──────────────────────────────────────────────────────
  {
    id: 'style-sampler', icon: '🎨', color: '#0891B2',
    name: 'Style Sampler', nameKo: '스타일 탐험',
    desc: 'Visit buildings in 3 different styles', descKo: '3가지 스타일 방문',
    check: function(d) { return d.styleCount >= 3; },
    progress: function(d) { return { cur: Math.min(d.styleCount, 3), max: 3 }; },
  },
  {
    id: 'style-hunter', icon: '🔍', color: '#7C3AED',
    name: 'Style Hunter', nameKo: '스타일 헌터',
    desc: 'Visit buildings in 7 or more styles', descKo: '7가지 이상 스타일 방문',
    check: function(d) { return d.styleCount >= 7; },
    progress: function(d) { return { cur: Math.min(d.styleCount, 7), max: 7 }; },
  },

  // ── Era ────────────────────────────────────────────────────────
  {
    id: 'time-traveler', icon: '⏳', color: '#D97706',
    name: 'Time Traveler', nameKo: '시간 여행자',
    desc: 'Visit buildings from 3 different eras', descKo: '3개 시대 건물 방문',
    check: function(d) { return d.eraCount >= 3; },
    progress: function(d) { return { cur: Math.min(d.eraCount, 3), max: 3 }; },
  },
  {
    id: 'century-collector', icon: '📅', color: '#D97706',
    name: 'Century Collector', nameKo: '시대 컬렉터',
    desc: 'Visit buildings from all 5 eras', descKo: '5개 시대 전부 방문',
    check: function(d) { return d.eraCount >= 5; },
    progress: function(d) { return { cur: Math.min(d.eraCount, 5), max: 5 }; },
  },

  // ── City ───────────────────────────────────────────────────────
  {
    id: 'new-yorker', icon: '🗽', color: '#2563EB',
    name: 'New Yorker', nameKo: '뉴요커',
    desc: 'Visit 10 buildings in New York', descKo: '뉴욕 건물 10곳 방문',
    check: function(d) { return (d.byCity['new-york'] || 0) >= 10; },
    progress: function(d) { return { cur: Math.min(d.byCity['new-york'] || 0, 10), max: 10 }; },
  },
  {
    id: 'seoul-soul', icon: '🇰🇷', color: '#DC2626',
    name: 'Seoul Soul', nameKo: '서울 혼',
    desc: 'Visit 10 buildings in Seoul', descKo: '서울 건물 10곳 방문',
    check: function(d) { return (d.byCity['seoul'] || 0) >= 10; },
    progress: function(d) { return { cur: Math.min(d.byCity['seoul'] || 0, 10), max: 10 }; },
  },
  {
    id: 'london-calling', icon: '🎡', color: '#DC2626',
    name: 'London Calling', nameKo: '런던 콜링',
    desc: 'Visit 10 buildings in London', descKo: '런던 건물 10곳 방문',
    check: function(d) { return (d.byCity['london'] || 0) >= 10; },
    progress: function(d) { return { cur: Math.min(d.byCity['london'] || 0, 10), max: 10 }; },
  },
  {
    id: 'tokyo-wanderer', icon: '🗼', color: '#DC2626',
    name: 'Tokyo Wanderer', nameKo: '도쿄 방랑자',
    desc: 'Visit 10 buildings in Tokyo', descKo: '도쿄 건물 10곳 방문',
    check: function(d) { return (d.byCity['tokyo'] || 0) >= 10; },
    progress: function(d) { return { cur: Math.min(d.byCity['tokyo'] || 0, 10), max: 10 }; },
  },

  // ── Collection ─────────────────────────────────────────────────
  {
    id: 'curator', icon: '⭐', color: '#D97706',
    name: 'Curator', nameKo: '큐레이터',
    desc: 'Save 10 favorites', descKo: '즐겨찾기 10곳 저장',
    check: function(d) { return d.favs >= 10; },
    progress: function(d) { return { cur: Math.min(d.favs, 10), max: 10 }; },
  },
  {
    id: 'route-planner', icon: '🗺', color: '#22BB55',
    name: 'Route Planner', nameKo: '루트 플래너',
    desc: 'Save your first route', descKo: '루트 1개 저장',
    check: function(d) { return d.routes >= 1; },
    progress: function(d) { return { cur: Math.min(d.routes, 1), max: 1 }; },
  },
  {
    id: 'critic-badge', icon: '✍️', color: '#0891B2',
    name: 'Critic', nameKo: '평론가',
    desc: 'Leave 3 reviews', descKo: '리뷰 3개 작성',
    check: function(d) { return d.reviews >= 3; },
    progress: function(d) { return { cur: Math.min(d.reviews, 3), max: 3 }; },
  },

  // ── Special ────────────────────────────────────────────────────
  {
    id: 'open-city', icon: '🔓', color: '#22BB55',
    name: 'Open City', nameKo: '열린 도시',
    desc: 'Visit 5 free-access buildings', descKo: '무료 입장 건물 5곳 방문',
    check: function(d) { return d.openCount >= 5; },
    progress: function(d) { return { cur: Math.min(d.openCount, 5), max: 5 }; },
  },
  {
    id: 'sky-high', icon: '🏙️', color: '#2563EB',
    name: 'Sky High', nameKo: '하늘 높이',
    desc: 'Visit 3 skyscrapers', descKo: '고층 건물 3곳 방문',
    check: function(d) { return d.skyCount >= 3; },
    progress: function(d) { return { cur: Math.min(d.skyCount, 3), max: 3 }; },
  },
];

// ── Compute data snapshot from current state ───────────────────────
function _badgeComputeData() {
  var visIds  = typeof _visSet !== 'undefined' ? [..._visSet] : [];
  var favIds  = typeof _favSet !== 'undefined' ? [..._favSet] : [];
  var allLocs = typeof LOCS !== 'undefined' ? LOCS : [];

  // Build a lookup for visited locs
  var visLocMap = {};
  allLocs.forEach(function(l) { if (_visSet && _visSet.has(l.id)) visLocMap[l.id] = l; });
  var visLocs = Object.values(visLocMap);

  // By city
  var byCity = {};
  visLocs.forEach(function(l) {
    byCity[l.city] = (byCity[l.city] || 0) + 1;
  });

  // Styles
  var styles = new Set();
  visLocs.forEach(function(l) { (l.styleGroups || []).forEach(function(s) { styles.add(s); }); });

  // Eras
  var eras = new Set();
  var eraFn = function(yr) {
    if (!yr) return null;
    if (yr < 1900) return 'pre1900';
    if (yr < 1930) return 'pre1930';
    if (yr < 1970) return 'era1930';
    if (yr < 2000) return 'era1970';
    return 'era2000';
  };
  visLocs.forEach(function(l) { var e = eraFn(l.yr); if (e) eras.add(e); });

  // Special categories
  var openCount = visLocs.filter(function(l) { return l.access === 'open to public'; }).length;
  var skyCount  = visLocs.filter(function(l) { return l.cc === 'c-sky'; }).length;

  // Routes
  var routes = 0;
  try { routes = JSON.parse(localStorage.getItem('aw_saved_routes_v2') || '[]').length; } catch(e) {}

  // Reviews
  var reviews = 0;
  try {
    var revData = JSON.parse(localStorage.getItem('archwander_reviews_v1') || '{}');
    Object.values(revData).forEach(function(arr) { reviews += (arr || []).length; });
  } catch(e) {}

  return {
    vis: visIds.length,
    favs: favIds.length,
    byCity: byCity,
    styleCount: styles.size,
    eraCount: eras.size,
    openCount: openCount,
    skyCount: skyCount,
    routes: routes,
    reviews: reviews,
  };
}

// ── Get set of currently earned badge IDs ─────────────────────────
function _getEarnedSet() {
  try { return new Set(JSON.parse(localStorage.getItem(_BADGES_KEY) || '[]')); } catch(e) { return new Set(); }
}
function _saveEarnedSet(set) {
  try { localStorage.setItem(_BADGES_KEY, JSON.stringify([...set])); } catch(e) {}
}

// ── Check for newly earned badges → toast ─────────────────────────
function checkBadgesOnAction() {
  var prev = _getEarnedSet();
  var data = _badgeComputeData();
  var newlyEarned = [];

  BADGE_DEFS.forEach(function(b) {
    if (!prev.has(b.id) && b.check(data)) {
      prev.add(b.id);
      newlyEarned.push(b);
    }
  });

  if (newlyEarned.length) {
    _saveEarnedSet(prev);
    // Show toast for each (staggered)
    newlyEarned.forEach(function(b, i) {
      setTimeout(function() { _showBadgeToast(b); }, i * 1200);
    });
  }
}

// ── Toast notification ────────────────────────────────────────────
function _showBadgeToast(badge) {
  var existing = document.getElementById('badge-toast');
  if (existing) existing.parentNode.removeChild(existing);

  var toast = document.createElement('div');
  toast.id = 'badge-toast';
  toast.className = 'badge-toast';
  toast.innerHTML =
    '<div class="badge-toast-icon">' + badge.icon + '</div>'
    + '<div class="badge-toast-body">'
      + '<div class="badge-toast-label">🏅 Badge Unlocked!</div>'
      + '<div class="badge-toast-name">' + badge.name + '</div>'
    + '</div>';

  document.body.appendChild(toast);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { toast.classList.add('visible'); });
  });
  setTimeout(function() {
    toast.classList.remove('visible');
    setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 350);
  }, 3200);
}

// ── Rank HTML for My Page (inline section) ─────────────────────────
function buildRankHtml() {
  var data    = _badgeComputeData();
  var rank    = _getRank(data.vis);
  var next    = _getNextRank(data.vis);
  var earned  = _getEarnedSet();
  var earnedCount = BADGE_DEFS.filter(function(b) { return earned.has(b.id); }).length;

  var progressHtml = '';
  if (next) {
    var pct = Math.round(((data.vis - rank.min) / (next.min - rank.min)) * 100);
    progressHtml =
      '<div class="rank-progress-wrap">'
        + '<div class="rank-progress-bar"><div class="rank-progress-fill" style="width:' + pct + '%"></div></div>'
        + '<span class="rank-progress-label">' + data.vis + ' / ' + next.min + '</span>'
      + '</div>'
      + '<div class="rank-next-label">Next: ' + next.icon + ' ' + next.label + '</div>';
  } else {
    progressHtml = '<div class="rank-next-label rank-maxed">🎊 Maximum rank achieved!</div>';
  }

  return '<div class="mpp-section rank-section">'
    + '<div class="mpp-sec-title">🎖 Explorer Rank</div>'
    + '<div class="rank-display">'
      + '<div class="rank-icon" style="color:' + rank.color + '">' + rank.icon + '</div>'
      + '<div class="rank-info">'
        + '<div class="rank-label" style="color:' + rank.color + '">' + rank.label + '</div>'
        + '<div class="rank-vis-count">' + data.vis + ' buildings visited</div>'
      + '</div>'
    + '</div>'
    + progressHtml
    + '<button class="rank-badges-btn" onclick="openBadgesPanel()">'
      + '🏅 ' + earnedCount + ' / ' + BADGE_DEFS.length + ' badges earned'
    + '</button>'
  + '</div>';
}

// ── Badges Panel overlay ───────────────────────────────────────────
function openBadgesPanel() {
  var existing = document.getElementById('badges-overlay');
  if (existing) existing.parentNode.removeChild(existing);

  var data   = _badgeComputeData();
  var earned = _getEarnedSet();

  var badgesHtml = BADGE_DEFS.map(function(b) {
    var isEarned = earned.has(b.id) || b.check(data);
    if (isEarned && !earned.has(b.id)) {
      // Mark as earned on first render (catches retroactive unlocks)
      earned.add(b.id);
      _saveEarnedSet(earned);
    }
    var prog = b.progress(data);
    var pct  = Math.round((prog.cur / prog.max) * 100);

    return '<div class="badge-card' + (isEarned ? ' badge-earned' : ' badge-locked') + '">'
      + '<div class="badge-card-icon" style="' + (isEarned ? 'opacity:1' : 'filter:grayscale(1);opacity:0.35') + '">' + b.icon + '</div>'
      + '<div class="badge-card-name">' + b.name + '</div>'
      + '<div class="badge-card-desc">' + b.desc + '</div>'
      + (isEarned
          ? '<div class="badge-card-done">✓</div>'
          : '<div class="badge-card-prog">'
              + '<div class="badge-prog-bar"><div class="badge-prog-fill" style="width:' + pct + '%"></div></div>'
              + '<span class="badge-prog-txt">' + prog.cur + '/' + prog.max + '</span>'
            + '</div>')
    + '</div>';
  }).join('');

  var earnedCount = BADGE_DEFS.filter(function(b) { return earned.has(b.id); }).length;
  var rank = _getRank(data.vis);

  var overlay = document.createElement('div');
  overlay.id = 'badges-overlay';
  overlay.className = 'badges-overlay';
  overlay.innerHTML =
    '<div class="badges-panel">'
      + '<div class="badges-hdr">'
        + '<button class="badges-back-btn" onclick="closeBadgesPanel()">◀</button>'
        + '<div class="badges-hdr-center">'
          + '<div class="badges-hdr-title">🏅 Badges</div>'
          + '<div class="badges-hdr-sub">' + rank.icon + ' ' + rank.label + ' &nbsp;·&nbsp; ' + earnedCount + ' / ' + BADGE_DEFS.length + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="badges-body">'
        + '<div class="badge-grid">' + badgesHtml + '</div>'
      + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { overlay.classList.add('visible'); });
  });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeBadgesPanel(); });
}

function closeBadgesPanel() {
  var el = document.getElementById('badges-overlay');
  if (!el) return;
  el.classList.remove('visible');
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
}
