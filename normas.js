
(function(){
  function ready(fn){ if(document.readyState!='loading'){fn();} else {document.addEventListener('DOMContentLoaded',fn);} }
  ready(function(){
    try{
      var nav = document.querySelector('nav');
      if(!nav) return;

      // Create button
      var btn = document.createElement('button');
      btn.innerHTML = '<div class="ico">📚</div>Normas';
      btn.onclick = function(){
        if(window.showPage){ showPage('page_normas'); }
        else {
          var p = document.getElementById('page_normas');
          if(p){ document.querySelectorAll('.page').forEach(function(el){el.style.display='none'}); p.style.display='block'; }
        }
      };
      nav.appendChild(btn);

      if(!document.getElementById('page_normas')){
        var div = document.createElement('div');
        div.className='page';
        div.id='page_normas';
        div.innerHTML = `
        <h2>Normas Elétricas PT</h2>

        <div class="card">
        <h3>Secções mínimas</h3>
        Iluminação → 1.5 mm²<br>
        Tomadas → 2.5 mm²<br>
        Placa → 6 mm²
        </div>

        <div class="card">
        <h3>Proteções</h3>
        C10 iluminação<br>
        C16 tomadas<br>
        C20 máquinas<br>
        C32 placa
        </div>

        <div class="card">
        <h3>Queda de tensão</h3>
        Iluminação → 3%<br>
        Outros circuitos → 5%
        </div>
        `;
        document.body.appendChild(div);
      }
    }catch(e){ console.error("Normas module error:", e); }
  });
})();
