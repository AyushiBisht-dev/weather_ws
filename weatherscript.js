const apiKey = "419d538ddd74eadbcc4a2c08bd6bc304";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city || city.trim() === "") {
        alert("Please enter a valid city name.");
        return;
    }

    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main =="Clouds"){
        weatherIcon.src="clouds.png";
    }
    else if(data.weather[0].main =="Clear"){
        weatherIcon.src="clear.png";
    }
    else if(data.weather[0].main =="Rain"){
        weatherIcon.src="rain.png";
    }
    else if(data.weather[0].main =="Drizzle"){
        weatherIcon.src="drizzle.png";
    }
    else if(data.weather[0].main =="Mist"){
        weatherIcon.src="mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    checkWeather(city);
});

// Load default city weather on page load
checkWeather("new york");
