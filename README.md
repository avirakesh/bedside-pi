# BedSide Pi

Convert your Raspberry Pi into a smart Bedside Clock.

![BedSide Pi Screenshot](screenshot/img.png)

**UPDATE: I no longer have the patience for JavaScript, so moving the implementation
over to python, which should hopefully have better long term maintainability than
Node.js did.** _(Famous last words)_

~~**UPDATE: bedside-pi has been updated to use [Node.js](https://nodejs.org/en/) with
[Socket.io](http://socket.io/) rather than Apache with long polling. However, you can still
access the [Apache Version](https://github.com/avirakesh/bedside-pi/tree/apache)**~~

## General Info

BedSide Pi provides information at a glance.

-   Time (Who would've thunk?)
-   Current Weather (Optional)

## Requirements

BedSide Pi requires a bare minimum of

-   Raspberry Pi (Tested on RPi 3b and RPi 4b, your mileage may vary) running Raspbian.
-   A screen to display the information
    -   Technically, does not have to be the Raspberry PI. Any browser that can
        access the Raspberry Pi's IP will do..
-   [Optional] API Key from [PirateWeather](https://pirateweather.net/)

## Setup and Run Bedside Pi

<details>
<summary>Direct Execution</summary>

### Direct Execution

**Note: This process assumes you have a Raspberry Pi 4. If you have some other model, or are on a
different machine, you might have to change a few things.**

#### 1. Set up Python

1. Install Python

    Python comes built in with Raspbian distribution. Just make sure you have a reasonably new
    version of Python 3.

    Python version can be checked by running

    ```ShellSession
    $ python --version
    ```

    For some dependencies (namely fastapi) you might need CPython symbols, which can be installed
    with

    ```ShellSession
    $ sudo apt install python3.11-dev
    ```

    where `3.11` should be replaced with the specific version of python you have installed.

    For reference, these are the versions I have on my RPi 4b:

    ```ShellSession
    $ python --version
    Python 3.11.2

    $ pip --version
    pip 23.0.1 from /home/pi/projects/bedside-pi/env/lib/python3.11/site-packages/pip (python 3.11)
    ```

2. Set up virtual environment (Optional, but recommended)

    It is generally recommended to have virtual environments for different Python projects.
    This allows various python projects to use their own dependency versions without interfering
    with each other.

    One no-frills virtual environment is `venv`, which can be installed using:

    ```ShellSession
    $ sudo apt install python3.11-venv
    ```

    Once again, replace `3.11` with whatever python version you have installed
    on your system.

#### 2. Set up BedSide Pi

1. Download this project:

    Either clone repo using git CLI or download the entire project as a zip, your wish!

    For this example, I'll assume the project lives in `~/projects/bedside-pi`.

2. Create a virtual environment (Optional, but recommended):

    Use your favorite virtual environment tool to create a virtual environment
    for `bedside-pi`.

    If you chose `venv` from above, the virtual environment can be created as:

    ```ShellSession
    $ cd ~/projects/bedside-pi
    $ python -m venv env # creates an env/ directory containing the virtual environment.
    ```

    This needs only be done once.

    Once the virtual environment is created, you can activate the environment by running:

    ```ShellSession
    $ cd ~/projects/bedside-pi
    $ . env/bin/activate # activates the virtual environment for this terminal session only.
    ```

    This would need to be done for every new terminal session.

    You can check that your virtual environment is active by looking at the
    beginning of your terminal prompt, which will look something like this if
    it is activated:

    ```ShellSession
    (env) user@hostname:~/projects/bedside-pi$
    ```

    Or, you can run `which python` and check if it points to your environment:

    ```ShellSession
    pi@bedsidepi:~/projects/bedside-pi $ which python # environment NOT active
    /usr/bin/python # system Python

    pi@bedsidepi:~/projects/bedside-pi $ . env/bin/activate # activate environment

    (env) pi@bedsidepi:~/projects/bedside-pi $ which python  # environment active
    /home/pi/projects/bedside-pi/env/bin/python # environment Python
    ```

3. Install dependencies:

    With the virtual environment activated, you can now install the dependencies
    with:

    ```ShellSession
    $ pip install -r requirements.txt
    ```

#### 3. Setting up weather (or removing it)

-   Setting up weather:

    1. Sign up and get an API key from [PirateWeather](https://pirateweather.net/)
    2. Open [`user_prefs.yaml`](user_prefs.yaml)
    3. Copy the API key from [PirateWeather](https://pirateweather.net/) to `apiKey`
    4. Update `latitude` and `longitude` with your location.
    5. (Optional) Set `refreshInterval` which is how frequently the weather will be updated
       (in minutes).
        - NOTE: It might seem obvious, but weather does not change very frequently, so there is
          little need to refresh it every other minute.

-   Removing weather:

    1. Open [`user_prefs.yaml`](user_prefs.yaml)
    2. Set `enabled` under `weatherPrefs` to `False`

#### 4. Running `bedside-pi`:

To run `bedside-pi`, use the following commands:

```ShellSession
$ cd ~/projects/bedside-pi
$ . env/bin/activate # (optional) for venv users. Use whatever your virtual environment command is.
$ fastapi run server.py --user-prefs ./user_prefs.yaml
```

**Note**: The path to `user_prefs.yaml` can be provided either via the `--user-prefs` CLI argument or the `USER_PREFS_PATH` environment variable. The CLI argument takes precedence over the environment variable.

This will start the server on port `8000`.
You can now access the `bedside-pi` UI by navigating to `http://localhost:8000` in any web browser.

#### 5. (Optional) Running the script on boot

If you're like me you probably want to run `bedside-pi` automatically when your Raspberry Pi boots.
Thankfully that is easy enough to do with `crontab`.

1. First create a script to run `bedside-pi`, for example `~/run_bedside_pi.sh`.

    It could look something like:

    ```sh
    #!/bin/bash

    cd ${HOME}/projects/bedside-pi
    . ./env/bin/activate

    fastapi run server.py
    ```

    Make sure to give it execute permissions with `chmod +x ~/run_bedside_pi.sh`.

2. Add `crontab` entry to start `bedside-pi` on boot

    ```ShellSession
    $ crontab -e
    ```

    This will open the crontab file in your default text editor.

    Add the following line:

    ```
    @reboot /home/pi/run_bedside_pi.sh >> /home/pi/bedside_pi.log
    ```

    This will run the script on boot and log output to `~/bedside_pi.log`.

3. (Optional) Run chrome in kiosk mode on boot:

    Add the following line to the crontab file:

    ```
    @reboot sleep 20 && chromium-browser --display=:0 --kiosk http://localhost:8000 >> /home/pi/chromium.log
    ```

    This will start Chromium in kiosk mode on boot, pointing to your local BedSide Pi instance.
    The `sleep 20` lets the bedside-pi script start before Chromium tries to connect.

4. Reboot the Raspberry Pi and wait for `bedside-pi` to start automatically!

#### And that is it, enjoy your BedSide Pi!!

</details>

<details>
<summary>Docker Execution</summary>

### Docker Execution

To run `bedside-pi` using Docker, where the image is built directly from the GitHub repository, follow these steps:

#### 0. Prerequisites
*   Docker and Docker Compose installed on your system.

    ```ShellSession
    curl -sSL https://get.docker.com | sh
    ```

#### 1. Build the Docker Image from GitHub

You can build the Docker image directly from the GitHub repository without cloning it locally.
Simply run:

```ShellSession
docker build -t bedside-pi:latest https://github.com/avirakesh/bedside-pi.git
```

This command will fetch the repository, find the `Dockerfile` at the root, and build the image.

#### 2. Configure `user_prefs.yaml`

The `user_prefs.yaml` file, which contains your API keys and location settings, needs to be mounted into the Docker container at runtime. Ensure you have your desired `user_prefs.yaml` file in a known location on your host system.

Start by copying the [user_prefs.yaml](user_prefs.yaml) to a known location.

#### 3. Setting up weather (or removing it)

-   Setting up weather:

    1. Sign up and get an API key from [PirateWeather](https://pirateweather.net/)
    2. Open [`user_prefs.yaml`](user_prefs.yaml)
    3. Copy the API key from [PirateWeather](https://pirateweather.net/) to `apiKey`
    4. Update `latitude` and `longitude` with your location.
    5. (Optional) Set `refreshInterval` which is how frequently the weather will be updated
       (in minutes).
        - NOTE: It might seem obvious, but weather does not change very frequently, so there is
          little need to refresh it every other minute.

-   Removing weather:

    1. Open [`user_prefs.yaml`](user_prefs.yaml)
    2. Set `enabled` under `weatherPrefs` to `False`

#### 4. Run the Container using Docker Compose (Recommended)

1.  Create a `docker-compose.yml` file in a directory of your choice (e.g., `/home/pi/bedside-pi-docker`)
    with the following content.

    ```yaml
    services:
    bedside-pi:
        image: bedside-pi
        container_name: bedside-pi-app
        ports:
        - "8000:8000"
        volumes:
        - "./user_prefs.yaml:/config/user_prefs.yaml"
        environment:
        USER_PREFS_PATH: /config/user_prefs.yaml
        restart: unless-stopped
    ```

2.  Make sure your `user_prefs.yaml` is in the same directory as your
    `docker-compose.yml` or provide the correct path in the `volumes` section.

3.  Then, navigate to the directory containing your `docker-compose.yml` and `user_prefs.yaml` and run:

    ```ShellSession
    docker compose up -d
    ```

    This will start the `bedside-pi` container in detached mode.

4.  To stop the container:

    ```ShellSession
    docker compose down
    ```

#### 5. Run the Container directly with Docker (Alternative)

If you prefer not to use Docker Compose, you can run the container directly with the following:

```ShellSession
docker run -p 8000:8000 \
    --name bedside-pi-app -d \
    -v "$(pwd)/user_prefs.yaml:/config/user_prefs.yaml" \
    -e USER_PREFS_PATH=/config/user_prefs.yaml bedside-pi:latest
```

*   Replace `$(pwd)/user_prefs.yaml` with the absolute path to your `user_prefs.yaml` file if it's
    not in the current directory.
*   The `-e USER_PREFS_PATH=/app/user_prefs.yaml` flag tells the application inside the container
    where to find the mounted configuration file.

To stop and remove the container:

```ShellSession
docker stop bedside-pi-app && docker rm bedside-pi-app
```

Once the container is running (either via Docker Compose or direct Docker run), you can access the `bedside-pi` UI by navigating to `http://localhost:8000` in any web browser.

#### 6. Update docker container to the latest version
1.  Stop the container if it's currently running:
    ```ShellSession
    docker compose down # when using docker compose
    docker stop bedside-pi-app && docker rm bedside-pi-app # when running directly with docker
    ```

2.  Rebuild docker image using
    [Build the Docker Image from GitHub](#1-build-the-docker-image-from-github)

3.  Restart the container, either using
    [Docker Compose](#4-run-the-container-using-docker-compose-recommended) or
    [directly](#5-run-the-container-directly-with-docker-alternative).

#### 7. (Optional) Run the container on boot

1.  Ensure `docker.service` is enabled in systemd
    ```ShellSession
    systemctl enable docker
    ```

2.  Start container on boot:

    1.  Create `/etc/systemd/system/bedside-pi-docker.service`:

        ```ini
        [Unit]
        Description=Bedside Pi Docker Container
        Requires=docker.service
        After=docker.service

        [Service]
        Type=oneshot
        RemainAfterExit=yes
        WorkingDirectory=/home/pi/bedside-pi-docker # skip if using 'docker run ...'
        ExecStart=docker compose up -d # or 'docker run ...'
        ExecStop=docker compose down # or 'docker stop ...'
        TimeoutStartSec=0

        [Install]
        WantedBy=multi-user.target
        ```

    2.  Reload systemd daemon:
        ```ShellSession
        systemctl daemon-reload
        ```

    3.  Enable the service:
        ```ShellSession
        systemctl enable bedside-pi-docker
        ```

3. Start frontend on boot:

    1.  Create `~/.config/systemd/user/bedside-pi-frontend.service`:
        ```ini
        [Unit]
        Description=Bedside Pi Frontend

        [Service]
        Type=oneshot
        RemainAfterExit=yes
        ExecStartPre=/bin/sleep 60 # wait 60s for docker service and container
                                   # to boot
        ExecStart=chromium --display=:0 --kiosk http://localhost:8000
        TimeoutStartSec=120

        [Install]
        WantedBy=default.target
        ```

    2.  Reload systemd daemon:
        ```ShellSession
        systemctl --user daemon-reload
        ```

    3.  Enable the service:
        ```ShellSession
        systemctl --user enable bedside-pi-frontend
        ```

</details>

---

## Using `bedside-pi`

There are a few options to customize `bedside-pi` in [`user_prefs.yaml`](user_prefs.yaml):

-   `use24HrClock`: Use 24-hour format instead of AM/PM.
-   `showSeconds`: Show seconds on the clock display.
-   `showLightsToggle`: Show button to toggle lights on/off.
-   `days`: List of days to be used. Change to whatever word/language you want displayed.
-   `months`: List of months to be used. Change to whatever word/language you want displayed.

Once `bedside-pi` is running, using it is simple: Use your eyeballs to look at it!

However, there are a few interaction in the UI:

1. Tapping the weather will fetch new data and update the display with
   latest weather information.
2. Tapping the lights toggle on the bottom right will toggle lights out mode,
   which dims the screen (while keeping the clock barely visible).
    - This will only show up if `showLightsToggle` is set to `True`.
    - Note that for most LCD monitors, this won't turn off the backlight, but
      it should significantly reduce the the light produced by the screen.

## AI Use Disclaimer

All images in this repo were generated using
[Nano Banana](https://blog.google/products/gemini/updated-image-editing-model/).
The images were generated using the prompt of the following pattern:

```
Create a watercolor painting of a cityscape on a [clear|cloudy|etc...] [day|night]
```

## License


```
"THE BEER-WARE LICENSE" (Revision 42):

Avichal Rakesh wrote this project. As long as you retain this notice you can do
whatever you want with this stuff. If we meet some day, and you think this stuff
is worth it, you can buy me a beer in return. Avichal Rakesh
```
