const express = require("express");
const https = require("https");
const bodyParser  = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {

res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "5f50c4b117ff26f069b20349a603ad8c";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +"";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescript = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon[2];
      const imageURL = "https://openweathermap.org/img/wn/02d@2x.png";
      res.write("<h1>Temperaturata e " + temp + " stepeni!</h1>");
      res.write("<p>Vremeto e " + weatherDescript + "</p>");
      res.write("<img src=" + imageURL +"></>");
      res.send();
    });
  });
});



app.listen(3000, function() {
    console.log("rabote");
});
