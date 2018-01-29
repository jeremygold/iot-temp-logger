#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266HTTPClient.h>
#include <StreamString.h>

#include "auth.h"

// Set up onewire bus to 18B20 temp sensor
#define ONE_WIRE_BUS D4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup(void){
  // Ensure that we're not starting up as an AP
  WiFi.softAPdisconnect(false);
  WiFi.enableAP(false);

  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  Serial.println("Starting OneWire lib");
  sensors.begin();

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop(void)
{
  Serial.print(" Requesting temperatures...");
  sensors.requestTemperatures(); // Send the command to get temperature readings
  Serial.println("DONE");

  float temperature = sensors.getTempCByIndex(0);
  Serial.print("Temperature is: ");
  Serial.println(temperature);

  Serial.println("Writing to database");
  String payload = "temp,sensor=BlueRoom value=";
  payload.concat(temperature);

  // Reference: http://www.andremiller.net/content/grafana-and-influxdb-quickstart-on-ubuntu
  // Reference: https://github.com/esp8266/Arduino/issues/1390#issuecomment-170343346

  //curl -i -XPOST 'http://localhost:8086/write?db=statsdemo' --data-binary 'cpu,host=serverA value=`cat /proc/loadavg | cut -f1 -d" "`'
  HTTPClient http;

  String url = "http://";
  url += INFLUX_IP;
  url += ":8086/write?db=temperature";
  http.begin(url.c_str());
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.POST(payload);
  http.end();
  Serial.println("Database write complete");

  delay(1000);
}
