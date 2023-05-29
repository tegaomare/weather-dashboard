//FUNCTIONS
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
