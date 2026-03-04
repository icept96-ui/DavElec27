/* DavElec minimal SW (GitHub Pages safe) */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Remove old caches created by previous experiments
    try{
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }catch(e){}
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (event) => {
  // Pure network pass-through (prevents "Unexpected token <" due to cache/HTML mismatch)
  event.respondWith(fetch(event.request));
});
