var apiKey = "a64546395beb5601577c4fae1c60f311";
// var apiUrl =
//   "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=" +
//   apiKey;

var cityInput = document.querySelector("#city-input");
var temperatureEl = document.querySelector("#temperature");
var descriptionEl = document.querySelector("#description");
var windEl = document.querySelector("#wind-speed");
var humidityEl = document.querySelector("#humidity");
var iconEl = document.querySelector("#current-icon");
var searchForm = document.querySelector("#form");
var currentCityEl = document.querySelector("#current-city");

function getWeather() {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`;
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

      currentCityEl.textContent = data.name;
      temperatureEl.innerHTML = Math.round(data.main.temp) + "°F";
      descriptionEl.innerHTML = data.weather[0].description;
      windEl.textContent = "Wind: " + data.wind.speed + " MPH";
      humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
      iconEl.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  if (cityInput.value === "") {
    alert("Please enter a city");
  } else {
    var historyButton = document.createElement("button");
    historyButton.innerHTML = cityInput.value;
    historyButton.setAttribute("class", "w-100 btn btn-primary");
    // // now append the new element to a parent element (here it's the form)
    searchForm.append(historyButton);

    getWeather(cityInput);
  }
  //clear the form after you type a city
  $("#city-input").val("");
}

//displays current day at the top of page
var timeDisplay = $("#currentDay");
function displayTime() {
  var rightNow = dayjs().format("dddd, MMM DD, YYYY");
  timeDisplay.text(rightNow);
}

displayTime();

//search a city when you click the search button
searchForm.addEventListener("submit", handleFormSubmit);

//need to add when you click history button
