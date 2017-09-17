#!/bin/bash

curl -X POST \
    -H "Authorization: Bearer eyJrIjoiUjZEMjJMeUNYSmw2bUVGUHBCdm5EOEZYTmg0TGwwcnIiLCJuIjoiY2xpLWFkbWluIiwiaWQiOjF9" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "@TemperatureDatasource.json" \
    http://192.168.1.116:3000/api/datasources

