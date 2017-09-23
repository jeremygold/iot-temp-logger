#!/usr/bin/env node

var request = require('request');

function create_temperature_database() {
    console.log('Creating temperature database');
    request.post( 
            {url: 'http://localhost:8086/query', formData: { q:'CREATE DATABASE temperature' }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    console.log(response.statusCode, body);
                }
                else {
                    console.log(response.statusCode, body);
                }
                console.log('Done');
            });
}

const temperature_datasource = require('./TemperatureDatasource.json');

function create_grafana_datasource() {
    console.log('Creating Grafana datasource');
    console.log(temperature_datasource);
    request.post({
                url: 'http://localhost:3000/api/datasources', 
                headers: {
                    'Authorization': 'Bearer eyJrIjoicGRHaWY2dXJpTlVnUVd4ZXpLUlhrcFAwSEtMN3BxSUciLCJuIjoiY2xpLWtleSIsImlkIjoxfQ==',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
				form: temperature_datasource
    },

    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            console.log(response.statusCode, body);
        }
        else {
            console.log(response.statusCode, body);
        }
        console.log('Done');
    });
}

//create_temperature_database();
create_grafana_datasource();

