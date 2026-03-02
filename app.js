document.getElementById("btnStart").addEventListener("click",function(){

document.getElementById("menu").classList.remove("hidden");

});

function calcPotencia(){

let v = prompt("Voltagem (V)");
let i = prompt("Corrente (A)");

v = parseFloat(v);
i = parseFloat(i);

if(isNaN(v)||isNaN(i)){

alert("Valores inválidos");
return;

}

let p = v*i;

document.getElementById("resultado").innerHTML =
"Potência = "+p+" W";

}

function calcCorrente(){

let p = prompt("Potência (W)");
let v = prompt("Voltagem (V)");

p = parseFloat(p);
v = parseFloat(v);

if(isNaN(p)||isNaN(v)){

alert("Valores inválidos");
return;

}

let i = p/v;

document.getElementById("resultado").innerHTML =
"Corrente = "+i.toFixed(2)+" A";

}

function calcQueda(){

let l = prompt("Comprimento cabo (m)");
let i = prompt("Corrente (A)");
let s = prompt("Secção cabo mm2");

l=parseFloat(l);
i=parseFloat(i);
s=parseFloat(s);

if(isNaN(l)||isNaN(i)||isNaN(s)){

alert("Valores inválidos");
return;

}

let queda=(2*l*i*0.017)/s;

document.getElementById("resultado").innerHTML=
"Queda tensão = "+queda.toFixed(2)+" V";

}
