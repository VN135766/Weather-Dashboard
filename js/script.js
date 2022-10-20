var userInputCity;
var previousSearches = [];
var weatherData = [];

$("#submitCityInput").on("click", function (event) {
  event.preventDefault();

  resetData();

  userInputCity = $("#cityInput").val();
  pullCoordinates();
});
function addPreviousSearchButton() {
  if (previousSearches.includes(userInputCity) === true) {
    return;
  }
  previousSearches.push(userInputCity);
  var divEl = $("<div>")
    .addClass("hstack gap-3")
    .attr("id", "previous-search")
    .on("click", "#delete-button", function (event) {
      event.preventDefault();
      $(event.target).parent().remove();
      userInputCity = $(event.target).attr("data-value");
      previousSearches.splice(previousSearches.indexOf(userInputCity, 1));
    })
    .on("click", "#city-button", function (event) {
      event.preventDefault();
      console.log("click!");
      resetData();
      userInputCity = $(event.target).attr("data-value");
      pullCoordinates();
    });
  $("#previousSearchList").append(
    divEl.append(
      $("<button>")
        .addClass("btn btn-primary container-fluid")
        .attr("id", "city-button")
        .attr("data-value", userInputCity)
        .text(userInputCity),
      $("<div>").addClass("vr"),
      $("<button>")
        .addClass("btn btn-outline-danger")
        .attr("id", "delete-button")
        .attr("data-value", userInputCity)
        .text("Delete")
    )
  );
}
function resetData() {
  $("section").empty();
  userInputCity = "";
  weatherData = [];
  currentWeatherData = "";
}

function pullCoordinates() {
  var requestUrlLocation =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInputCity +
    "&appid=9d7ebf8b022f99c1559d4339ab5c60ee";
  fetch(requestUrlLocation)
    .then(function (response) {
      if (response.status !== 200) {
        alert(
          userInputCity +
            " is not a valid city name.  Please enter a valid city name."
        );
        return;
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var longitude = data.coord.lon;
      var latitude = data.coord.lat;
      console.log("longitude: " + longitude);
      console.log("latitude: " + latitude);
      pullWeather(longitude, latitude);
    });
}

function pullWeather(longitude, latitude) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=imperial&appid=9d7ebf8b022f99c1559d4339ab5c60ee";
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentWeatherData = {
        weather: data.current.weather[0].main,
        icon: data.current.weather[0].icon,
        temp: data.current.temp,
        wind: data.current.wind_speed,
        humidity: data.current.humidity,
        uvindex: data.current.uvi,
      };
      weatherData.push(currentWeatherData);
      console.log(currentWeatherData);
      for (var i = 0; i < 5; i++) {
        var futureWeatherData = {
          weather: data.daily[i].weather[0].main,
          icon: data.daily[i].weather[0].icon,
          temp: data.daily[i].temp,
          wind: data.daily[i].wind_speed,
          humidity: data.daily[i].humidity,
        };
        weatherData.push(futureWeatherData);
      }
      console.log(weatherData);
      displayData();
      addPreviousSearchButton();
    });
}
// var sectionEl = ('section')
function displayData() {
  var divEl = $("<div>")
    .addClass("col border mb-3 rounded")
    .append($('<div>').addClass("d-flex align-items-center gap-4").append($('<h2>').addClass('fw-bold').text(userInputCity),
        $('<h2>').addClass("fw-bold").text(moment().format("MM/DD/YYYY")),
        "<img src=http://openweathermap.org/img/wn/"+weatherData[0].icon+"@2x.png>"),
        $('<h2>').text("Current Temperature: " + weatherData[0].temp+ " °F"),
      $("<h2>").text("Wind Speed: " + weatherData[0].wind + " MPH"),
      $('<h2>').text("Humidity: " + weatherData[0].humidity+ " %"),
      $("<h2>").text("UV Index: " + weatherData[0].uvindex)
    );
  $("section").append(divEl);
  var divEl1 = $('<div>').addClass("row gap-3 text-white")
  console.log(weatherData[1].temp);
  for (var i = 1; i <= 5; i++) {
    divEl1.append($('<div>').addClass("col bg-primary rounded")

    .append($('<div>').addClass("d-flex align-items-center justify-content-between gap-4")
    .append($('<h4>').addClass('fw-bold').text(moment().add(i, 'd').format("MM/DD/YYYY")),
        "<img src=http://openweathermap.org/img/wn/"+weatherData[i].icon+".png>"),
        $('<hr>').addClass("py-1 custom-margins"),
        $('<h5>').text("Temp min: " + weatherData[i].temp.min + " °F"),
        $('<h5>').text("Temp max: " + weatherData[i].temp.max+ " °F"),
        $('<h5>').text("Wind: " + weatherData[i].wind + " MPH"),
        $('<h5>').text("Humidity: " + weatherData[i].humidity + " %")
        )
    );
  }
  $("section").append(divEl1);
}

console.log(moment().format("MM/DD/YYYY"))
console.log(moment().add(1, 'd').format("MM/DD/YYYY"))
console.log(moment().add(2, 'd').format("MM/DD/YYYY"))
console.log(moment().add(3, 'd').format("MM/DD/YYYY"))
console.log(moment().add(4, 'd').format("MM/DD/YYYY"))
console.log(moment().add(5, 'd').format("MM/DD/YYYY"))