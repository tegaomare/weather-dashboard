//INDEPENDENCES
let formEl = $(".form-control");
let nameInputEl = $("#City-name");

//FUNCTIONS
function handleFormSubmit(event) {
  event.preventDefault(); // Prevents the form from submitting and refreshing the page

  // Get the value from the city input field
  const city = document.getElementById("cityInput").value;

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

// Add event listeners to the form and search history list
document
  .getElementById("searchForm")
  .addEventListener("submit", handleFormSubmit);
document
  .getElementById("historyList")
  .addEventListener("click", handleHistoryClick);
// Autocomplete widget
$(function () {
  let cityNames = [
    "New York City, New York",
    "Los Angeles, California",
    "Chicago, Illinois",
    "Houston, Texas",
    "Phoenix, Arizona",
    "Philadelphia, Pennsylvania",
    "San Antonio, Texas",
    "San Diego, California",
    "Dallas, Texas",
    "San Jose, California",
    "Austin, Texas",
    "Boston, Massachusetts",
    "Seattle, Washington",
    "Washington, D.C",
    "San Francisco, California",
    "Miami, Florida",
    "Atlanta, Georgia",
    "Las Vegas, Nevada",
    "New Orleans, Louisiana",
  ];
  $("City-name").autocomplete({
    source: cityNames,
  });
});
