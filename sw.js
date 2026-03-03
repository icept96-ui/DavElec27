/* DavElec SW (safe, simple) */
self.addEventListener('install', (event) => { self.skipWaiting(); });
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch(_) {}
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (event) => {
  // network pass-through; avoids caching mismatches causing HTML returned as JS
  event.respondWith(fetch(event.request));
});
