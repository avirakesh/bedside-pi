"""
----------------------------------------------------------------------------
"THE BEER-WARE LICENSE" (Revision 42):
AvichalRakesh wrote this file.  As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
----------------------------------------------------------------------------
"""

import json
from string import Template

import httpx

from .user_prefs import UserPrefs

_WEATHER_URL = "https://api.pirateweather.net/forecast/{apiKey}/{lat},{lon}"


class WeatherProvider:
    def __init__(self, user_pref: UserPrefs):
        self._url_params = {
            "apiKey": user_pref.weather["apiKey"],
            "lat": user_pref.weather["location"]["latitude"],
            "lon": user_pref.weather["location"]["longitude"],
        }
        self._params = {
            "units": user_pref.weather["units"],
            "exclude": "minutely,hourly",
        }

    def get_current_weather(self) -> tuple[bool, dict]:
        """
        Retrieves the current weather information.

        Returns:
            A tuple containing a boolean indicating success and the weather data.
        """
        r = httpx.get(_WEATHER_URL.format(**self._url_params), params=self._params)
        if r.status_code != httpx.codes.OK:
            print("Error getting weather.")
            print("Error Code", r.status_code)
            print(r.text)
            return (False, {})

        out = {}

        res = json.loads(r.text)
        print(json.dumps(res, indent=4))
        out["summary"] = res["currently"]["summary"]
        out["icon"] = res["currently"]["icon"]
        out["temp"] = res["currently"]["temperature"]
        out["appTemp"] = res["currently"]["apparentTemperature"]
        out["sunrise"] = res["daily"]["data"][0]["sunriseTime"]
        out["sunset"] = res["daily"]["data"][0]["sunsetTime"]

        if res["currently"]["precipType"] != "none":
            precipitation = {}
            precipitation["type"] = res["currently"]["precipType"]
            precipitation["probability"] = res["currently"]["precipProbability"]
            precipitation["amount"] = (
                str(res["currently"]["precipIntensity"])
                + " "
                + WeatherProvider._get_precipitation_units(self._params["units"])
            )
            out["precipitation"] = precipitation

        if "alerts" in res:
            alerts = []
            for alert in res["alerts"]:
                alerts.append(alert["title"])
            out["alerts"] = alerts

        print(json.dumps(out, indent=4))
        return (True, out)

    @staticmethod
    def _get_precipitation_units(units: str) -> str:
        if units == "us":
            return "inch/hr"
        else:
            return "mm/hr"
