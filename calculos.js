
function calcSecao(){

let p = Number(document.getElementById("pot").value)
let d = Number(document.getElementById("dist").value)

let i = p/230

let secao = 1.5

if(i>10) secao=2.5
if(i>16) secao=4
if(i>25) secao=6

document.getElementById("resultado").innerHTML =
"Corrente: "+i.toFixed(2)+" A<br>Secção recomendada: "+secao+" mm²"
}

function wattsToAmps(){

let w = Number(document.getElementById("watts").value)

let a = w/230

document.getElementById("resultado").innerHTML =
a.toFixed(2)+" A"

}
