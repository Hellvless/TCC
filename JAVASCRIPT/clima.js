document.addEventListener('DOMContentLoaded', () => {
    // Tenta pegar a geolocalização do usuário assim que o DOM é carregado
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchCityWeatherFromCoords(latitude, longitude);
        }, () => {
            showAlert('');//Não foi possível obter sua localização. essa prr tava ak juca :)
        });
    } else {
        showAlert('Geolocalização não é suportada pelo seu navegador.');
    }
});

document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`Não foi possível localizar a cidade... <img src="../IMAGE/error-404.png"/>`);
    }
});

// Função para buscar o clima baseado nas coordenadas, mas usando o nome da cidade
async function fetchCityWeatherFromCoords(lat, lon) {
    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    
    // Primeiro, fazemos uma requisição para obter o nome da cidade usando as coordenadas
    const reverseGeocodeUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(reverseGeocodeUrl);
    const data = await response.json();

    if (data.cod === 200) {
        const cityName = data.name;  // Pega o nome da cidade a partir da resposta
        // Agora, fazemos uma nova requisição para pegar o clima dessa cidade específica
        fetchWeatherByCityName(cityName);
    } else {
        showAlert('Não foi possível obter o nome da cidade.');
    }
}

// Função para buscar o clima baseado apenas no nome da cidade
async function fetchWeatherByCityName(cityName) {
    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`Não foi possível localizar a cidade... <img src="src/images/404.svg"/>`);
    }
}

async function fetchCityWeatherFromCoords(lat, lon) {
    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    
    // Primeiro, fazemos uma requisição para obter o nome da cidade usando as coordenadas
    const reverseGeocodeUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(reverseGeocodeUrl);
    const data = await response.json();

    if (data.cod === 200) {
        const cityName = data.name;  // Pega o nome da cidade a partir da resposta
        // Agora, fazemos uma nova requisição para pegar o clima dessa cidade específica
        fetchWeatherByCityName(cityName);
    } else {
        showAlert('Não foi possível obter o nome da cidade.');
    }
}

// Função para buscar o clima baseado apenas no nome da cidade
async function fetchWeatherByCityName(cityName) {
    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`Não foi possível localizar a cidade... <img src="src/images/404.svg"/>`);
    }
}

function showInfo(json) {
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;

    const iconUrl = `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
    document.querySelector('#temp_img').setAttribute('src', iconUrl);

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}