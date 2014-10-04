// Dependencies
var express = require('express');
var mongoose = require('mongoose');

// Import routes
var index = require('./routes/index');
var userRoute = require('./routes/user');

// Start the app
var app = express();

// Get the configuration options
// based on the config file parameters
var config = require('./config')[app.get('env')];
var serverPort = config.serverPort;
var dbPort = config.dbPort;
var dbOptions = config.dbOptions;

// Use routes
app.use('/', index);
app.use('/user', userRoute);

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
