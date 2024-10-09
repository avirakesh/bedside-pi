"""
----------------------------------------------------------------------------
"THE BEER-WARE LICENSE" (Revision 42):
AvichalRakesh wrote this file.  As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
----------------------------------------------------------------------------
"""

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from modules.user_prefs import UserPrefs
from modules.weather_provider import WeatherProvider

user_prefs = UserPrefs("user_prefs.yaml")
weather_provider = WeatherProvider(user_prefs)

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets"), name="assets")
templates = Jinja2Templates(directory="views")


@app.get("/", response_class=HTMLResponse)
def get_templatized_html(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html", context={"prefs": user_prefs.client_prefs}
    )


@app.get("/get-weather", response_class=JSONResponse)
def get_weather():
    (status, weather) = weather_provider.get_current_weather()
    if not status:
        return JSONResponse({}, status_code=500)
    else:
        return JSONResponse(weather)
