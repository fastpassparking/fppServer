// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

// Routs
var index = require('./routes/index');
var users = require('./routes/users');

// Start the app
var app = express();


// Environments
app.use('/', index);
app.use('/users', users);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// For development database
if ('development' == app.get('env')) {
	//mongoDb host location
	//mongoose.connect('mongodb://55.55.55.5/fppDb');
}

// Load the database models from 
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
	if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;