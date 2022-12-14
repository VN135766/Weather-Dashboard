var userInputCity;          //stores users city input
var previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];  //search history

var weatherData = [];       //weather data API call results

$('#submitCityInput').on('click', function(event) {     //form submission
  event.preventDefault();

  resetData();    //clears userInputCity and weather vars
  userInputCity = $('#cityInput').val();      //returns value of what user inputted to variable
  pullCoordinates();
  $('#cityInput').val('');
  submitCity()
})

displayForPageLoad();
function displayForPageLoad() {
    if(previousSearches.length >= 1) {
    renderPreviousSearches()
    userInputCity = previousSearches[0]
    submitCity()
    }
}

function submitCity() {
  if (userInputCity) {
    userInputCity = userInputCity.charAt(0).toUpperCase() + userInputCity.substr(1)     //converts first letter to uppercase
  }
  if (userInputCity.includes(" ")) {    var userInputCityArray = userInputCity.split(" ")
  for(let i = 0; i < userInputCityArray.length; i++) {
        userInputCityArray[i] = userInputCityArray[i][0].toUpperCase() 
        + userInputCityArray[i].substr(1);
    }
    userInputCity = userInputCityArray.join(" ")    //if input is more than 1 word, first letter of each word is made uppercase
  }
});
renderPreviousSearches()
function renderPreviousSearches() {
    if (previousSearches != []) {
        console.log("there are saved searches")
        for (var i = 0;i<previousSearches.length; i++) {
            var previousSearchItem = previousSearches[i]
            var divEl = $('<div>').addClass("hstack gap-3").attr('id','previous-search')
            .on('click','#delete-button',function(event) { //DELETE BUTTON event delegation--adds event listener to button before appending
                event.preventDefault()
                $(event.target).parent().remove()
                previousSearchItem = $(event.target).attr("data-value")  //utilizing data attribute storage
                previousSearches.splice(previousSearches.indexOf(previousSearchItem),1)  //removes search from previousSearch array
                console.log(previousSearches)
                localStorage.setItem("previousSearches", JSON.stringify(previousSearches))
            }).on('click',"#city-button",function(event) { //CITY BUTTON event delegation--adds event listener to button before appending
                event.preventDefault();
                resetData();        //clears vars so a new call can store new info
                userInputCity = $(event.target).attr("data-value"); //utilizing data attribute storage
                pullCoordinates();  //API call to city clicked
            })
            $('#previousSearchList').append(divEl   //appends buttons to search history
                .append(
                    $('<button>').addClass("btn btn-primary container").attr('id','city-button').attr("data-value", previousSearches[i]).text(previousSearches[i]),
                    $('<div>').addClass("vr"),
                    $('<button>').addClass("btn btn-outline-danger").attr('id','delete-button').attr("data-value", previousSearches[i]).text("Delete")
                )
            ) 
        }
    }
}

function addPreviousSearchButton() {    //function appends previous search history buttons to page
  if (previousSearches.includes(userInputCity) === true) {
    return;                         //prevents duplicates cities from being added to history
  }
  previousSearches.push(userInputCity)//if search is new, then add value to previousSearch array
    var divEl = $('<div>').addClass("hstack gap-3").attr('id','previous-search')
    .on('click','#delete-button',function(event) { //DELETE BUTTON event delegation--adds event listener to button before appending
      event.preventDefault();
      $(event.target).parent().remove();
      userInputCity = $(event.target).attr("data-value")  //utilizing data attribute storage
      previousSearches.splice(previousSearches.indexOf(userInputCity),1)  //removes search from previousSearch array
      console.log(previousSearches)
      localStorage.setItem("previousSearches", JSON.stringify(previousSearches))  }).on('click',"#city-button",function(event) { //CITY BUTTON event delegation--adds event listener to button before appending
      event.preventDefault();
      console.log("click!");
      resetData();        //clears vars so a new call can store new info
      userInputCity = $(event.target).attr("data-value"); //utilizing data attribute storage
      pullCoordinates();  //API call to city clicked
    });
    $('#previousSearchList').append(divEl   //appends buttons to search history
    .append(
      $('<button>').addClass("btn btn-primary container").attr('id','city-button').attr("data-value", userInputCity).text(userInputCity),

      $("<div>").addClass("vr"),
      $("<button>")
        .addClass("btn btn-outline-danger")
        .attr("id", "delete-button")
        .attr("data-value", userInputCity)
        .text("Delete")
    )
  );
  localStorage.setItem("previousSearches", JSON.stringify(previousSearches))
  console.log(previousSearches)
}
function resetData() {
  $('section').empty();   //removes all previous weather display

  userInputCity = "";
  weatherData = [];
  currentWeatherData = "";
}

function pullCoordinates() {
  var requestUrlLocation = 'https://api.openweathermap.org/data/2.5/weather?q='+userInputCity+'&appid=9d7ebf8b022f99c1559d4339ab5c60ee'   //includes city input from user and api key -- fetch data to get latitude and longitude of input location 

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
  .addClass("col border mb-3 rounded text-center text-lg-start px-3 mt-3 mt-xl-0")
  .append($('<div>').addClass("d-flex align-items-center gap-4 justify-content-center justify-content-lg-start").append($('<h2>').addClass('fw-bolder').text(userInputCity),
    $('<h2>').addClass("fw-bold")
    .text(moment().format("MM/DD/YYYY")),
        "<img src=http://openweathermap.org/img/wn/"+weatherData[0].icon+"@2x.png>"),
        $('<h2>').text("Current Temperature: " + weatherData[0].temp+ " ??F"),
      $("<h2>").text("Wind Speed: " + weatherData[0].wind + " MPH"),
      $('<h2>').text("Humidity: " + weatherData[0].humidity+ " %"),
      $('<div>').addClass('d-flex justify-content-center justify-content-lg-start gap-2 align-items-center').append($('<h2>').text("UV Index: "), 
      ($('<h2>')).attr('id','uvindex').text(weatherData[0].uvindex),)
    );
  $("section").append(divEl);
  uvIndexColor()
  $('section').append($('<h2>').addClass("text-center text-lg-start").text("5 Day Forecast"))
  var divEl1 = $('<div>').addClass("d-flex flex-wrap gap-3 text-white")
  console.log(weatherData[1].temp);
  for (var i = 1; i <= 5; i++) {
    divEl1.append($('<div>').addClass("col p-3 bg-primary rounded")
    .append($('<div>').addClass("d-flex align-items-end justify-content-between")
    .append($('<h4>').addClass('fw-bold').text(moment().add(i, 'd').format("MM/DD/YYYY")),
        "<img src=http://openweathermap.org/img/wn/"+weatherData[i].icon+".png>"),
        $('<hr>').addClass("py-1 custom-margins container"),
        $('<h5>').text("Temp min: " + weatherData[i].temp.min + " ??F"),
        $('<h5>').text("Temp max: " + weatherData[i].temp.max+ " ??F"),
        $('<h5>').text("Wind: " + weatherData[i].wind + " MPH"),
        $('<h5>').text("Humidity: " + weatherData[i].humidity + " %")
        )
    );
  }
  $("section").append(divEl1);
}
function uvIndexColor() {
  if (weatherData[0].uvindex >= 0 && weatherData[0].uvindex < 2) {
      $('#uvindex').attr('class','favorable')
      console.log("favorable uvindex")
  }
  else if (weatherData[0].uvindex >= 2 && weatherData[0].uvindex < 5) {
      $('#uvindex').attr('class','moderate')
      console.log("moderate uvindex")
  }
  else if (weatherData[0].uvindex >= 5) {
      $('#uvindex').attr('class','severe')
      console.log("severe uvindex")
  }
}
