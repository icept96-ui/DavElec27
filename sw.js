/* DavElec PWA Service Worker (v450) */
const CACHE_VERSION = "davelec-v450";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_VERSION ? caches.delete(k) : Promise.resolve())));
    await self.clients.claim();
  })());
});

// Navigation: try network first, fallback to cache
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // HTML navigations
  if (req.mode === "navigate" || (req.destination === "document")) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        // If GitHub returns 404 page HTML, still cache isn't helpful; just return it.
        return fresh;
      } catch (e) {
        const cache = await caches.open(CACHE_VERSION);
        const cached = await cache.match("./index.html") || await cache.match("./");
        return cached || new Response("Offline", {status: 200, headers: {"Content-Type":"text/plain; charset=utf-8"}});
      }
    })());
    return;
  }

  // Static assets: cache-first
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(req, {ignoreSearch: true});
    if (cached) return cached;

    try {
      const fresh = await fetch(req);
      // Cache only successful basic responses
      if (fresh && fresh.ok && fresh.type === "basic") {
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (e) {
      // fallback to anything cached without search
      const fallback = await cache.match(url.pathname, {ignoreSearch: true});
      return fallback || new Response("", {status: 504});
    }
  })());
});
