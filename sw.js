/* DavElec minimal SW (GitHub Pages safe) - v618 */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  try {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
  } catch(e){}
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch(_) {}
    await self.clients.claim();
  })());
});

// Pure network pass-through (no caching logic)
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});