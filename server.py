from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from modules.user_prefs import UserPrefs
from modules.weather_provider import WeatherProvider

user_prefs = UserPrefs("user_prefs.yaml")
weather_provider = WeatherProvider(user_prefs)

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets"), name="assets")


@app.get("/", response_class=FileResponse)
def get_root():
    return FileResponse("views/index.html")


@app.get("/get-weather", response_class=JSONResponse)
def get_weather():
    (status, weather) = weather_provider.get_current_weather()
    if not status:
        return JSONResponse({}, status_code=500)
    else:
        return JSONResponse(weather)
