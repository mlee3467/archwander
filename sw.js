// ArchWander Service Worker
// Strategy: app framework = Network First, external resources = Cache First
const APP_CACHE = 'aw-app-v0.4';
const EXT_CACHE = 'aw-ext-v2';

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

// Check if a URL is an app framework file.
// Same-origin = app file — works on both archwander.com (root path)
// and mlee3467.github.io/archwander/ (project path).
// (Old version hard-coded '/archwander/' paths, which silently disabled
//  app caching on the custom domain.)
function isAppFile(url) {
  return url.origin === self.location.origin;
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

  // ── Supabase API: never cache — location data changes dynamically ──
  // Without this, SW serves stale DB responses even after updates.
  if (url.hostname.endsWith('.supabase.co')) return;

  // ── External resources: Cache First ───────────────────────
  // Map tiles, CDN scripts, fonts, Wikimedia images, etc.
  // These are large and rarely change — cache for performance
  // Skip non-http(s) schemes (e.g. chrome-extension://) — cannot be cached
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

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
