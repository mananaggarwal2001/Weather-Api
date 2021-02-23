const express = require('express');

const app = express();

const https = require('https');
const bodyparser = require("body-parser");


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=062798097c085e918908ddb409a14c57&units=metric";
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const variable = JSON.parse(data);
            console.log(variable);

            var desc = variable.main.temp;
            // console.log(desc);
            var weatherDescription = variable.weather[0].description;
            var weatherIcon = variable.weather[0].icon;
            let latitude = variable.coord.lat;
            let longitude = variable.coord.lon;

            let cityName = variable.name;
            let countryName = variable.sys.country;

            // case 'nameFormat'{
            //
            // break;
            // }
            //



            res.send("<h1>The Temprature of the " + query + "  is: " + desc + "</h1>" + "\n" + "The Weather Condition in " + query + " is " + weatherDescription); // res is used for the response to the client site.
        })
    })
});

app.listen(3000, function() {
    console.log("Server is Running on listening on port 3000");
})