# BedSide Pi
Convert your Raspberry Pi into a smart Bedside Clock.

![alt-tag](screenshot/img.png)

**UPDATE: bedside-pi has been updated to use [Node.js](https://nodejs.org/en/) with [Socket.io](http://socket.io/) rather than Apache with long polling. However, you can still access the [Apache Version](https://github.com/avirakesh/bedside-pi/tree/apache)**

## General Info
BedSide Pi provides information at a glance.
- Time (Who would've thunk?)
- Current Weather (Optional)
- ~~Current Notifications (Optional) **(Android Only)** (Requires [BedSide Pi Companion app](https://play.google.com/store/apps/details?id=com.highonh2o.tabletoppi))~~
  - ~~iOS version is in works! We couldn't find a way to mirror notifications from iOS devices.~~
    - ~~If there's a solution I am missing, please let me know!~~

### Requirements
BedSide Pi requires a bare minimum of
- Raspberry Pi (Tested on RPi 3b and RPi 4b, your mileage may vary) running Raspbian.
- A screen to display the information

#### Optional Items
- API Key from [OpenWeather](https://openweathermap.org/api). This is used to access weather information.


## Setting Things Up
**Note: This process assumes you have a Raspberry Pi 3. If you have some other model, you might have to change a few things.**

#### 1. Setting up Node.js on Pi

1. Installing Node.js

    If you haven't done so in a while, run the following commands:

        sudo apt update
        sudo apt upgrade

    Now your Pi is ready to go. Use the following commands to install Node and npm:

    Install Node:

        sudo apt install nodejs
        sudo apt install npm

    Test Node:

        node -v

Now that Node.js is successfully setup on Pi, we can continue to the next step.

#### 2. Setting up BedSide Pi

1. Download this project:

    Either clone this project or download the entire project as a zip, your wish!

2. Move the files to your Pi:

    Move the files to the directory where you want the application to run. Make sure you have write permission in that directory. (For ex. ~/BedSidePi/)

3. Install dependencies:

    Open terminal and set your current working directory as the directory chosen above.

    For example

        cd ~/BedSidePi

    Once the current directory has been set, run the following command:

        npm install

    You should see the dependencies install to the working directory.

4. **(Optional)** Change to 24-hr Clock:

    Go to [assets/js/script.js](assets/js/script.js) on your server, and change `clock24hrs` to `true`.



#### 3. Setting up weather (or removing it)

  * Setting up weather:
    1. Sign up and get an API key from [OpenWeather](https://openweathermap.org/api)
    2. Open [modules/prefs.js](modules/prefs.js) on your RPi
    3. Copy the API key from [OpenWeather](https://home.openweathermap.org/api_keys) to `apiKey` (*Note:* Enclose in single quotes)
    4. Set your location to your current location
    5. (Optional) Set `lang` to your preferred language
    5. (Optional) Open [assets/js/script.js](assets/js/script.js) on your web server and set `weatherInterval`

  * Removing weather:
    1. Open [views/index.html](views/index.html) on your web server
    2. Comment out the div which contains weather information
    3. Open [assets/js/script.js](assets/js/script.js) on your web server
    4. Follow the comments at line 63

#### 4. Running bedside-pi:

  Run the following command from the directory where project lives:

      npm start

  Leave the terminal window running and use a web browser to navigate to http://localhost:8080.

#### And that is it, enjoy your BedSide Pi!!

## License

"THE BEER-WARE LICENSE" (Revision 42):

AvichalRakesh  wrote this project. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return. Avichal Rakesh
