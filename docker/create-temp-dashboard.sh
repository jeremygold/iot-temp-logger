#!/bin/bash

curl -X POST \
    -H "Authorization: Bearer eyJrIjoieG1xejJRRFpYVHdQQWg5cHZKVUxFbWVmMzlNbWtDMm4iLCJuIjoiY29uZmlnLWtleSIsImlkIjoxfQ==" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "@Temperature.json" \
    http://localhost:3000/api/dashboards/db

