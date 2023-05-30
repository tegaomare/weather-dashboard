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
}*/
//INDEPENDENCES
let apiKey = "726dd2a088e2e0adb78e5c10f95f5ecc";
let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-input");
let searchHistory = document.querySelector("#search-history");
let currentWeather = document.querySelector("#current-weather");
let forecastWeather = document.querySelector("#forecast-weather");

//FUNCTIONS
// Function to fetch weather data from the API
function getWeatherData(city) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (data) {
      // Process current weather data
      let cityName = data.name;
      let date = new Date(data.dt * 1000);
      let icon = data.weather[0].icon;
      let temperature = data.main.temp;
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;