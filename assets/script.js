// let apiKey = "a64546395beb5601577c4fae1c60f311";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

//displays current day and time at the top of page
var timeDisplay = $("#currentDay");
function displayTime() {
  var rightNow = dayjs().format("dddd, MMM DD, YYYY");
  timeDisplay.text(rightNow);
}

displayTime();
