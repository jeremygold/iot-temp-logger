#!/usr/bin/env node

// TODO: Update so this is all synchronous - Promise chains, or async / await?
// TODO: Try this out with clean grafana / influx installation - Think the ./sh scripts are obsolete.

var request = require('request');

const config = require('./config.json');
const temperature_data_source = require('./TemperatureDataSource.json');
const temperature_dashboard = require('./Temperature.json');

const grafana_headers = {
    'Authorization': 'Bearer ' + config.auth_key,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

function post_result_handler(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(response.statusCode, body);
        console.log('Success!!!');
    }
    else {
        console.log(response.statusCode, body);
        console.log(response.statusMessage);
        console.log('Failure!!!');
    }
}

function create_temperature_database() {
    console.log('Creating temperature database');
    request.post({
        url: 'http://localhost:8086/query',
        formData: { q: 'CREATE DATABASE temperature' }
    },
        post_result_handler);
}

function create_grafana_data_source() {
    console.log('Creating Grafana data source');
    request.post({
        url: 'http://localhost:3000/api/datasources',
        headers: grafana_headers,
        json: temperature_data_source
    },
        post_result_handler);
}

function create_grafana_dashboard() {
    console.log('Creating Grafana dashboard');

    request.post({
        url: 'http://localhost:3000/api/dashboards/db',
        headers: grafana_headers,
        json: temperature_dashboard
    },
        post_result_handler);
}

create_temperature_database();
create_grafana_data_source();
create_grafana_dashboard();

