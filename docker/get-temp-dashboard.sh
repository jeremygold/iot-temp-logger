#!/bin/bash

curl -X GET \
    -H "Authorization: Bearer eyJrIjoiYjhBV05TYXpwZGZVNVh5NGs1aTFPRW1PWEJ0RkhMeXQiLCJuIjoiY2xpLWtleSIsImlkIjoxfQ==" \
    -H "Content-Type: application/json" \
    http://192.168.1.116:3000/api/dashboards/db/temperature

