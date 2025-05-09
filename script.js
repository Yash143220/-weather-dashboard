/**
 * The JavaScript code fetches weather data based on user input and updates the UI with the current
 * weather information and corresponding weather icon.
 * @param data - The `data` parameter in the `updateWeatherUI` function is the weather data fetched
 * from the API in JSON format. It contains information about the current weather conditions, such as
 * temperature, humidity, wind speed, pressure, sunrise time, sunset time, and more. This data is used
 * to update
 * @param location - The `location` parameter in the code refers to the location entered by the user to
 * fetch weather data. It is used to determine the weather information for that specific location.
 */
const searchBtn = document.getElementById("SearchButton");
const section = document.getElementById("weatherSection");

window.addEventListener("load", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});



searchBtn.addEventListener("click", async () => {
    const location = document.getElementById("searchBox").value.trim();
    if (!location) return alert("Please enter a location.");

    try {
        const res = await fetch(`https://wttr.in/${location}?format=j1`);
        const data = await res.json();
        section.scrollIntoView({ behavior: "smooth" });
        updateWeatherUI(data, location);
    } catch (err) {
        alert("Error fetching weather data.");
        console.log(err);
    }
});

document.getElementById("searchBox").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        
        const location = document.getElementById("searchBox").value.trim();
        if (!location) return alert("Please enter a location.");

        try {
            const res = await fetch(`https://wttr.in/${location}?format=j1`);
            const data = await res.json();
            section.scrollIntoView({ behavior: "smooth" });
            updateWeatherUI(data, location);
        } catch (err) {
            alert("Error fetching weather data.");
            console.log(err);
        }
    }
});


const cityDisplay = document.getElementById("cityName");
const descDisplay = document.getElementById("weatherDesc");
const tempDisplay = document.getElementById("temp");
const feelslikeDisplay = document.getElementById("feelsLike");
const humidityDisplay = document.getElementById("humidity");
const windDisplay = document.getElementById("windSpeed");
const winddirDisplay = document.getElementById("windDir");
const pressureDisplay = document.getElementById("pressure");
const sunriseDisplay = document.getElementById("sunrise");
const sunsetDisplay = document.getElementById("sunset");
const mainWeatherDisplay = document.getElementById("mainWeather");

function updateWeatherUI(data, location) {
    const current = data.current_condition[0];
    const astronomy = data.weather[0].astronomy[0];

    cityDisplay.textContent = location;
    descDisplay.textContent = current.weatherDesc[0].value;
    tempDisplay.textContent = `${current.temp_C}°C`;
    feelslikeDisplay.textContent = `Feels like ${current.FeelsLikeC}°C`;
    humidityDisplay.textContent = `${current.humidity}%`;
    windDisplay.textContent = `${current.windspeedKmph} km/h`;
    winddirDisplay.textContent = current.winddir16Point;
    pressureDisplay.textContent = `${current.pressure} mb`;
    sunriseDisplay.textContent = astronomy.sunrise;
    sunsetDisplay.textContent = astronomy.sunset;
    mainWeatherDisplay.textContent = current.weatherDesc[0].value;

    setWeatherIcon(current.weatherDesc[0].value);
}

function setWeatherIcon(desc) {
    const iconDisplay = document.getElementById("iconDisplay");
    desc = desc.toLowerCase();
    let iconUrl = "";

    if (desc.includes("cloud")) iconUrl = "https://openweathermap.org/img/wn/03d@2x.png";
    else if (desc.includes("rain")) iconUrl = "https://openweathermap.org/img/wn/09d@2x.png";
    else if (desc.includes("clear")) iconUrl = "https://openweathermap.org/img/wn/01d@2x.png";
    else if (desc.includes("snow")) iconUrl = "https://openweathermap.org/img/wn/13d@2x.png";
    else if (desc.includes("storm") || desc.includes("thunder")) iconUrl = "https://openweathermap.org/img/wn/11d@2x.png";
    else iconUrl = "https://openweathermap.org/img/wn/50d@2x.png"; 

    iconDisplay.src = iconUrl;
}
