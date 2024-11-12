function salvarDados() {
    console.log(localStorage)
    const kwh = document.querySelector('#kwh').value;
    const roupas_ano = document.querySelector('#roupas-ano').value;
    const pecas_media = document.querySelector('#pecas-media').value;
    const veiculo_usado = document.querySelector('#veiculo-usado').value;
    const transporte_publico = document.querySelector('#transporte-publico').value;
    const voos = document.querySelector("#voos-por-ano").value;
    const agua = document.querySelector("consumo-agua").value;
    const alimento = document.querySelector("#alimento-organico").value;
    const recicla = document.querySelector("#recicla").value;
    
    
}

function redirect1() {
    window.location.href="formulario1.html";
}
function redirect2() {
    window.location.href="formulario2.html";
}
function redirect3() {  
console.log(localStorage);
if(localStorage != "" ) {
window.location.href="novo.html";
} else {
    alert("Você precisa responder o formulário para saber o resultado!")
}
}