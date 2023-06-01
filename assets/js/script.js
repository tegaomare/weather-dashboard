//INDEPENDENCES
let cityInput = document.querySelector("#city-srch");
let searchBtn = document.querySelector("#Search-button");
let prevSearch = document.querySelector("#previous-Search");

//DATA
let today = dayjs().format("M/D/YYYY");
let city = "staten island";
let apiKey = "726dd2a088e2e0adb78e5c10f95f5ecc";

//USER INTERRACTION
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //localStorage.setItem("city-name", cityInput.value);
  saveCity(cityInput.value);
  let requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput.value +
    "&appid=" +
    apiKey +
    "&units=imperial";
  getApi(requestUrl);
});
function saveCity(cityName) {
  let cities = localStorage.getItem("city-name");
  if (!cities) {
    cities = [];
  } else {
    cities = JSON.parse(cities);
  }
  // Stringified Array:
  // "city-name": ["New York", "Los Angeles", "Brooklyn"]

  // Parsed Array:
  // city-name: ["New York", "Los Angeles", "Brooklyn"]
  if (!cities.includes(cityName)) {
    cities.push(cityName);
    localStorage.setItem("city-name", JSON.stringify(cities));
  }

  renderLastRegistered();
}
// function saveCity() {
//   let cityName = document.querySelector("#city-srch").value;
//   let pastSearchList = document.createElement("li");

//   // set this cityName value into local storage
//   localStorage.setItem(cityName, cityName);

//   pastSearchList.id = "pastSearchList" + cityName;
//   pastSearchList.innerText = cityName;

//   // append the past search list item to the previous search list
//   document.querySelector("#prevsearch").appendChild(pastSearchList);

//   // add a listener to the past search list item
//   pastSearchList.addEventListener("click", renderLastRegistered);

//   renderLastRegistered();
// }

function renderLastRegistered(event) {
  let cityName = event.target.innerText;
  document.querySelector("#city-srch").value = localStorage.getItem(cityName);
}
//FUNCTION
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
  let prevSearchList = JSON.parse(localStorage.getItem("city-name"));
  prevSearch.innerHTML = "";
  for (let i = 0; i < prevSearchList.length; i++) {
    prevSearch.innerHTML += "<li>" + prevSearchList[i] + "</li>";
  }
}
renderLastRegistered();
