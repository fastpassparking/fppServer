// Dependencies
var express = require('express');
var mongoose = require('mongoose');

// Import routes
var index = require('./routes/index');
var userRoute = require('./routes/user');
var vehicleRoute = require('./routes/vehicle');
var parkingLotRoute = require('./routes/parkingLot');

// Start the app
var app = express();

// Use routes
app.use('/', index);
app.use('/user', userRoute);
app.use('/vehicle', vehicleRoute);
app.use('/parkingLot', parkingLotRoute);

// Get the configuration options
// based on the config file parameters
var environment = app.get('env');
var config = require('./config')[environment];
var serverPort = config.serverPort;
var dbPort = config.dbPort;
var dbOptions = config.dbOptions;

// Connect to database
mongoose.connect(dbPort, dbOptions, function(err, data) {
    if(err) {
        console.log('could not connect to db: ' + dbPort);
        console.log(err);
    } else {
        console.log('Connected to db: ' + dbPort);
    }
});

// List on the server port
app.listen(serverPort, function(err, data) {
    if(err) {
        console.log('could not connect to server: ' + serverPort);
        console.log(err);
    } else {
        console.log('Server connected to port: ' + serverPort);
    }
});

module.exports = app;
