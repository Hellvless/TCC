function CompleteForm(){
    const public_transport = document.querySelector('#public-transport').value;
    const consumo_carne = document.querySelector('#consumo-carne').value;
    const flights_per_year = document.querySelector('#flights-per-year').value;
    const water_consumption = document.querySelector('#water-consumption').value;

    localStorage.setItem('public-transport',public_transport);
    localStorage.setItem('consumo-carne',consumo_carne);
    localStorage.setItem('flights-per-year',flights_per_year);
    localStorage.setItem('water-consumption',water_consumption);
}