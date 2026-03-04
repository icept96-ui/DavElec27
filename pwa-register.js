/* DavElec PWA register (GitHub Pages directory-safe) */
(function(){
  if (!('serviceWorker' in navigator)) return;

  function baseDirUrl(){
    var origin = location.origin;
    var path = location.pathname || '/';
    // If URL is like /RepoName (no trailing slash) treat it as a directory
    var last = path.split('/').filter(Boolean).pop() || '';
    if (!path.endsWith('/')) {
      if (last && last.indexOf('.') === -1) {
        path = path + '/';
      } else {
        // looks like a file -> strip filename
        path = path.substring(0, path.lastIndexOf('/') + 1);
      }
    }
    return origin + path;
  }

  var base = baseDirUrl();               // e.g. https://user.github.io/Repo/
  var swUrl = base + 'sw.js';

  window.addEventListener('load', function(){
    navigator.serviceWorker.register(swUrl, { scope: base })
      .then(function(reg){ if (reg.update) reg.update(); })
      .catch(function(err){ console.warn('[DavElec] SW register failed', err); });
  });
})();