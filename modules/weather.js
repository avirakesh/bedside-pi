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

exports.getWeather = function(latlng, apiKey, si, lang, res) {
    var url = "https://api.forecast.io/forecast/" + apiKey + "/" + latlng + "?lang=" + lang;

    if (si) {
        url = url + "&units=si";
    }

    var json;
    request(url, function (error, response, body) {
        if (error || response.statusCode != 200) {
            console.log('Weather Error: ' + error);
            res.contentType('application/json');
            res.send(JSON.stringify('{}'));
        } else {
            json = JSON.parse(body);

            var current = json['currently'];

            var out = {};
            out['summary'] = current['summary'];
            out['icon'] = current['icon'];
            out['precipProbability'] = current['precipProbability'];
            out['temp'] = current['temperature'];
            out['appTemp'] = current['apparentTemperature'];
            out['sunrise'] = json['daily']['data'][0]['sunriseTime'];
            out['sunset'] = json['daily']['data'][0]['sunsetTime'];
            if (json['alerts']) {
                var raw_alerts_list = json['alerts'];
                // console.log(raw_alerts_list);
                var alerts = new Array();
                for (var i = 0; i < raw_alerts_list.length; i++) {
                    var alert_title = raw_alerts_list[i]['title'];
                    if (!alerts.includes(alert_title)) {
                        alerts.push(alert_title);
                    }
                }
                out['alerts'] = alerts;
            }

            res.contentType('application/json');
            res.send(JSON.stringify(out));

        }
    });
}
