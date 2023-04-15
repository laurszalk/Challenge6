var apiKey = "a64546395beb5601577c4fae1c60f311";
var apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=" +
  apiKey;

var cityEl = document.querySelector("#current-city");
var temperatureEl = document.querySelector("#temperature");
var descriptionEl = document.querySelector("#description");
var windEl = document.querySelector("#wind-speed");
var humidityEl = document.querySelector("#humidity");
var searchForm = document.querySelector("#form");

function getWeather() {
  fetch(apiUrl)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(function (data) {
      console.log(data);

      cityEl.textContent = data.name;
      temperatureEl.innerHTML = Math.round(data.main.temp) + "°F";
      descriptionEl.innerHTML = data.weather[0].description;
      windEl.textContent = "Wind: " + data.wind.speed + " MPH";
      humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    });
}

getWeather();

//displays current day at the top of page
var timeDisplay = $("#currentDay");
function displayTime() {
  var rightNow = dayjs().format("dddd, MMM DD, YYYY");
  timeDisplay.text(rightNow);
}

displayTime();

//search a city when you click the search button
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var city = $("#city-input").val();

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;
});
