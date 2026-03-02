/* DavElec Service Worker v454 */
const CACHE_NAME = 'davelec-v454';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async()=>{
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k!==CACHE_NAME) ? caches.delete(k) : Promise.resolve()));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if(req.method !== 'GET') return;

  event.respondWith((async()=>{
    const url = new URL(req.url);
    if(url.origin !== self.location.origin) return fetch(req);

    if(req.mode === 'navigate') {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put('./', fresh.clone());
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch(e) {
        const cached = await caches.match('./') || await caches.match('./index.html');
        return cached || new Response('Offline', {status:503, headers:{'Content-Type':'text/plain'}});
      }
    }

    const cached = await caches.match(req);
    if(cached) return cached;

    try {
      const fresh = await fetch(req);
      const cache = await caches.open(CACHE_NAME);
      if(fresh && fresh.ok && fresh.type === 'basic') cache.put(req, fresh.clone());
      return fresh;
    } catch(e) {
      return cached || new Response('Offline', {status:503, headers:{'Content-Type':'text/plain'}});
    }
  })());
});
