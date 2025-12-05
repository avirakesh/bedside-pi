"""
----------------------------------------------------------------------------
"THE BEER-WARE LICENSE" (Revision 42):
AvichalRakesh wrote this file.  As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
----------------------------------------------------------------------------
"""

import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from modules.user_prefs import UserPrefs
from modules.weather_provider import WeatherProvider

USER_PREFS_PATH = os.environ.get("USER_PREFS_PATH")
if USER_PREFS_PATH is None:
    raise ValueError(
        "USER_PREFS_PATH environment variable or --user-prefs CLI argument is not set. "
        "Please set it to the path of your user_prefs.yaml file."
    )

# Initialize these outside the main block if they are needed globally
user_prefs = None
weather_provider = None

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets"), name="assets")
templates = Jinja2Templates(directory="views")

@app.on_event("startup")
async def startup_event():
    global user_prefs, weather_provider
    user_prefs = UserPrefs(USER_PREFS_PATH)
    weather_provider = WeatherProvider(user_prefs)


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
