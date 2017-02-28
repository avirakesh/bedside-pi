/*
* ----------------------------------------------------------------------------
* "THE BEER-WARE LICENSE" (Revision 42):
* AvichalRakesh wrote this file.  As long as you retain this notice you
* can do whatever you want with this stuff. If we meet some day, and you think
* this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
* ----------------------------------------------------------------------------
*/


var h = -1;
var m = -1;
var s = -1;
var day = -1;
var date = -1;
var month = -1;
var year = -1;

var weatherInterval = 10; /* Set weather refresh interval (in minutes) */
var lastWeather = 0; 

$(function () {
	var socket = io();

	socket.on('update_notifs', function() {
		updateNotif();
	});

	$('.weather-container').click(function() {
		updateWeather();
	});

	startTime();
});

function startTime() {
	var today = new Date();

	var hh = today.getHours();
	var mm = today.getMinutes();
	var ss = today.getSeconds();

	if (h != hh) {
		h = hh;
		hh = checkAMPM();
		$('#hours').text(checkTime(hh));

		updateDate(today);
	}

	if (m != mm) {
		m = mm;
		$('#minutes').text(checkTime(m));

	// To remove weather, comment out from here... 
	if (lastWeather == 0) {
		updateWeather();
	}

	lastWeather = (lastWeather + 1) % weatherInterval;
	// ... to here 
	}

	if (s != ss) {
		s = ss;
		$('#seconds').text(checkTime(s));

		document.title = checkTime(h) + ':' + checkTime(m) + ':' + checkTime(s);
	}

	t = setTimeout(function() {
		startTime();
	}, 200);
}

function checkAMPM () {
	if (h >= 12) {
		$('#am-pm').text("PM")
		return h > 12 ? h - 12 : h;
	} else {
		$('#am-pm').text("AM")
		return h == 0 ? 12 : h;
	}
}

function checkTime (i) {
	return (i < 10) ? "0" + i : i;
}

function updateDate(today) {
	var currentDate = today.getDate();

	if (date != currentDate) {
		date = currentDate;
		$('#date').text(checkTime(date));

		var currentDay = today.getDay();
		if (currentDay != day) {
			day = currentDay;
			setDay();
		}

		var currentMonth = today.getMonth();
		if (month != currentMonth) {
			month = currentMonth;
			setMonth();
		}

		var currentYear = today.getFullYear();
		if (currentYear != year) {
			year = currentYear;
			$('#year').text(year);
		}
	}
}

function setDay() {
	switch (day) {
		case 0:
			$('#day').text("Sun,");
			break;
		case 1:
			$('#day').text("Mon,");
			break;
		case 2:
			$('#day').text("Tue,");
			break;
		case 3:
			$('#day').text("Wed,");
			break;
		case 4:
			$('#day').text("Thu,");
			break;
		case 5:
			$('#day').text("Fri,");
			break;
		case 6:
			$('#day').text("Sat,");
			break;
	}
}

function setMonth() {
	switch (month) {
		case 0:
			$('#month').text("Jan");
			break;
		case 1:
			$('#month').text("Feb");
			break;
		case 2:
			$('#month').text("Mar");
			break;
		case 3:
			$('#month').text("Apr");
			break;
		case 4:
			$('#month').text("May");
			break;
		case 5:
			$('#month').text("Jun");
			break;
		case 6:
			$('#month').text("Jul");
			break;
		case 7:
			$('#month').text("Aug");
			break;
		case 8:
			$('#month').text("Sep");
			break;
		case 9:
			$('#month').text("Oct");
			break;
		case 10:
			$('#month').text("Nov");
			break;
		case 11:
			$('#month').text("Dec");
			break;
	}
}

function updateWeather() {

	// console.log(url);

	$.ajax({
		url: 'http://' + window.location.host + '/get-weather',
		success: function (data) {
			// console.log(data);
			parseWeather(data);
		}
	}); 
}

function parseWeather(data) {
	if (data != '{}'){
		// console.log(data);
		$('.weather-summary-div').text(data['summary']);
		$('.weather-icon').html('<i class="wi wi-forecast-io-' + data['icon'] + '"></i>');
		if (data['precipProbability'] == 0) {
			$('.preci-prob-span').text("0%");
		} else {
			$('.preci-prob-span').text(Math.round(data['precipProbability'] * 100) + "%");
		}
		$('.temp-span').text(data['temp']);
		$('.feels-like-span').text(data['appTemp']);

		var timestamp = Math.round(Date.now() / 1000);

		var imgUrl = 'assets/images/weather';
		if (timestamp > data['sunrise'] && timestamp < data['sunset']) {
			imgUrl = imgUrl + '/day/';
		} else {
			imgUrl = imgUrl + '/night/';
		}

		imgUrl = imgUrl + data['icon'] + '.jpg'; 

		if ($('.shown').attr('src') != imgUrl) {
			$('.hidden').attr('src', imgUrl);
			$('.background-img').toggleClass('hidden');
			$('.background-img').toggleClass('shown');
		}

		if (data['alerts']) {
			var html = '';
			for (var i = 0; i < data['alerts'].length; i++) {
				html += '<div>' + 
						'<span class="alert-sign">!</span>' +
						'<span class="alert-text">' + data['alerts'][i] + '</span>' +
						'</div>';
			}
			$('.alerts-div').html(html);
            $('.alerts-div').show();
		} else {
			$('.alerts-div').hide();
			$('.alerts-div').html('');
		}
	}

}

function updateNotif() {
	$.ajax({
		url: 'http://' + window.location.host + '/get-notifications.php',
		success: function(data) {
			// console.log(data);
			parseNotif(data);
		}
	});
}

function parseNotif (data) {
	//console.log("Data: " + data);
	var html = '';
	var time = Math.round(Date.now() / 1000);
	for (var i = 0; i < data.length; i++) {
		// console.log(data[i]['package']);
		html += '<li class="notif-list-item"><img class="notif-image" src="assets/images/' + data[i]['package'] + '.png?' + time + '"></li>'
	}

	$('.notif-list').html(html);
}
