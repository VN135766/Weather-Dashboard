// var latitude
// var longitude

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
        function pullWeather() {
          console.log(latitude)
          var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
          fetch(requestUrl)
          .then(function(response1) {
              return response1.json()
          }).then(function(data1) {
              console.log(data1)
          })
      }
      pullWeather();
    })
}

console.log(pullCoordinates());
// pullCoordinates()
// pullWeather(pullCoordinates());



// var pullCoordinates = function() {
//     var requestUrlLocation = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
//     fetch(requestUrlLocation)
//     .then(function(response) {
//         return response.json()
//     }).then(function(data) {
//         console.log(data);
//         var longitude = data.coord.lon
//         var latitude = data.coord.lat
//         console.log("longitude: " + longitude)
//         console.log("latitude: " + latitude)
//         return [longitude, latitude]
//     })

// }

// function pullWeather() {
//     var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + pullCoordinates[1] + '&lon=' + pullCoordinates[0] + '&appid=9d7ebf8b022f99c1559d4339ab5c60ee'
//     fetch(requestUrl)
//     .then(function(response1) {
//         return response1.json()
//     }).then(function(data1) {
//         console.log(data1)
//     })
// }

// console.log(pullCoordinates());
// ;