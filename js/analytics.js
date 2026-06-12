// ══════════════════════════════════════════════════════════════════
// REMOTE ANALYTICS — Supabase events 테이블로 익명 사용 이벤트 전송
// (기존 core.js의 awStats(localStorage)와 별개 — 이건 운영자용 집계)
//
// - 개인정보 없음: 익명 세션 id + 이벤트명 + loc/city 정도만
// - 배칭: 메모리에 모았다가 10초마다 / 탭 이탈 시 sendBeacon으로 전송
// - DNT(Do Not Track) 존중, localhost/file:// 에서는 전송 안 함
// - 테이블: Archwander_tools/create-events-table.sql 참조
// ══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var DISABLED =
    (navigator.doNotTrack === '1') ||
    location.protocol === 'file:' ||
    /^(localhost|127\.|192\.168\.)/.test(location.hostname) ||
    typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL || SUPABASE_URL.indexOf('__') === 0;

  // 익명 세션 id (영구) — 개인 식별 불가 랜덤 문자열
  var SID_KEY = 'aw_sid';
  var sid = '';
  try {
    sid = localStorage.getItem(SID_KEY);
    if (!sid) {
      sid = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
      localStorage.setItem(SID_KEY, sid);
    }
  } catch (e) { sid = 'na'; }

  var queue = [];
  var FLUSH_MS = 10000;

  function flush(useBeacon) {
    if (DISABLED || !queue.length) return;
    var batch = queue.splice(0, queue.length);
    var url = SUPABASE_URL + '/rest/v1/events';
    var body = JSON.stringify(batch);
    if (useBeacon && navigator.sendBeacon) {
      // sendBeacon은 커스텀 헤더 불가 → apikey를 쿼리로 전달
      navigator.sendBeacon(url + '?apikey=' + encodeURIComponent(SUPABASE_ANON_KEY),
        new Blob([body], { type: 'application/json' }));
      return;
    }
    fetch(url, {
      method: 'POST',
      keepalive: true,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: body
    }).catch(function () { /* 실패 시 조용히 무시 — 분석이 앱을 방해하면 안 됨 */ });
  }

  // 전역 API — 어디서든 AW_EV('이벤트명', {loc_id:..., meta:{...}})
  window.AW_EV = function (ev, data) {
    if (DISABLED) return;
    data = data || {};
    queue.push({
      sid: sid,
      ev: ev,
      loc_id: data.loc_id || null,
      city: data.city || (typeof currentCity !== 'undefined' ? currentCity : null),
      lang: data.lang || (typeof currentLang !== 'undefined' ? currentLang : null),
      ref: ev === 'pageview' ? (document.referrer || '').split('/')[2] || null : null,
      ua_mobile: /Mobi|Android/i.test(navigator.userAgent),
      meta: data.meta || null
    });
    if (queue.length >= 20) flush(false);
  };

  if (DISABLED) return;

  setInterval(function () { flush(false); }, FLUSH_MS);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') flush(true);
  });

  // ── 자동 pageview ──
  AW_EV('pageview', { meta: { pwa: window.matchMedia('(display-mode: standalone)').matches } });

  // ── 기존 함수 래핑 (이름이 바뀌어도 앱이 깨지지 않도록 존재할 때만) ──
  function wrap(fnName, ev, getData) {
    var orig = window[fnName];
    if (typeof orig !== 'function') return;
    window[fnName] = function () {
      try { AW_EV(ev, getData ? getData.apply(null, arguments) : {}); } catch (e) {}
      return orig.apply(this, arguments);
    };
  }

  // 모든 모듈 로드 후 래핑
  window.addEventListener('load', function () {
    wrap('openLoc',          'loc_view',    function (loc) { return loc ? { loc_id: loc.id, city: loc.city } : {}; });
    wrap('toggleNearMe',     'near_me',     null);
    wrap('startQuiz',        'quiz_start',  null);
    wrap('calcRoute',        'route_calc',  null);
    wrap('openRoutePanel',   'route_open',  null);
    wrap('openShareModal',   'share_open',  null);
    wrap('_agStartPlayback', 'audio_play',  null);
    wrap('openArchProfile',  'arch_view',   function (n) { return { meta: { arch: n } }; });
  });
})();
