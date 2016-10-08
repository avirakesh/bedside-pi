var express = require('express');
var port = 8080; // default = 8080 
				 // change to 80 if you don't want to type ':8080' at the end.
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
    weather.getWeather(prefs.latlng, prefs.apiKey, prefs.siUnits, res);
});

/*
For Future!

app.get('/clear-notif', function (req, res){
    clearNotif.clearNotifications(res, io);
});*/

app.get('/reset-notifications.php', function (req, res) {
	clearNotif.clearNotifications(res, io);
});

app.post('/set-notifications.php', function (req, res) {
    setNotifs.setNotifications(req.body, res, io);
});

app.get('/get-notifications.php', function(req, res) {
	getNotifs.getNotifications(res, io);
});

app.use('/assets', express.static('assets'));

io.on('connection', function(socket) {
	console.log('Connection Established');

	socket.emit('update_notifs');

	socket.on('disconnect', function() {
		console.log('Connection Removed')
	});
});

http.listen(8080, function() {
    console.log ('Server running at port 8080');
});
