
/* DavElec minimal SW (GitHub Pages safe) */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Clean old caches from previous experiments
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch(_) {}
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (event) => {
  // Pure network pass-through (no caching logic = fewer edge cases)
  event.respondWith(fetch(event.request));
});
