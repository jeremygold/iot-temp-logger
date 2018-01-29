# IoT temperature logger

## Overview

This system is designed to provide a rapid setup temperature logging system based on ESP8266 modeules with an DS18B20 temperature sensor connected.

## Prerequisites

Note: This project has been developed and tested on Ubuntu 16.04

* Install docker-ce: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1
* Install docker-compose: https://docs.docker.com/compose/install/#install-compose
* Install nodejs: http://nodejs.org/en/download/package-manager/
* Install Visual Studio Code: https://code.visualstudio.com/docs/setup/linux
* In Visual Studio Code, install the PlatformIO IDE extension
* Set up ESP8266 udev rules: Download https://raw.githubusercontent.com/platformio/platformio/develop/scripts/99-platformio-udev.rules, and save to /etc/udev/rules.d/

## Start up the servers

Clone the repo, and perform the following steps to start up the servers ([tmux](https://github.com/tmux/tmux/wiki) is recommended - You'll need a couple of different terminals):

In a new terminal:

```
$ cd docker
$ docker-compose up
```

Make sure that influxdb and grafana start up correctly

## Generate a Grafana API key

* Go to http://localhost:3000, and log in with default credentials (admin, admin)
* Click the Grafana icon dropdown, Admin, API Keys.
* Add an Admin key (e.g. config-key), and copy the resulting Authentication string
* Copy config.json.template to config.json, and configure the authentication key, and the IP address of your host computer.

## Set up the database, datasource and dashboard

* In a new terminal, run the setup script as follows:

```
$ cd docker
$ npm install
$ node setup-temp-monitor.js
```

## Recompile and deploy the ESP8266 code for your configuration

* Open the iot-temp-logger Folder in VSCode
* Copy the file auth_template.h to auth.h, and fill out the details for the host machine IP address (in the INFLUXDB_IP definition), and your WiFi login credentials
* Build and upload the file to your ESP8266
* Use the serial monitor to validate that you have connected to WiFi successfully, and temperature readings are being transmitted regularly

## Validate operation

* Go to http://localhost:3000/dashboard/db/temperature-api?orgId=1 and ensure that the temperature readings are being updated regularly
