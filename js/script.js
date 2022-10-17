var userInputCity
var weatherData
var currentWeather

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
        function pullWeather() {
          console.log(latitude)
          var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
          fetch(requestUrl)
          .then(function(response1) {
              return response1.json()
          }).then(function(data1) {
              console.log(data1)
              currentWeather = {
                temp: data1.current.temp,
                wind: data1.current.wind_speed,
                humidity: data1.current.humidity,
                uvindex: data1.current.uvi,
            }
            console.log(currentWeather)
        }) 
      }
      pullWeather();
    })
}

var pullCoordinates = function() {
  var requestUrlLocation = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
  fetch(requestUrlLocation)
  .then(function(response) {
      return response.json()
  }).then(function(data) {
      console.log(data);
      var longitude = data.coord.lon
      var latitude = data.coord.lat
      console.log("longitude: " + longitude)
      console.log("latitude: " + latitude)
      return [latitude,longitude]
  })

}

function pullWeather() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + pullCoordinates[1] + '&lon=' + pullCoordinates[0] + '&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
  fetch(requestUrl)
  .then(function(response1) {
      return response1.json()
  }).then(function(data1) {
      console.log(data1)
  })
}

console.log(pullCoordinates());