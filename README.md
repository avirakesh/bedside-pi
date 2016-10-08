# BedSide Pi
Convert your Raspberry Pi (or any server) into a smart Bedside Clock.

![alt-tag](screenshot/img.png)

**UPDATE: bedside-pi has been updated to use [Node.js](https://nodejs.org/en/) with [Socket.io](http://socket.io/) rather than Apache with long polling. However, you can still access the [Apache Version](https://github.com/avirakesh/bedside-pi/tree/master)**

## General Info 
BedSide Pi provides information at a glance. Just a glance at the screen will tell you the most vital information. 
- Time (Who would've thunk?)
- Current Weather (Optional)
- Current Notifications (Optional) **(Android Only)** (Requires [BedSide Pi Companion app](https://play.google.com/store/apps/details?id=com.highonh2o.tabletoppi))
  - iOS version is in works!

### Requirements
BedSide Pi requires a bare minimum of
- Raspberry Pi (Tested on Model 3, your mileage may vary) running Raspbian/PIXEL.
  - Raspberry Pi should be connected to a network
- A screen to display the information

####Optional Items
- API Key from [DarkSky](https://darksky.net/dev/). This is used to access weather information.
- Android Phone with [BedSide Pi companion app](https://play.google.com/store/apps/details?id=com.highonh2o.tabletoppi)


## Setting Things Up 
**Note: This process assumes you have a Raspberry Pi 3. If you have some other model, you might have to change a few things.**

####1. Setting up Node.js on Pi
  
  1. Installing Node.js
  
    If you haven't done so in a while, run the following commands:
     
        sudo apt-get update
        sudo apt-get upgrade
        
    Now your Pi is ready to go. Use the following commands to install Node and npm:
    
      Add the package repository:
        
        curl -sLS https://apt.adafruit.com/add | sudo bash
        
     Install Node:
     
        sudo apt-get install node
        
     Test Node:
        
        node -v


**NOTE: The repository is managed by adafruit. To know more about how to setup Node.js on Pi, go to the [official website](https://learn.adafruit.com/node-embedded-development/installing-node-dot-js)**

Now that Node.js is successfully setup on Pi, we can continue to the next step.

####2. Setting up BedSide Pi
  
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


####3. Setting up weather (or removing it)

  * Setting up weather:
    1. Grab the API key from [darksky.net/dev](https://darksky.net/dev/)
    2. Open [modules/prefs.js](modules/prefs.js) on your Pi
    3. Copy the API key from [darksky.net/dev](https://darksky.net/dev/) to **apiKey** (Note: Enclose in single quotes)
    4. Set **latlng** to your latitude and longitude
    5. (Optional) Open [assets/js/script.js](assets/js/script.js) on your web server and set the refresh interval
    
  * Removing weather:
    1. Open [views/index.html](views/index.html) on your web server
    2. Comment out the div which contains weather information
    3. Open [assets/js/script.js](assets/js/script.js) on your web server
    4. Follow the comments at line 60
    

####4. Setting up Notification Mirroring (or removing it)

  * Setting up Notification Mirroring:

    BedSide Pi is capable of mirroring notifications from your Android device. 
  
    1. Dowload [BedSide Pi Companion app](https://play.google.com/store/apps/details?id=com.highonh2o.tabletoppi) from Google Play Store 
    2. Open the app, and allow notification acccess
    3. Set up URL:
      1. Fill in the URL of your Node.js web server (Ex. 192.168.2.16:8080).
    
        Use **ifconfig** to get the IP Address of your Pi.
        
        Note: Make sure the URL is preceded by http:// or https://
        
      2. Use **TEST CONNECTION** to check if your phone could talk to the web server
      3. If the connection was successful, press **UPDATE** to set the URL.
      
    4. Setup mirroring over WiFi:
    
      Unless you are running a web server with a static IP address, it is recommended to restrict notification mirroring to WiFi only.
      
      1. Turn on 'Mirror over WiFi only', if not already checked.
      2. (Optional - but recommended) Set WiFi SSID to mirror the notification over. Setting this will mirror notification only if the phone is connected to the specified WiFi. Press **UPDATE** once the SSID is set. Please note the whitespaces of SSID.
      
    5. Once everything is set, and URL connection is successful, tap **Send Test Notification** to see if notification mirroring works. 
    
      If it doesn't, make sure that the app has notification access and connection to server was successful.
      
    **~~NOTE: Notification Mirroring uses long polling to mirrror notifications, i.e. front-end sends a request to the backend every 2 seconds to sync up new notifications. This is fine with Pi, but may cause problems with other web servers.~~ Not anymore, the front end interfaces with the backend using Sockets**
      
  * Removing Notification Mirroring:
  
    * Delete the companion app making sure there are no notifications already mirrored.
    
####5. Running bedside-pi:
  
  Run the following command from the directory where project lives:
  
      node server.js
      
  Leave the terminal window running and use a browser to access the clock.

####And that is it, enjoy your BedSide Pi!!

## License

"THE BEER-WARE LICENSE" (Revision 42):

AvichalRakesh  wrote this project. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return. Avichal Rakesh
