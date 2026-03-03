self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
// No fetch handler: let the browser handle network. Avoids GitHub Pages token issues.
