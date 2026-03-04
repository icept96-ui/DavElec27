/* DavElec Service Worker (network-first, no caching) */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch (e) {}
    await self.clients.claim();
  })());
});

// Pure pass-through (prevents "Unexpected token '<'" caused by caching HTML for JS)
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
