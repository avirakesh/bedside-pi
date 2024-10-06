from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from modules.user_prefs import UserPrefs

user_prefs = UserPrefs("user_prefs.yaml")

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets"), name="assets")


@app.get("/", response_class=FileResponse)
def get_root():
    return FileResponse("views/index.html")


@app.get("/get-weather", response_class=JSONResponse)
def get_weather():
    return JSONResponse({}, status_code=500)
