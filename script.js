
// Get HTML elements
const button = document.getElementById("btn");
const cityInput = document.getElementById("city");
const result = document.getElementById("result");

// When button is clicked
button.addEventListener("click", getWeather);


// Main function
async function getWeather() {

  const city = cityInput.value.trim();

  // Check if input is empty
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  // Show loading state
  button.disabled = true;
  button.textContent = "Loading...";
  result.innerHTML = "";


  try {

    /* ============================
       STEP 1: Get Latitude & Longitude
    ============================ */

    const geoURL =
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

    const geoResponse = await fetch(geoURL);

    // Check response
    if (!geoResponse.ok) {
      throw new Error("City search failed");
    }

    const geoData = await geoResponse.json();

    // If city not found
    if (!geoData.results) {
      throw new Error("City not found");
    }

    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;


    /* ============================
       STEP 2: Get Weather Data
    ============================ */

    const weatherURL =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const weatherResponse = await fetch(weatherURL);

    if (!weatherResponse.ok) {
      throw new Error("Weather data not available");
    }

    const weatherData = await weatherResponse.json();


    // Show result
    displayWeather(weatherData);

  }


  // Handle errors
  catch (error) {

    result.innerHTML = `
      <p class="error">
        ${error.message}
      </p>
    `;

    console.log(error);
  }


  // Always run this
  finally {

    button.disabled = false;
    button.textContent = "Get Weather";
  }

}


// Function to display data
function displayWeather(data) {

  const weather = data.current_weather;

  result.innerHTML = `

    <h3>Weather Report</h3>

    <p>
      Temperature: 
      ${weather.temperature} °C
    </p>

    <p>
      Wind Speed: 
      ${weather.windspeed} km/h
    </p>

    <p>
      Time: 
      ${weather.time}
    </p>

  `;
}
