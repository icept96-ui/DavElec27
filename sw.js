// DavElec service worker (no-cache passthrough to avoid GitHub Pages issues)
self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
// No fetch handler => browser default network behavior (most stable)
