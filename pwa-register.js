/* DavElec PWA register (GitHub Pages safe) - v619 */
(function () {
  'use strict';

  function getBasePath() {
    // For GitHub Pages project sites: /<repo>/
    // For root sites: /
    var parts = (location.pathname || '/').split('/').filter(Boolean);
    if (!parts.length) return '/';
    return '/' + parts[0] + '/';
  }

  function show(msg){
    try{
      // Reuse DavElec toast if exists
      if (typeof window.toast === 'function') { window.toast(msg); return; }
      var el=document.getElementById('dav-pwa-toast');
      if(!el){
        el=document.createElement('div');
        el.id='dav-pwa-toast';
        el.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;background:rgba(0,0,0,.65);color:#fff;padding:10px 12px;border-radius:12px;font:14px/1.3 system-ui,-apple-system,Segoe UI,Roboto,Arial;backdrop-filter:blur(6px);';
        document.body.appendChild(el);
      }
      el.textContent=msg;
      setTimeout(function(){ if(el && el.parentNode) el.parentNode.removeChild(el); }, 5000);
    }catch(_){}
  }

  if (!('serviceWorker' in navigator)) return;

  var BASE = getBasePath();
  var SW_URL = BASE + 'sw.js?v=619';
  // Register with explicit scope (critical on GitHub Pages)
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(SW_URL, { scope: BASE })
      .catch(function (err) {
        show('PWA: falha ao registar Service Worker (' + (err && err.message ? err.message : err) + ')');
      });
  });
})();