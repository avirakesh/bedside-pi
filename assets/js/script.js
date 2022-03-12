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
var clock24hrs = false; /* Change to true for 24 hr clock */

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(function () {
	$('.weather-container').click(function() {
		updateWeather();
	});

	if (clock24hrs) {
		$('#am-pm').hide();
	}
	startTime();
});

function startTime() {
	var today = new Date();

	var hh = today.getHours();
	var mm = today.getMinutes();
	var ss = today.getSeconds();

	if (h != hh) {
		h = hh;
		if (!clock24hrs) {
			hh = checkAMPM();
			$('#hours').text(checkTime(hh));
		} else {
			$('#hours').text(checkTime(hh));
		}

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
	$('#day').text(days[day] + ",")
}

function setMonth() {
	$('#month').text(months[month]);
}

function updateWeather() {
	$.ajax({
		url: 'http://' + window.location.host + '/get-weather',
		success: function (data) {
			parseWeather(data);
		}
	});
}

function parseWeather(data) {
	if (data != '{}'){
		// console.log(data);
		$('.weather-summary-div').text(getWeatherSummary(data['weather']));

		var timestamp = Math.round(Date.now() / 1000);
		var isDay = timestamp > data['sunrise'] && timestamp < data['sunset'];

		$('.weather-icon').html(generateIconSpans(data["weather_id"], isDay));
		if (data['precip']) {
			$('.preci-span').text(data['precip'] + ' mm');
			$('.preci-div').show()
		} else {
			$('.preci-div').hide()
		}

		$('.temp-span').text(data['temp']);
		$('.feels-like-span').text(data['appTemp']);

		imgUrl = mapWeatherIdToBackgroundImage(data["weather_id"], isDay);

		if ($('.shown').attr('src') != imgUrl) {
			$('.hidden').attr('src', imgUrl);
			$('.background-img').toggleClass('hidden');
			$('.background-img').toggleClass('shown');
		}

		if (data['alerts']) {
			var html = '';
			for (var alert of data['alerts']) {
				html += '<div>' +
						'<span class="alert-sign">!</span>' +
						'<span class="alert-text">' + alert + '</span>' +
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

function generateIconSpans(weatherIds, isDay) {
	var html = "";
	for (var weatherId of weatherIds) {
		html += '<i class="wi wi-owm-' + (isDay ? 'day-' : 'night-') + weatherId + '"></i>';
	}
	return html;
}

function mapWeatherIdToBackgroundImage(weatherIds, isDay) {
	// Referenced from https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
	var weatherId = weatherIds[0]; // Just use the first weather for background

	var imgUrl = 'assets/images/weather/' + (isDay ? 'day/' : 'night/');

	if (weatherId == 800) {
		imgUrl += 'clear.jpg';
	} else if (weatherId == 804) {
		imgUrl += 'cloudy.jpg'
	} else if (Math.floor(weatherId / 100) == 8) {
		// All 8xx codes other than 800 and 804
		imgUrl += 'partly-cloudy.jpg';
	} else if (Math.floor(weatherId / 100) == 2) {
		// All 2xx codes
		imgUrl += 'thunderstorm.jpg'
	} else if (Math.floor(weatherId / 100) == 3 || Math.floor(weatherId / 100) == 5) {
		// All 3xx and 5xx codes
		imgUrl += 'rain.jpg'
	} else if (Math.floor(weatherId / 100) == 6) {
		if (weatherId == 611 || weatherId == 612 || weatherId == 613) {
			imgUrl += 'sleet.jpg'
		} else {
			imgUrl += 'snow.jpg'
		}
	} else if (weatherId == 781) {
		imgUrl += 'tornado.jpg'
	} else if (Math.floor(weatherId / 100) == 7) {
		// All 7xx codes other than 781
		imgUrl += 'fog.jpg';
	} else {
		imgUrl += "default.jpg"
	}

	return imgUrl;
}

function getWeatherSummary(weathers) {
	if (weathers.length == 1) {
		return weathers[0];
	}

	var text = '';
	for (var weatherIdx in weathers) {
		if (weatherIdx != 0 && weatherIdx != weathers.length - 1) {
			// not first or last element
			text += ", ";
		} else if (weatherIdx == weathers.length - 1) {
			// last element
			text += " & ";
		}
		text += weathers[weatherIdx];
	}

	return text;
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
