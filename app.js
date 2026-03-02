
function openTool(tool){

const c = document.getElementById("content")

if(tool==="secao"){
c.innerHTML=`
<h2>Cálculo Secção</h2>

<input id="pot" placeholder="Potência W">
<input id="dist" placeholder="Distância m">

<button onclick="calcSecao()">Calcular</button>

<div id="resultado"></div>
`
}

if(tool==="conversor"){
c.innerHTML=`
<h2>Conversor Watts → Amps</h2>

<input id="watts" placeholder="Watts">

<button onclick="wattsToAmps()">Converter</button>

<div id="resultado"></div>
`
}

if(tool==="circuitos"){
c.innerHTML=`
<h2>Circuitos Habitação</h2>
<button onclick="showCircuitos()">Mostrar tabela</button>
<div id="resultado"></div>
`
}

if(tool==="quadro"){
c.innerHTML=`
<h2>Quadro Elétrico</h2>
<p>Módulo em construção</p>
`
}

if(tool==="orcamento"){
c.innerHTML=`
<h2>Orçamentos</h2>
<p>Módulo em construção</p>
`
}

}
