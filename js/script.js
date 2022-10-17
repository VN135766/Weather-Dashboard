var userInputCity
var currentWeatherData

var weatherData = []
$('#submitCityInput').on('click', function() {
  console.log("click!")
  userInputCity = $('#cityInput').val();
  console.log(userInputCity)
  pullCoordinates()
})

function pullCoordinates() {
  var requestUrlLocation = 'https://api.openweathermap.org/data/2.5/weather?q='+userInputCity+'&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
    fetch(requestUrlLocation)
    .then(function(response) {
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
            temp: data.daily[i].temp,
            wind: data.daily[i].wind_speed,
            humidity: data.daily[i].humidity,
        }
        weatherData.push(futureWeatherData)
    }
    console.log(weatherData)
    displayData()
}) 
}
// var sectionEl = ('section')
function displayData() {
  var divEl = $('<div>')
  .addClass("col border mb-3")
  .append($('<h2>').text(userInputCity),
  $('<h2>').text(weatherData[0].temp),
  $('<h2>').text(weatherData[0].wind_speed),
  $('<h2>').text(weatherData[0].humidity),
  $('<h2>').text(weatherData[0].uvindex),
  )
  $('section').append(divEl)
}