import yaml


class UserPrefs:
    def __init__(self, yaml_file_path):
        self.yaml_path = yaml_file_path
        with open(self.yaml_path) as f:
            self._prefs = yaml.safe_load(f)

        self._validate_prefs()
        # print(self._prefs)

    def _validate_prefs(self):
        if not self._prefs:
            raise KeyError(f"No preferences found in {self.yaml_path}")

        if "weatherPrefs" not in self._prefs:
            raise KeyError(f"No 'weatherPrefs' found in {self.yaml_path}")

        if "location" not in self._prefs["weatherPrefs"]:
            raise KeyError(f"No 'location' found in 'weatherPrefs' in {self.yaml_path}")

        if "latitude" not in self._prefs["weatherPrefs"]["location"]:
            raise KeyError(f"No 'latitude' found in 'location' in {self.yaml_path}")

        if "longitude" not in self._prefs["weatherPrefs"]["location"]:
            raise KeyError(f"No 'longitude' found in 'location' in {self.yaml_path}")

        if "apiKey" not in self._prefs["weatherPrefs"]:
            raise KeyError(f"No 'apiKey' found in 'weatherPrefs' in {self.yaml_path}")

        if "units" not in self._prefs["weatherPrefs"]:
            raise KeyError(
                f"No 'useSIUnits' found in 'weatherPrefs' in '{self.yaml_path}'"
            )

    @property
    def weather(self):
        return self._prefs["weatherPrefs"]
