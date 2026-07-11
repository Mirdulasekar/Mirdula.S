const apiKey = "8772602240b088f35736c769e96a9e9d";

async function getWeather() {

    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to fetch weather data.");
        }

        result.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>

            <p>🌡 <strong>Temperature:</strong> ${data.main.temp} °C</p>

            <p>🤒 <strong>Feels Like:</strong> ${data.main.feels_like} °C</p>

            <p>💧 <strong>Humidity:</strong> ${data.main.humidity}%</p>

            <p>💨 <strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>

            <p>☁ <strong>Weather:</strong> ${data.weather[0].description}</p>

            <p>🌍 <strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        `;

    } catch (error) {

        result.innerHTML = `
            <p style="color:red; font-weight:bold;">
                Error: ${error.message}
            </p>
        `;

        console.error(error);
    }
}