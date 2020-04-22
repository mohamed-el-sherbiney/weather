const express = require("express");
const app = express();
const request = require("request");

//lets setup our server
app.listen(3000)

//chain html
app.use(express.static(__dirname + "/staticAssets"))

//create functions

//convert name of place to latitude and longitude in order to fetch forecast
function geocode (place,callback){
  var url = "https://eu1.locationiq.com/v1/search.php?key=00981d320527a6&q=" + place + "&format=json";
  var lat;
  var lon;
  request.get({url,json:true},(err,res) => {
    lat = res.body[0].lat;
    lon = res.body[0].lon;
    getTemp(lat,lon,callback);
  })
}

//convert latitude and longitude to forecast

function getTemp(lat,lon,callback){
  var url = "https://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" +lon+ "&appid=bc360853f1fa6db5038e58dad2233c48&units=metric";
  var temperature;
  var humidity;
  request.get({url,json:true}, (err,res) => {
    temperature = res.body.main.temp;
    humidity = res.body.main.humidity;
    callback(temperature,humidity);
  })
}

app.get("/weather",(req,res) => {
  if(!req.query.location){res.send("enter valid location")}
  else{
    geocode(req.query.location,function(temp,humid){res.send({temp,humid})})
  }
})
