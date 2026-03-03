/* DavElec minimal SW (GitHub Pages safe) */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch (_) {}
    await self.clients.claim();
  })());
});
// Network pass-through (no caching). Prevents serving HTML for missing JS.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
