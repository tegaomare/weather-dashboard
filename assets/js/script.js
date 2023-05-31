//INDEPENDENCES
let cityInput = document.querySelector("#city-input");
let searchBtn = document.querySelector("#Search-button");
let lat;
let lon;
let today = dayjs().format("M/D/YYYY");
let city = "staten island";
let apiKey = "a156ce36549069ae356f11172fc650e1";
let requestUrl2 =
  "https://api.openweathermap.org/data/2.5/forecast?lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  apiKey +
  "&units=imperial";
let requestUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityInput.value +
  "&appid=a156ce36549069ae356f11172fc650e1&units=imperial";

//USER INTERRACTION
//searchBtn.addEventListener("click", getApi);
//FUNCTION
let responseText = document.getElementById("response-text");

function getApi() {
  /*let requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput.value +
    "&appid=a156ce36549069ae356f11172fc650e1&units=imperial";*/
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("city-name").textContent =
        data.name + " (" + today + ") ";
      document.getElementById(
        "city-icon"
      ).src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      document.getElementById("city-temp").textContent =
        "Temp: " + data.main.temp + " F\xB0";
      document.getElementById("city-wind").textContent =
        "Wind: " + data.wind.speed + " MPH";
      document.getElementById("city-humid").textContent =
        "Humid: " + data.main.humidity + "%";
      lon = data.coord.lon;
      lat = data.coord.lat;
    });

  /*let requestUrl2 =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=imperial";*/
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let dayElIndex = 1;
      for (i = 5; i < 39; i += 8) {
        document.getElementById("day-" + dayElIndex + "-date").textContent =
          data.list[i].dt_txt.slice(0, 10);
        document.getElementById(
          "day-" + dayElIndex + "-icon"
        ).src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
        document.getElementById("day-" + dayElIndex + "-temp").textContent =
          "Temp: " + data.list[i].main.temp + " F\xB0";
        document.getElementById("day-" + dayElIndex + "-wind").textContent =
          "Wind: " + data.list[i].wind.speed + " MPH";
        document.getElementById("day-" + dayElIndex + "-wind").textContent =
          "Wind: " + data.list[i].wind.speed + " MPH";
        document.getElementById("day-" + dayElIndex + "-humid").textContent =
          "Humidity: " + data.list[i].main.humidity + "%";
        dayElIndex++;
      }
    });
}
function runOldSearch(event) {
  cityInput.value = localStorage.getItem(event.target.innerText);
  getApi();
}

function createPastSearchButton() {
  let pastSearchButton = document.createElement("button");

  //set this cityName value into local storage
  localStorage.setItem(
    document.querySelector("#inputbox").value,
    document.querySelector("#inputbox").value
  );

  pastSearchButton.id = "pastSearchButton" + cityInput.value;
  pastSearchButton.innerText = cityInput.value;
  //makes the button pretty
  pastSearchButton.classList.add(
    "btn",
    "btn-secondary",
    "btn-lg",
    "custombtn",
    "pastSearchButtonC"
  );
  document.querySelector("#previous-Search").appendChild(pastSearchButton);

  //adds a listener to the past search buttons
  let pastSearchButtons = document.getElementsByClassName("pastSearchButtonC");
  for (var i = 0; i < pastSearchButtons.length; i++) {
    pastSearchButtons[i].addEventListener("click", runOldSearch);
  }
}

//searchBtn.addEventListener("click", getApi);
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  getApi();
});
//for (i=0; i < somearray.lenght; i+=8) for url2
