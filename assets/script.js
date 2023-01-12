let apiKey = "a64546395beb5601577c4fae1c60f311";
// let cityID = response.data.id;
let forecastQueryURL =
  "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}"; //taken from documentation

//displays current day and time at the top of page

var searchForm = $("#form");

$(function () {
  var timeDisplay = $("#currentDay");
  function displayTime() {
    var rightNow = dayjs().format("dddd, MMM DD, YYYY");
    timeDisplay.text(rightNow);
  }

  displayTime();

  searchForm.on("submit", function (event) {
    event.preventDefault();
    function getWeather(forecastQueryURL) {
      fetch(forecastQueryURL)
        .then(function (response) {
          console.log(response.data);
          //  Conditional for the the response.status. checking to make sure the status is good
          if (response.status !== 200) {
            // Place the response.status on the page.
            responseText.textContent = response.status;
          }
          return response.json();
        })
        .then(function (data) {
          // // Make sure to look at the response in the console and read how 404 response is structured.
          // console.log(data.hits[0].recipe.label);
          // console.log(data); //when you start building the html in js
          // // below is the functions we deciced on jsut added as code
          // recipeArray.push(data.hits[0]);
        });
    }

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
    }
    // now append the new element to a parent element (here it's the form)
    searchForm.append(historyButton);

    //clear the form after you type a city
    $("#city-input").val("");

    //double check typos in cities and if we need a conditional ?

    //trying to add an event listneer to the newly appended city
    //so that we can eventually click the city and get the weather
    historyButton.on("click", function (event) {
      event.preventDefault();
      console.log(`search for ${cityListItem}`);
    });
  });
});
