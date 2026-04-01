// ArchWander Service Worker
// Enables PWA installation → background audio on iOS/Android
const CACHE = 'archwander-v10';
const PRECACHE = [
  '/archwander/',
  '/archwander/index.html',
  '/archwander/css/styles.css',
  '/archwander/js/config.js',
  '/archwander/js/i18n.js',
  '/archwander/js/map.js',
  '/archwander/js/filters.js',
  '/archwander/js/core.js',
  '/archwander/js/audio.js',
  '/archwander/js/ui.js',
  '/archwander/js/walk.js',
  '/archwander/js/city.js',
  '/archwander/js/route.js',
  '/archwander/js/pdf.js',
  '/archwander/js/init.js',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {}))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // HTML documents: Network First
  const isHTML = url.pathname.endsWith('.html') || url.pathname.endsWith('/');
  if (isHTML) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Other assets: Cache First
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});