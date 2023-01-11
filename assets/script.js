// let apiKey = "a64546395beb5601577c4fae1c60f311";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

//displays current day and time at the top of page
var button = $(".btn");

$(function () {
  var timeDisplay = $("#currentDay");
  function displayTime() {
    var rightNow = dayjs().format("dddd, MMM DD, YYYY");
    timeDisplay.text(rightNow);
  }

  displayTime();

  //i need to add the fetch I think onto this click event

  button.click(function (event) {
    event.preventDefault();
    console.log("Does this work?");
  });

  //click event on button to display the previously searched cities on the webapge
  //need to capture the input text and display on page
  // button.click(function () {
  //   var cityListItem = $("#city-input").val();
  //   $("form").append("<input />").attr("value", cityListItem);

  button.click(function () {
    // get the city name
    var cityListItem = $("#city-input").val();

    // create a new input element and set attributes
    const newInput = $("<input>")
      .attr("value", cityListItem)
      .attr("type", "submit")
      .attr("class", "form-control shadow-sm");

    // now append the new element to a parent element (here it's the form)
    $("form").append(newInput);

    //clear the form after you type a city
    $("#city-input").val("");
  });
});
