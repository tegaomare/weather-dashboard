//INDEPENDENCES
let cityInput = document.querySelector("#city-srch");
let searchBtn = document.querySelector("#Search-button");
let prevSearch = document.querySelector("#previous-Search");

//DATA
let lat;
let lon;
let today = dayjs().format("M/D/YYYY");
let city = "staten island";
let apiKey = "726dd2a088e2e0adb78e5c10f95f5ecc";
/*let requestUrl =
  "https:https://api.openweathermap.org/data/2.5/weather?q=" +
  cityInput.value +
  "&appid=" +
  apiKey;
console.log(requestUrl);*/
/*let requestUrl2 =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityInput.value +
  "lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  apiKey +
  "&units=imperial";*/
//USER INTERRACTION
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.setItem("city-name", cityInput.value);
  let requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput.value +
    "&appid=" +
    apiKey;
  getApi(requestUrl);
});
function saveCity(cityName) {
  let cities = localStorage.getItem("cities");
  if (!cities) {
    cities = [];
  } else {
    cities = JSON.parse(cities);
  }
  cities.push(cityName);
  localStorage.setItem("cities", JSON.stringify(cities));
}
//FUNCTION
//let responseText = document.getElementById("response-text");

function getApi(requestUrl) {
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
  getApi2();
  renderLastRegistered();
}
function getApi2() {
  let requestUrl2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityInput.value +
    "&appid=" +
    apiKey +
    "&units=imperial";
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
function renderLastRegistered() {
  let prevSearchList = JSON.parse(localStorage.getItem("cities"));

  for (let i = 0; i < prevSearchList.length; i++) {
    prevSearch.innerHTML += "<li>" + prevSearchList[i] + "</li>";
  }
}
//for (i=0; i < somearray.lenght; i+=8) for url2
