#!/bin/bash

curl -X GET \
    -H "Authorization: Bearer eyJrIjoiUjZEMjJMeUNYSmw2bUVGUHBCdm5EOEZYTmg0TGwwcnIiLCJuIjoiY2xpLWFkbWluIiwiaWQiOjF9" \
    -H "Content-Type: application/json" \
    http://192.168.1.116:3000/api/dashboards/db/temperature

