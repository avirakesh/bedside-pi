"""
----------------------------------------------------------------------------
"THE BEER-WARE LICENSE" (Revision 42):
AvichalRakesh wrote this file.  As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
----------------------------------------------------------------------------
"""

import yaml


class UserPrefs:
    def __init__(self, yaml_file_path):
        self.yaml_path = yaml_file_path
        with open(self.yaml_path) as f:
            self._prefs = yaml.safe_load(f)

        self._validate_prefs()

    def _validate_prefs(self):
        if not self._prefs:
            raise KeyError(f"No preferences found in {self.yaml_path}")

        self._validate_weather_prefs()
        self._validate_view_prefs()

    def _validate_weather_prefs(self):
        if "weatherPrefs" not in self._prefs:
            raise KeyError(f"No 'weatherPrefs' found in {self.yaml_path}")

        weather_prefs = self._prefs["weatherPrefs"]

        if "enabled" not in weather_prefs:
            raise KeyError(f"No 'enabled' found in 'weatherPrefs' in {self.yaml_path}")

        if "refreshInterval" not in weather_prefs:
            raise KeyError(f"No 'refreshInterval' found in 'weatherPrefs' in {self.yaml_path}")

        if "location" not in weather_prefs:
            raise KeyError(f"No 'location' found in 'weatherPrefs' in {self.yaml_path}")

        if "latitude" not in weather_prefs["location"]:
            raise KeyError(f"No 'latitude' found in 'location' in {self.yaml_path}")

        if "longitude" not in weather_prefs["location"]:
            raise KeyError(f"No 'longitude' found in 'location' in {self.yaml_path}")

        if "apiKey" not in weather_prefs:
            raise KeyError(f"No 'apiKey' found in 'weatherPrefs' in {self.yaml_path}")

        if "units" not in weather_prefs:
            raise KeyError(
                f"No 'useSIUnits' found in 'weatherPrefs' in '{self.yaml_path}'"
            )

    def _validate_view_prefs(self):
        if "viewPrefs" not in self._prefs:
            raise KeyError(f"No 'viewPrefs' found in {self.yaml_path}")

        view_prefs = self._prefs["viewPrefs"]

        if "use24HrClock" not in view_prefs:
            raise KeyError(f"No 'use24HrClock' found in 'viewPrefs' in {self.yaml_path}")

        if "showSeconds" not in view_prefs:
            raise KeyError(f"No 'showSeconds' found in 'viewPrefs' in {self.yaml_path}")

        if "days" not in view_prefs:
            raise KeyError(f"No 'days' found in 'viewPrefs' in {self.yaml_path}")

        if len(view_prefs["days"]) != 7:
            raise ValueError(f"Expected 7 days, found {len(view_prefs['days'])} in 'viewPrefs.days' in {self.yaml_path}")

        if "months" not in view_prefs:
            raise KeyError(f"No 'months' found in 'viewPrefs' in {self.yaml_path}")

        if len(view_prefs["months"]) != 12:
            raise ValueError(f"Expected 12 months, found {len(view_prefs['months'])} in 'viewPrefs.months' in {self.yaml_path}")


    @property
    def weather(self):
        return self._prefs["weatherPrefs"]

    @property
    def client_prefs(self):
        return {
            "weatherEnabled": self._prefs["weatherPrefs"]["enabled"],
            "weatherInterval": self._prefs["weatherPrefs"]["refreshInterval"],
            "clock24hrs": self._prefs["viewPrefs"]["use24HrClock"],
            "showSeconds": self._prefs["viewPrefs"]["showSeconds"],
            "days": self._prefs["viewPrefs"]["days"],
            "months": self._prefs["viewPrefs"]["months"]
        }
