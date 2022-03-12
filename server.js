/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

var express = require('express');
var port = 8080; // default = 8080
                 // change to 80 if you don't want to type ':8080' at the end.
var app = express();
var http = require('http').Server(app);

var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({
    extended: false
});

var weather = require('./modules/weather.js');
var prefs = require('./modules/prefs.js');
var clearNotif  = require('./modules/clear-notif.js');
var setNotifs  = require('./modules/set-notifications.js');
var getNotifs = require('./modules/get-notifications.js');

app.use(urlEncodedParser);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/get-weather', function(req, res) {
    weather.getWeather(prefs.location, prefs.apiKey, prefs.siUnits, prefs.lang, res);
});

app.get('/check-connection.php', function(req, res) {
	res.send('"Success"');
});

app.use('/assets', express.static('assets'));
app.use('/', express.static('assets'));

http.listen(port, function() {
    console.log ('Server running at port ' + port);
});
