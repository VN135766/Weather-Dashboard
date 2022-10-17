var userInputCity
var weatherData


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
  var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
  fetch(requestUrl)
  .then(function(response1) {
      return response1.json()
  }).then(function(data1) {
      console.log(data1)
      weatherData = {
        temp: data1.current.temp,
        wind: data1.current.wind_speed,
        humidity: data1.current.humidity,
        uvindex: data1.current.uvi,
    }
    console.log(currentWeather)
}) 
}

function displayData() {

}