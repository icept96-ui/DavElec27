/* DavElec Service Worker (v606) - safe for GitHub Pages */
const VERSION = "v606";
const CACHE = `davelec-${VERSION}`;
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-192-maskable.png",
  "./icon-512-maskable.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k.startsWith("davelec-") && k !== CACHE) ? caches.delete(k) : null));
    await self.clients.claim();
  })());
});

function isHtmlResponse(resp){
  const ct = (resp && resp.headers && resp.headers.get("content-type")) || "";
  return ct.includes("text/html");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Navigation requests: network-first, fallback to cached index
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const net = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put("./index.html", net.clone());
        return net;
      } catch (e) {
        const cached = await caches.match("./index.html");
        return cached || Response.error();
      }
    })());
    return;
  }

  // For everything else: cache-first, but avoid caching HTML as JS/CSS.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    const resp = await fetch(req);
    // If a script/style request accidentally returns HTML (common on 404 on GH pages), do not cache it.
    if ((req.destination === "script" || req.destination === "style") && isHtmlResponse(resp)) {
      return resp;
    }
    if (resp && resp.ok) {
      const cache = await caches.open(CACHE);
      cache.put(req, resp.clone());
    }
    return resp;
  })());
});