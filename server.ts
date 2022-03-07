// loading the deps
const server = require("express");

//seting the keys
const setKeys = require("./config/setKeys")();


// initiating the backend application
const initiateApplication = require('./src/index');

initiateApplication(server, setKeys);