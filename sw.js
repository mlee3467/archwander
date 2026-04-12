// ArchWander Service Worker
// Strategy: app framework = Network First, external resources = Cache First
const APP_CACHE = 'aw-app-v2';
const EXT_CACHE = 'aw-ext-v2';

// App framework files — always fetch fresh, cache as fallback for offline
const APP_PATTERNS = [
  '/archwander/',
  '/archwander/index.html',
  '/archwander/css/',
  '/archwander/js/',
  '/archwander/data-',
  '/archwander/img/',
  '/archwander/manifest',
];

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== APP_CACHE && k !== EXT_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => clients.claim())
  );
});

// Check if a URL is an app framework file
function isAppFile(url) {
  return url.origin === self.location.origin &&
    APP_PATTERNS.some(p => url.pathname.startsWith(p));
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // ── App framework: Network First ──────────────────────────
  // Always try to fetch fresh; fall back to cache if offline
  if (isAppFile(url)) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(APP_CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // ── External resources: Cache First ───────────────────────
  // Map tiles, CDN scripts, fonts, Wikimedia images, etc.
  // These are large and rarely change — cache for performance
  if (url.origin !== self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(EXT_CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }))
    );
    return;
  }
});
