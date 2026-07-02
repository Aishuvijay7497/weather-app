const apiKey = "4531dac0419a70bff2096d3d9028422f";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        weatherResult.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {

    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const weather = data.weather[0].main;
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;

    weatherResult.innerHTML = `
        <h2>${cityName}</h2>
        <p><strong>Temperature:</strong> ${temperature} °C</p>
        <p><strong>Weather:</strong> ${weather}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}