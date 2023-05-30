//INDEPENDENCES
let cityInput = document.querySelector("city-input");
let searchBtn = document.querySelector("#Search-button");
let lat;
let lon;
let today = dayjs().format("ddd MMM D, YYYY");
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
  cityInput +
  "&appid=a156ce36549069ae356f11172fc650e1&units=imperial";

//USER INTERRACTION
searchBtn.addEventListener("click", getApi);
//FUNCTION
let responseText = document.getElementById("response-text");

function getApi() {
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

getApi();
//for (i=0; i < somearray.lenght; i+=8) for url2
