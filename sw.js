/* DavElec PWA service worker (safe cache for GitHub Pages project site) */
const CACHE_NAME = "davelec-v458" + "20260302";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k.startsWith("davelec-") && k !== CACHE_NAME) ? caches.delete(k) : Promise.resolve()))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for same-origin static assets; network-first for navigation (HTML).
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Navigation requests: network first, fallback to cached shell
  if (req.mode === "navigate" || (req.destination === "document")) {
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy)).catch(()=>{});
          return resp;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Static assets: cache first, but NEVER fall back to HTML for JS/CSS
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        // Don't cache opaque or error responses
        if (!resp || resp.status >= 400) return resp;
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(()=>{});
        return resp;
      });
    })
  );
});
