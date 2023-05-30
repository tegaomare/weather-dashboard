//INDEPENDENCES
let cityInput = document.querySelector("city-input");
let searchBtn = document.querySelector("#Search-button");
let lat;
let lon;
let city = "staten island";
let apiKey = "a156ce36549069ae356f11172fc650e1";
let requestUrl2 =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=" +
  apiKey +
  "&units=imperial";
let requestUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
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
      console.log(data);
    });
  /*  if (response.status === 200) {
      responseText.textContent = response.status;
    }
    return response.json();*/

  getApi2();
}
function getApi2() {
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  /*  if (response.status === 200) {
      responseText.textContent = response.status;
    }
    return response.json();*/
}

getApi();
//for (i=0; i < somearray.lenght; i+=8) for url2
