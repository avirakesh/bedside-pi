/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

var exports = module.exports = {};
var request = require('request');

exports.getWeather = function(location, apiKey, si, lang, res) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?" +
              "lat=" + location.lat +
              "&lon=" + location.lng +
              "&appid=" + apiKey +
              "&lang=" + lang +
              "&units=" + (si ? "metric" : "imperial") +
              "&exclude=minutely,hourly,daily";

    request(url, function(error, response, body) {
        if (error || response.statusCode != 200) {
            console.log("Weather Error: " + error);
            console.log("Staus Code: " + response.statusCode);
            res.send(JSON.stringify("{}"));
            return;
        }

        var json = JSON.parse(body);

        var out = {};
        out["temp"] = json["current"]["temp"];
        out["appTemp"] = json["current"]["feels_like"];
        out["sunrise"] = json["current"]["sunrise"];
        out["sunset"] = json["current"]["sunset"];

        var weather_ids = [];
        var weathers = [];
        response_weathers = json["current"]["weather"];

        for (var weather of response_weathers) {
            weathers.push(weather["description"]);
            weather_ids.push(weather["id"]);
        }

        out["weather"] = weathers;
        out["weather_id"] = weather_ids;

        if (json["current"]["rain"] && json["current"]["rain"]["1h"]) {
            out["precip"] = json["current"]["rain"]["1h"];
        } else if (json["current"]["snow"] && json["current"]["snow"]["1h"]) {
            out["precip"] = json["current"]["snow"]["1h"];
        }

        if (json["alerts"]) {
            var alerts = []
            for (var alert of json["alerts"]) {
                alerts.push(alert["event"])
            }
        }

        res.contentType("application/json");
        res.send(JSON.stringify(out));
    });
}
