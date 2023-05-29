/*//FUNCTIONS
function handleFormSubmit(event) {
  event.preventDefault(); // Prevents the form from submitting and refreshing the page

  // Get the value from the city input field
  let city = document.getElementById("cityInput").value;
  // Autocomplete widget
  $(function () {
    let cityNames = [
      "new York City, New York",
      "los Angeles, California",
      "chicago, Illinois",
      "houston, Texas",
      "phoenix, Arizona",
      "philadelphia, Pennsylvania",
      "san Antonio, Texas",
      "san Diego, California",
      "dallas, Texas",
      "san Jose, California",
      "austin, Texas",
      "boston, Massachusetts",
      "seattle, Washington",
      "washington, D.C",
      "san Francisco, California",
      "miami, Florida",
      "atlanta, Georgia",
      "las Vegas, Nevada",
      "new Orleans, Louisiana",
    ];
    $("#cityInput").autocomplete({
      source: cityNames,
    });
  });

  // Perform the necessary API calls to retrieve weather data for the city
  // Update the currentWeather and forecast sections with the retrieved data
  // Add the city to the search history

  // Clear the input field after submitting
  document.getElementById("cityInput").value = "";
}

// Function to handle click events on the search history list
function handleHistoryClick(event) {
  const selectedCity = event.target.textContent;
  // Perform the necessary API calls to retrieve weather data for the selected city
  // Update the currentWeather and forecast sections with the retrieved data
}
*/
const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Event listener for form submission
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cityName = cityInput.value.trim();
  if (cityName) {
    getWeatherData(cityName);
    cityInput.value = '';
  }
});

// Event delegation for search history click
forecastContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('city-item')) {
    const cityName = event.target.getAttribute('data-city');
    getWeatherData(cityName);
  }
});

// Function to get weather data from API
function getWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;

  // Fetch weather data
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '200') {
        const city = data.city;
        const forecast = data.list;

        // Render current weather
        const currentWeather = forecast[0];
        renderCurrentWeather(city, currentWeather);

        // Render forecast
        const forecastData = forecast.slice(1, 6);
        renderForecast(forecastData);

        // Add city to search history
        addToSearchHistory(city.name);
      } else {
        // Handle API error
        console.error(data.message);
      }
    })
    .catch(error => {
      // Handle fetch error
      console.error('Error fetching weather data:', error);
    });
}

// Function to render current weather
function renderCurrentWeather(city, currentWeather) {
  const currentDate = new Date(currentWeather.dt * 1000);

  const html = `
    <h2>${city.name} (${currentDate.toLocaleDateString()})</h2>
    <img src="https://openweathermaporg/img/wn/${currentWeather.weather[0].icon}.png" alt="${currentWeather.weather[0].description}">
    <p>Temperature: ${convertKelvinToCelsius(currentWeather.main.temp)}°C</p>
    <p>Humidity: ${currentWeather.main.humidity}%</p>
    <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    `;
    currentWeatherContainer.innerHTML = html;
    }
    
    // Function to render forecast
    function renderForecast(forecastData) {
    let html = '<h2>5-Day Forecast</h2>';
    
    forecastData.forEach(forecast => {
    const forecastDate = new Date(forecast.dt * 1000);
    html += <div class="forecast-item"> <p>${forecastDate.toLocaleDateString()}</p> <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}"> <p>Temperature: ${convertKelvinToCelsius(forecast.main.temp)}°C</p> <p>Humidity: ${forecast.main.humidity}%</p> <p>Wind Speed: ${forecast.wind.speed} m/s</p> </div> ;
    });
    
    forecastContainer.innerHTML = html;
    }
    
    // Function to add city to search history
    function addToSearchHistory(cityName) {
    if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderSearchHistory();
    }
    }
    
    // Function to render search history
    function renderSearchHistory() {
    let html = '';
    
    searchHistory.forEach(city => {
    html += <p class="city-item" data-city="${city}">${city}</p>;
    });
    
    forecastContainer.innerHTML = html;
    }
    
    // Function to convert temperature from Kelvin to Celsius
    function convertKelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
    }
    
    // Initialize the weather dashboard
    function init() {
    if (searchHistory.length > 0) {
    const lastSearchedCity = searchHistory[searchHistory.length - 1];
    getWeatherData(lastSearchedCity);
    }
    renderSearchHistory();
    }
    
    init();
    
    