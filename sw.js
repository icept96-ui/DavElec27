/* DavElec SW v460 (GitHub Pages safe) */
const VERSION = 'v460';
const CACHE = `davelec-${VERSION}`;
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

// Install: pre-cache core (best-effort)
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    try{
      const cache = await caches.open(CACHE);
      await cache.addAll(CORE_ASSETS.map(u => new Request(u, {cache:'reload'})));
    }catch(e){}
  })());
});

// Activate: cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('davelec-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Fetch strategy:
// - For navigation (HTML): network-first, fallback to cache
// - For static: cache-first, fallback to network
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  const isNav = (req.mode === 'navigate') || (req.destination === 'document');

  if (isNav) {
    event.respondWith((async () => {
      try{
        const fresh = await fetch(req, {cache:'no-store'});
        const cache = await caches.open(CACHE);
        cache.put('./index.html', fresh.clone()).catch(()=>{});
        return fresh;
      }catch(e){
        const cached = await caches.match('./index.html');
        return cached || new Response('Offline', {status: 503, headers:{'Content-Type':'text/plain'}});
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try{
      const fresh = await fetch(req);
      // cache successful basic responses
      if (fresh && fresh.ok && fresh.type === 'basic') {
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone()).catch(()=>{});
      }
      return fresh;
    }catch(e){
      return cached || new Response('', {status: 504});
    }
  })());
});
