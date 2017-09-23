#!/bin/bash

curl -X POST \
    -H "Authorization: Bearer eyJrIjoicGRHaWY2dXJpTlVnUVd4ZXpLUlhrcFAwSEtMN3BxSUciLCJuIjoiY2xpLWtleSIsImlkIjoxfQ==" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "@TemperatureDatasource.json" \
    http://localhost:3000/api/datasources

