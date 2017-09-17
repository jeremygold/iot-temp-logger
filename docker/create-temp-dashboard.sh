#!/bin/bash

curl -X POST \
    -H "Authorization: Bearer eyJrIjoiYjhBV05TYXpwZGZVNVh5NGs1aTFPRW1PWEJ0RkhMeXQiLCJuIjoiY2xpLWtleSIsImlkIjoxfQ==" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "@Temperature.json" \
    http://192.168.1.116:3000/api/dashboards/db

