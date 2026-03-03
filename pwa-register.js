// DavElec PWA register (GitHub Pages safe basePath)
(function(){
  if (!("serviceWorker" in navigator)) return;

  function getBasePath(){
    try{
      var bp = window.__DAV_BASE_PATH__;
      if(typeof bp === "string" && bp.startsWith("/")) return bp;
    }catch(e){}
    // Fallback: derive from current URL, treating last segment without dot as directory
    var p = location.pathname || "/";
    var last = p.split("/").filter(Boolean).slice(-1)[0] || "";
    var isFile = last.indexOf(".") !== -1;
    return p.endsWith("/") ? p : (isFile ? p.substring(0, p.lastIndexOf("/") + 1) : (p + "/"));
  }

  window.addEventListener("load", function(){
    var basePath = getBasePath();
    var swUrl = basePath + "sw.js";
    navigator.serviceWorker.register(swUrl, { scope: basePath }).catch(function(err){
      console.warn("SW register failed:", err);
    });
  });
})();
