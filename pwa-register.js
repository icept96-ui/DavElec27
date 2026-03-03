
(() => {
  // GitHub Pages project base (e.g. /DavElec27/)
  function computeBase() {
    let p = location.pathname || "/";
    // If visiting /repo (no trailing slash), treat as directory (GitHub Pages usually redirects, but be safe)
    if (!p.endsWith("/") && !p.split("/").pop().includes(".")) p = p + "/";
    // If visiting /repo/index.html, trim to /repo/
    if (p.toLowerCase().endsWith("/index.html")) p = p.slice(0, -("index.html".length));
    // Keep only directory portion
    if (!p.endsWith("/")) p = p.substring(0, p.lastIndexOf("/") + 1);
    return p;
  }

  const base = computeBase();

  // Patch manifest/icon hrefs to absolute (prevents wrong resolution when URL lacks trailing slash)
  function setHref(id, href) {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", href);
  }
  setHref("pwa-manifest", base + "manifest.webmanifest");
  setHref("pwa-icon-192", base + "icon-192.png");
  setHref("pwa-icon-512", base + "icon-512.png");
  setHref("pwa-apple", base + "icon-192.png");

  // Animated splash overlay (pure CSS injected here so we don't touch the big HTML)
  const style = document.createElement("style");
  style.textContent = `
    #dav-splash{
      position:fixed; inset:0; z-index:999999;
      display:flex; align-items:center; justify-content:center;
      background: radial-gradient(1200px 800px at 50% -10%, rgba(52,163,255,.18), transparent 55%),
                  radial-gradient(900px 650px at 50% 110%, rgba(255,206,85,.16), transparent 55%),
                  #0b1020;
      transition: opacity .35s ease, transform .35s ease;
    }
    #dav-splash.hidden{ opacity:0; pointer-events:none; transform: scale(1.02); }
    #dav-splash .wrap{ display:flex; flex-direction:column; align-items:center; gap:14px; }
    #dav-splash .logo{
      width:116px; height:116px; border-radius:28px;
      background: linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.03));
      border:1px solid rgba(255,255,255,.12);
      box-shadow: 0 20px 60px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.12);
      display:grid; place-items:center;
      position:relative; overflow:hidden;
    }
    #dav-splash .logo::before{
      content:""; position:absolute; inset:-40%;
      background: conic-gradient(from 0deg, rgba(52,163,255,.0), rgba(52,163,255,.45), rgba(255,206,85,.45), rgba(52,163,255,.0));
      animation: davSpin 1.4s linear infinite;
      filter: blur(0px);
    }
    #dav-splash .logo::after{
      content:""; position:absolute; inset:2px; border-radius:26px;
      background: rgba(11,16,32,.86);
    }
    #dav-splash img{ width:76px; height:76px; position:relative; z-index:2; }
    #dav-splash .bar{
      width:180px; height:6px; border-radius:999px;
      background: rgba(255,255,255,.10);
      overflow:hidden;
      border:1px solid rgba(255,255,255,.10);
    }
    #dav-splash .bar > i{
      display:block; height:100%; width:40%;
      background: linear-gradient(90deg, rgba(52,163,255,.0), rgba(52,163,255,.9), rgba(255,206,85,.9), rgba(52,163,255,.0));
      animation: davLoad 1.1s ease-in-out infinite;
    }
    #dav-splash .txt{ font: 600 13px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial; color: rgba(255,255,255,.75); letter-spacing:.2px; }
    @keyframes davSpin{ to { transform: rotate(360deg); } }
    @keyframes davLoad{ 0%{ transform: translateX(-60%);} 50%{ transform: translateX(90%);} 100%{ transform: translateX(220%);} }
  `;
  document.head.appendChild(style);

  const splash = document.getElementById("dav-splash");
  if (splash) {
    splash.innerHTML = `
      <div class="wrap">
        <div class="logo"><img src="${base}icon-192.png" alt="DavElec"></div>
        <div class="bar"><i></i></div>
        <div class="txt">A iniciar…</div>
      </div>
    `;
    // Hide splash after first paint + a short delay (keeps it smooth on slow phones)
    const hide = () => splash.classList.add("hidden");
    window.addEventListener("load", () => setTimeout(hide, 450), { once: true });
    // Safety: never block UI if load event is delayed
    setTimeout(hide, 3500);
  }

  // Service worker register (NEVER allow this to throw / become unhandled)
  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    const swUrl = base + "sw.js";
    try {
      navigator.serviceWorker.register(swUrl, { scope: base })
        .catch(() => { /* swallow */ });
    } catch (_) { /* swallow */ }
  }
  registerSW();

  // Optional: if we are on /repo (no trailing slash), redirect once to /repo/
  // (helps relative paths for manifest/icons in some Android launchers)
  try {
    const p = location.pathname || "/";
    if (!p.endsWith("/") && !p.split("/").pop().includes(".")) {
      // Only redirect on GitHub Pages project sites, not on localhost/file:
      if (location.hostname.endsWith(".github.io")) {
        location.replace(p + "/" + location.search + location.hash);
      }
    }
  } catch(_) {}
})();
