//INDEPENDENCES
let searchForm = document.getElementById("search-form");
let cityInput = document.getElementById("city-input");

//DATA
//USER INTERRACTION
//FUNCTION
let requestUrl =
  "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=a156ce36549069ae356f11172fc650e1";
let responseText = document.getElementById("response-text");

function getApi(requestUrl) {
  fetch(requestUrl).then(function (response) {
    console.log(response);
    if (response.status === 200) {
      responseText.textContent = response.status;
    }
    return response.json();
  });
}

getApi(requestUrl);
