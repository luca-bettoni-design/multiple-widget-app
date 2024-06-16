const ApiKey = "1a3d0fabcb11e871c50245693ab452e1";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("id-city-input");
const searchButton = document.getElementById("id-city-search-btn");
const weatherError = document.getElementById("id-weather-error");

const weatherInfo = document.getElementById("id-weather-info");
const weatherIcon = document.getElementById("id-weather-icon");
const city = document.getElementById("id-city");
const temperature = document.getElementById("id-temperature-value");
const humidity = document.getElementById("id-humidity-value");
const wind = document.getElementById("id-wind-value");

async function checkWeather(City) {
	const response = await fetch(ApiUrl + City + `&appid=${ApiKey}`);
	if (response.status == 404) {
		weatherError.style.display = "flex";
		weatherInfo.style.display = "none";
	} else {
		var WeatherData = await response.json();
		console.log(WeatherData);

		document.getElementById("id-city").innerHTML = WeatherData.name;
		document.getElementById("id-tempreature-value").innerHTML =
			Math.round(WeatherData.main.temp) + "°C";
		document.getElementById("id-humidity-value").innerHTML =
			WeatherData.main.humidity + "%";
		document.getElementById("id-wind-value").innerHTML =
			Math.round(WeatherData.wind.speed) + "kmh";

		if (WeatherData.weather[0].main == "Clouds") {
			weatherIcon.src = "../assets/weather-assets/clouds.png";
		} else if (WeatherData.weather[0].main == "Clear") {
			weatherIcon.src = "../assets/weather-assets/clear.png";
		} else if (WeatherData.weather[0].main == "Rain") {
			weatherIcon.src = "../assets/weather-assets/rain.png";
		} else if (WeatherData.weather[0].main == "Drizzle") {
			weatherIcon.src = "../assets/weather-assets/drizzle.png";
		} else if (WeatherData.weather[0].main == "Mist") {
			weatherIcon.src = "../assets/weather-assets/mist.png";
		}

		document.getElementById("id-weather-info").style.display = "block";
		document.getElementById("id-weather-error").style.display = "none";
	}
}

searchButton.addEventListener("click", () => {
	checkWeather(cityInput.value);
});
