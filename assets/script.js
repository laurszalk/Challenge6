var apiKey = "a64546395beb5601577c4fae1c60f311";
var searchForm = $("#form");
var weatherDisplay = document.getElementById("five-day-forecast");

//displays current day at the top of page
var timeDisplay = $("#currentDay");
function displayTime() {
  var rightNow = dayjs().format("dddd, MMM DD, YYYY");
  timeDisplay.text(rightNow);
}

displayTime();

searchForm.on("submit", function (event) {
  event.preventDefault();
  var city = $("#city-input").val();

  var forecastQueryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  getWeather(forecastQueryUrl);

  //the event handler submit is what's creating the button and then we attach the event to it
  // get the city name
  var cityListItem = $("#city-input").val();
  if (cityListItem === "") {
    alert("Please enter a city");
  } else {
    // create a new button element and set attributes
    var historyButton = $(`<button>${cityListItem}</button>`) //using template literals in place of concatenation
      .attr("type", "button")
      .attr("class", "w-100 btn btn-primary");
    // display the weather dashboard
    weatherDisplay.classList.remove("hide");
  }
  // now append the new element to a parent element (here it's the form)
  searchForm.append(historyButton);

  //clear the form after you type a city
  $("#city-input").val("");

  //add click event to the newly appended city
  //so that we can click the city and get the weather
  historyButton.on("click", function (event) {
    cityListItem = event.target.innerText;
    event.preventDefault();
    console.log(cityListItem);
    $("#city-input").val(cityListItem);
    forecastQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityListItem +
      "&appid=" +
      apiKey;

    getWeather(forecastQueryUrl);
  });
});

function getWeather(forecastQueryUrl) {
  //the forecast queryUrl is the endpoint for the api
  //browser only understands string data types (JSON and javascript)
  //fetch is built into the browser for us
  //response is a promise, we don't know how long it will take to fulfill
  fetch(forecastQueryUrl)
    //callback function, we call it after some other operation happens
    .then(function (response) {
      console.log(response);

      //  Conditional for the the response.status; checking to make sure the status is good
      if (response.status === 200) {
        //need to pass this information to the next .then
        //the first .then needs to complete before the next .then
        //.json() returns the json object and converts it to javascript object
        //in json the keys and values are both strings
        return response.json();
      } else {
        // if the status is not 200, then we throw an error
        throw new Error("Something went wrong");
      }
    })
    //the response object in javascript format from line 76
    //we need to pull out the info we need from data- data is our js object
    .then(function (data) {
      console.log(data);
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      var currentWeatherUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;

      console.log(lat);
      console.log(lon);

      fetch(currentWeatherUrl).then(function (response) {
        console.log(response);

        //  Conditional for the the response.status; checking to make sure the status is good
        if (response.status === 200) {
          //need to pass this information to the next .then
          //the first .then needs to complete before the next .then
          //.json() returns the json object and converts it to javascript object
          //in json the keys and values are both strings
          return response.json();
        } else {
          // if the status is not 200, then we throw an error
          throw new Error("Something went wrong");
        }
      });
    });
  console.log("i am after the fetch request");
}

//will need to store and retrieve to local storage can do it last
//take results of data and write it to forecast
//need to add ids to html
//remember i+=7 for results
