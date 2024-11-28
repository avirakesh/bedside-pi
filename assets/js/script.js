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

var lastWeather = 0;

var lightsToggleOn =
    '<svg stroke="#FFF" fill="#FFF" stroke-width="0" viewBox="0 0 24 24" class="text-theme-800 dark:text-theme-200 w-8 h-8 cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></svg>';
var lightsToggleOff =
    '<svg stroke="#FFF" fill="#FFF" stroke-width="0" viewBox="0 0 24 24" class="text-theme-800 dark:text-theme-200 w-8 h-8 cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></svg>';

$(function () {
    if (weatherEnabled) {
        $(".weather-container").click(function () {
            updateWeather();
        });
    } else {
        $(".weather-container").css("visibility", "hidden");
    }

    if (clock24hrs) {
        $("#am-pm").hide();
    }

    if (!showSeconds) {
        $("#seconds").hide();
    }

    if (showLightsToggle) {
        $(".lights-toggle-container").click(function () {
            toggleLights();
        });
    } else {
        $(".lights-toggle-container").hide();
    }

    if (hideCursor) {
        $("body").addClass("no-cursor");
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
            $("#hours").text(checkTime(hh));
        } else {
            $("#hours").text(checkTime(hh));
        }

        updateDate(today);
    }

    if (m != mm) {
        m = mm;
        $("#minutes").text(checkTime(m));

        if (weatherEnabled) {
            if (lastWeather == 0) {
                updateWeather();
            }

            lastWeather = (lastWeather + 1) % weatherInterval;
        }
    }

    if (s != ss) {
        s = ss;
        if (showSeconds) {
            $("#seconds").text(checkTime(s));
        }

        var title = checkTime(h) + ":" + checkTime(m);
        if (showSeconds) {
            title += ":" + checkTime(s);
        }
        window.document.title = title;
    }

    t = setTimeout(function () {
        startTime();
    }, 200);
}

function checkAMPM() {
    if (h >= 12) {
        $("#am-pm").text("PM");
        return h > 12 ? h - 12 : h;
    } else {
        $("#am-pm").text("AM");
        return h == 0 ? 12 : h;
    }
}

function checkTime(i) {
    return i < 10 ? "0" + i : i;
}

function updateDate(today) {
    var currentDate = today.getDate();

    if (date != currentDate) {
        date = currentDate;
        $("#date").text(checkTime(date));

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
            $("#year").text(year);
        }
    }
}

function setDay() {
    $("#day").text(days[day] + ",");
}

function setMonth() {
    $("#month").text(months[month]);
}

function updateWeather() {
    $.ajax({
        url: "http://" + window.location.host + "/get-weather",
        success: function (data) {
            parseWeather(data);
            $(".weather-container").css("visibility", "visible");
        },
        error: function () {
            $(".weather-container").css("visibility", "hidden");
        },
    });
}

function parseWeather(data) {
    if (data != "{}") {
        // console.log(data);
        if (data["icon"] in weatherTranslations) {
            data["summary"] = weatherTranslations[data["icon"]];
        }

        $(".weather-summary-div").text(data["summary"]);

        var timestamp = Math.round(Date.now() / 1000);
        var isDay = timestamp > data["sunrise"] && timestamp < data["sunset"];

        $(".weather-icon").html(generateIconSpan(data["icon"]));

        if (data["precipitation"]) {
            var probability = data["precipitation"]["probability"];
            var amount = data["precipitation"]["amount"];
            $(".preci-span").text(probability + "%");
            $(".preci-amount-div").text(amount + " " + precipitationUnits);
            $(".preci-container").show();
        } else {
            $(".preci-container").hide();
        }

        $(".temp-span").text(data["temp"]);
        $(".feels-like-span").text(data["appTemp"]);

        imgUrl = mapWeatherIdToBackgroundImage(data["icon"], isDay);

        if ($(".shown").attr("src") != imgUrl) {
            $(".hidden").attr("src", imgUrl);
            $(".background-img").toggleClass("hidden");
            $(".background-img").toggleClass("shown");
        }

        if (data["alerts"]) {
            var html = "";
            for (var alert of data["alerts"]) {
                html +=
                    "<div>" +
                    '<span class="alert-sign">!</span>' +
                    '<span class="alert-text">' +
                    alert +
                    "</span>" +
                    "</div>";
            }
            $(".alerts-div").html(html);
            $(".alerts-div").show();
        } else {
            $(".alerts-div").hide();
            $(".alerts-div").html("");
        }
    }
}

function generateIconSpan(icon, isDay) {
    // icons taken from PirateWeather API
    var iconClass = "";
    switch (icon) {
        case "clear-day":
            iconClass = "wi wi-day-sunny";
            break;
        case "clear-night":
            iconClass = "wi wi-night-clear";
            break;
        case "rain":
            iconClass = isDay ? "wi wi-day-rain" : "wi wi-night-alt-rain";
            break;
        case "snow":
            iconClass = isDay ? "wi wi-day-snow" : "wi wi-night-alt-snow";
            break;
        case "sleet":
            iconClass = isDay ? "wi wi-day-sleet" : "wi wi-night-alt-sleet";
            break;
        case "wind":
            iconClass = isDay ? "wi wi-day-windy" : "wi wi-windy";
            break;
        case "fog":
            iconClass = isDay ? "wi wi-day-fog" : "wi wi-night-fog";
            break;
        case "cloudy":
            iconClass = isDay ? "wi wi-day-cloudy" : "wi wi-night-alt-cloudy";
            break;
        case "partly-cloudy-day":
            iconClass = "wi wi-day-sunny-overcast";
            break;
        case "partly-cloudy-night":
            iconClass = "wi wi-night-alt-partly-cloudy";
            break;
        case "hail":
            iconClass = isDay ? "wi wi-day-hail" : "wi wi-night-alt-hail";
            break;
        case "thunderstorm":
            iconClass = isDay ? "wi wi-day-thunderstorm" : "wi wi-night-alt-thunderstorm";
            break;
        case "tornado":
            iconClass = isDay ? "wi wi-day-tornado" : "wi wi-night-alt-tornado";
            break;
    }
    return "<span class='" + iconClass + "'></span>";
}

function mapWeatherIdToBackgroundImage(icon, isDay) {
    var imgUrl = "assets/images/weather/" + (isDay ? "day/" : "night/");
    imgUrl += icon + ".jpg";
    return imgUrl;
}

function toggleLights() {
    if ($(".lights-filter").css("opacity") == 0) {
        $(".lights-filter").css("opacity", 0.85);

        $(".lights-toggle-div").html(lightsToggleOff);
        $(".lights-toggle-div").css("opacity", 0.5);
        $(".lights-toggle-img").css("opacity", 0.5);
    } else {
        $(".lights-filter").css("opacity", 0);

        $(".lights-toggle-div").html(lightsToggleOn);
        $(".lights-toggle-div").css("opacity", 1);
        $(".lights-toggle-img").css("opacity", 1);
    }
}
