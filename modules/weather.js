var exports = module.exports = {};
var request = require('request');

exports.getWeather = function(latlng, apiKey, si, res) {
    var url = "https://api.forecast.io/forecast/" + apiKey + "/" + latlng;

    if (si) {
	url = url + "?units=si";
    }

    var json;
    request(url, function (error, response, body) {
	if (error) {
	    console.log(error);
	}
	json = JSON.parse(body);

	var current = json['currently'];

	var out = {};
	out['summary'] = current['summary'];
	out['icon'] = current['icon'];
	out['precipProbability'] = current['precipProbability'];
	out['temp'] = current['temperature'];
	out['appTemp'] = current['apparentTemperature'];

	res.contentType('application/json');
	res.send(JSON.stringify(out));
    
    });
}