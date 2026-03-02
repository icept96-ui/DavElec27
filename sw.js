/* DavElec v500 service worker (GitHub Pages project-safe) */
const CACHE = 'davelec-v500-' + self.location.pathname.replace(/\W+/g,'_');

const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k!==CACHE)?caches.delete(k):null)))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // only cache same-origin successful responses
        try{
          const url = new URL(req.url);
          if (url.origin === self.location.origin && res && res.ok){
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put(req, copy));
          }
        }catch(e){}
        return res;
      }).catch(() => cached || caches.match('./index.html'));
    })
  );
});
