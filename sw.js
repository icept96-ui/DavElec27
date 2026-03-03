self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
// Minimal SW (no fetch handler) for installability without GitHub path issues.
