const ApiKey = "1a3d0fabcb11e871c50245693ab452e1";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("id-city-input");
const searchButton = document.getElementById("id-city-search-btn");
const weatherIcon = document.getElementById("id-weather-icon");

async function CheckWeather(City) {
	const response = await fetch(ApiUrl + City + `&appid=${ApiKey}`);
	if (response.status == 404) {
		document.querySelector(".ErrorMessage-Wrapper").style.display = "flex";
		document.querySelector(".WeatherInfo-Wrapper").style.display = "none";
	} else {
		var WeatherData = await response.json();
		console.log(WeatherData);

		document.querySelector(".City-H2").innerHTML = WeatherData.name;
		document.querySelector(".Temperature-H1").innerHTML =
			Math.round(WeatherData.main.temp) + "°C";
		document.querySelector(".Humidity-Value").innerHTML =
			WeatherData.main.humidity + "%";
		document.querySelector(".Wind-Value").innerHTML =
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

		document.querySelector(".WeatherInfo-Wrapper").style.display = "block";
		document.querySelector(".ErrorMessage-Wrapper").style.display = "none";
	}
}

searchButton.addEventListener("click", () => {
	CheckWeather(cityInput.value);
});
