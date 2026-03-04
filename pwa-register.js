/* DavElec PWA register (GitHub Pages directory-safe) - v617 */
(function(){
  if (!('serviceWorker' in navigator)) return;

  function baseDirUrl(){
    var origin = location.origin;
    var path = location.pathname || '/';
    var last = path.split('/').filter(Boolean).pop() || '';
    if (!path.endsWith('/')) {
      if (last && last.indexOf('.') === -1) {
        path = path + '/';
      } else {
        path = path.substring(0, path.lastIndexOf('/') + 1);
      }
    }
    return origin + path;
  }

  var base = baseDirUrl();                 // e.g. https://user.github.io/Repo/
  var swUrl = base + 'sw.js?v=v617';    // cache-bust

  function forceActivate(reg){
    try {
      if (reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    } catch(e){}
  }

  window.addEventListener('load', function(){
    navigator.serviceWorker.register(swUrl, { scope: base })
      .then(function(reg){
        forceActivate(reg);
        reg.addEventListener('updatefound', function(){
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', function(){
            if (nw.state === 'installed') forceActivate(reg);
          });
        });
        if (reg.update) reg.update();
      })
      .catch(function(err){ console.warn('[DavElec] SW register failed', err); });
  });
})();