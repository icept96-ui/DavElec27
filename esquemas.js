
(function(){
  function ready(fn){ if(document.readyState!='loading'){fn();} else {document.addEventListener('DOMContentLoaded',fn);} }
  ready(function(){
    try{
      var nav = document.querySelector('nav');
      if(!nav) return;

      // Create button
      var btn = document.createElement('button');
      btn.innerHTML = '<div class="ico">📐</div>Esquemas';
      btn.onclick = function(){
        if(window.showPage){ showPage('page_esquemas'); }
        else {
          var p = document.getElementById('page_esquemas');
          if(p){ document.querySelectorAll('.page').forEach(function(el){el.style.display='none'}); p.style.display='block'; }
        }
      };
      nav.appendChild(btn);

      // Create page if not exists
      if(!document.getElementById('page_esquemas')){
        var div = document.createElement('div');
        div.className='page';
        div.id='page_esquemas';
        div.innerHTML = `
        <h2>Esquemas Técnicos</h2>

        <div class="card">
          <h3>Interruptor Simples</h3>
          <div id="schSvgWrap">
          <svg viewBox="0 0 400 200">
          <line x1="20" y1="100" x2="150" y2="100" stroke="#b45309" stroke-width="4"/>
          <circle cx="150" cy="100" r="5" fill="#fff"/>
          <line x1="150" y1="100" x2="250" y2="100" stroke="#b45309" stroke-width="4"/>
          <line x1="250" y1="100" x2="300" y2="60" stroke="#b45309" stroke-width="4"/>
          <circle cx="300" cy="60" r="8" stroke="#fff" fill="none"/>
          <line x1="300" y1="68" x2="300" y2="140" stroke="#3b82f6" stroke-width="4"/>
          </svg>
          </div>
          <div class="small">
          Secção recomendada: 1.5 mm²<br>
          Disjuntor: C10<br>
          Diferencial: 30 mA
          </div>
        </div>

        <div class="card">
          <h3>Tomada Simples</h3>
          <div id="schSvgWrap">
          <svg viewBox="0 0 400 200">
          <line x1="40" y1="80" x2="200" y2="80" stroke="#b45309" stroke-width="4"/>
          <line x1="40" y1="120" x2="200" y2="120" stroke="#3b82f6" stroke-width="4"/>
          <circle cx="220" cy="100" r="18" stroke="#fff" fill="none" stroke-width="3"/>
          </svg>
          </div>
          <div class="small">
          Secção recomendada: 2.5 mm²<br>
          Disjuntor: C16<br>
          Diferencial: 30 mA
          </div>
        </div>
        `;
        document.body.appendChild(div);
      }
    }catch(e){ console.error("Esquemas module error:", e); }
  });
})();
