// ArchWander Service Worker
// Enables PWA installation → background audio on iOS/Android
// Also acts as CORS image proxy for PDF export (wikimedia images)
const CACHE = 'archwander-v7';
const IMG_CACHE = 'archwander-img';
const PRECACHE = [
  '/ArchWander/',
  '/ArchWander/index.html',
  '/ArchWander/data.js',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {}))
  );
});

self.addEventListener('activate', e => {
  // Delete ALL old caches except current ones
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== IMG_CACHE).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // ── Image proxy: /__imgproxy__/?url=<encoded-url> ──
  // Page requests images through this path; SW fetches cross-origin,
  // wraps response as same-origin so page can use canvas without taint.
  if (url.pathname === '/ArchWander/__imgproxy__/') {
    const imgUrl = url.searchParams.get('url');
    if (!imgUrl) { e.respondWith(new Response('missing url', { status: 400 })); return; }
    e.respondWith(
      caches.open(IMG_CACHE).then(cache =>
        cache.match(imgUrl).then(cached => {
          if (cached) return cached;
          return fetch(imgUrl).then(res => {
            if (!res.ok) return new Response('', { status: res.status });
            // Clone body into a new same-origin Response with CORS-safe headers
            const headers = new Headers({
              'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
              'Cache-Control': 'public, max-age=86400'
            });
            return res.arrayBuffer().then(buf => {
              const resp = new Response(buf, { status: 200, headers });
              cache.put(imgUrl, resp.clone());
              return resp;
            });
          }).catch(() => new Response('', { status: 502 }));
        })
      )
    );
    return;
  }

  // ── Same-origin only for everything else ──
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
