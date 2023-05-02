// https://api.weatherapi.com/v1/current.json?key=aa23b5a96e4a496f85c154256230205&q=Nepal&aqi=no

const apiKey = "aa23b5a96e4a496f85c154256230205";
var weatherIcon = document.getElementById("weather-icon");
var locationn = document.getElementById("location");
var temperature = document.getElementById("temperature");
var condition = document.getElementById("condition");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var pressure = document.getElementById("pressure");
var visibility = document.getElementById("visibility");
var submit = document.getElementById("search-button");

function fetchdata(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("City not found");
            }
        })
        .then((data) => {
            weatherIcon.src = `https:${data.current.condition.icon}`;
            locationn.textContent = `${data.location.name}, ${data.location.country}`;
            temperature.textContent = `${data.current.temp_c} °C`;
            condition.textContent = `${data.current.condition.text}`;
            humidity.textContent = `${data.current.humidity}%`;
            wind.textContent = `${data.current.wind_kph} km/hr`;
            pressure.textContent = `${
                data.current.pressure_mb * 0.750062
            } mm Hg`;
            visibility.textContent = `${data.current.vis_km} km`;
        })
        .catch((error) => {
            console.error(error);
            alert("City not found");
        });
}

function sendcity(e) {
    var city = document.getElementById("search-bar").value.trim();
    if (city != "") {
        fetchdata(city);
    } else {
        alert("Please enter a city name");
        e.preventDefault();
    }
}

function success(position) {
    city = `${position.coords.latitude},${position.coords.longitude}`;
    if (city != null) {
        fetchdata(city);
    } else {
        alert("Location cannot be found please try again later");
    }
}

async function locate() {
    navigator.geolocation.getCurrentPosition(success);
}
