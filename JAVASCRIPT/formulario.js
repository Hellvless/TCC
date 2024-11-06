function redirect() {
    const kwh = document.querySelector('#kwh').value;
    const roupas_ano = document.querySelector('#roupas-ano').value;
    const pecas_media = document.querySelector('#pecas-media').value;
    const fuel_consumption = document.querySelector('#fuel-consumption').value;

    localStorage.setItem('kwh',kwh);
    localStorage.setItem('roupas-ano',roupas_ano);
    localStorage.setItem('pecas-media',pecas_media);
    localStorage.setItem('fuel-consumption',fuel_consumption);
    window.location.href = 'formulario1.html';
}
