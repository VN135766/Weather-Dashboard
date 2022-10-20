var userInputCity;
var previousSearches = [];
var weatherData = [];



$('#submitCityInput').on('click', function(event) {
  event.preventDefault()

  resetData();

  userInputCity = $('#cityInput').val();
  pullCoordinates();
})
function addPreviousSearchButton() {
  if (previousSearches.includes(userInputCity) === true) {
    return;
}
previousSearches.push(userInputCity)
  var divEl = $('<div>').addClass("hstack gap-3").attr('id','previous-search').on('click','#delete-button',function(event) {
    event.preventDefault()
    $(event.target).parent().remove()
  }).on('click',"[data-value]",function(event) {
    event.preventDefault();
    resetData();
    userInputCity = $(event.target).attr("data-value");
    pullCoordinates();
})
$('#previousSearchList').append(divEl
  .append(
    $('<button>').addClass("btn btn-primary container-fluid").attr("data-value", userInputCity).text(userInputCity),
      $('<div>').addClass("vr"),
      $('<button>').addClass("btn btn-outline-danger").attr('id','delete-button').text("Delete")
  )
)

}
function resetData() {
  $('section').empty();
  userInputCity="";
  weatherData= []
  currentWeatherData=""
}

function pullCoordinates() {
  var requestUrlLocation = 'https://api.openweathermap.org/data/2.5/weather?q='+userInputCity+'&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
    fetch(requestUrlLocation)
    .then(function(response) {
      if (response.status !== 200) {
        alert(userInputCity + " is not a valid city name.  Please enter a valid city name.");
        return
    }
        return response.json()
    }).then(function(data) {
        console.log(data);
        var longitude = data.coord.lon
        var latitude = data.coord.lat
        console.log("longitude: " + longitude)
        console.log("latitude: " + latitude)
        pullWeather(longitude, latitude);
    })
}

function pullWeather(longitude, latitude) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
  fetch(weatherUrl)
  .then(function(response) {
      return response.json()
  }).then(function(data) {
      console.log(data)
      var currentWeatherData = {
          weather: data.current.weather[0].main,
          icon: data.current.weather[0].icon,
          temp: data.current.temp,
          wind: data.current.wind_speed,
          humidity: data.current.humidity,
          uvindex: data.current.uvi,
    }
    weatherData.push(currentWeatherData)
    console.log(currentWeatherData)
    for(var i = 0; i < 5; i++) {
        var futureWeatherData = {
            weather: data.daily[i].weather[0].main,
            icon: data.daily[i].weather[0].icon,
            temp: data.daily[i].temp,
            wind: data.daily[i].wind_speed,
            humidity: data.daily[i].humidity,
        }
        weatherData.push(futureWeatherData)
    }
    console.log(weatherData)
    displayData()
    addPreviousSearchButton();
}) 
}
// var sectionEl = ('section')
function displayData() {
  var divEl = $('<div>')
  .addClass("col border mb-3")
  .append($('<h2>').text(userInputCity),
      "<img src=http://openweathermap.org/img/wn/"+weatherData[0].icon+"@2x.png>",
      $('<h2>').text("Current Temperature: " + weatherData[0].temp),
      $('<h2>').text("Wind Speed: " + weatherData[0].wind + " MPH"),
      $('<h2>').text("Humidity: " + weatherData[0].humidity),
      $('<h2>').text("UV Index: " + weatherData[0].uvindex),
  )
  $('section').append(divEl);
  var divEl1 = $('<div>').addClass("row gap-3")
  console.log(weatherData[1].temp)
  for (var i = 1; i <= 5; i++) {
      divEl1.append($('<div>').addClass("col bg-primary")
      .append("<img src=http://openweathermap.org/img/wn/"+weatherData[i].icon+".png>",
      $('<h5>').text("Temp min: " + weatherData[i].temp.min),
      $('<h5>').text("Temp max: " + weatherData[i].temp.max),
      $('<h5>').text("Wind: " + weatherData[i].wind + " MPH"),
      $('<h5>').text("Humidity: " + weatherData[i].humidity + " %"))
      )
  }
  $('section').append(divEl1);
}
