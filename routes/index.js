var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/user');
require('../models/vehicle');

/* GET home page */
router.get('/', function(req, res) {
	res.end('Server is running');
});

/* DEVELOPMENT ONLY ROUTES */
// Get all users
router.get('/users', function(req, res) {
  mongoose.model('user').find(function(err, users) {
  	if(err) {
  		console.log('error getting users');
  		console.log(err);
  		res.send(err);
  	} else {
  		res.send(users);
  	}
  })
});

// Get all clients
router.get('/clients', function(req, res) {
  mongoose.model('client').find(function(err, clients) {
    if(err) {
      console.log('error getting clients');
      console.log(err);
      res.send(err);
    } else {
      res.send(clients);
    }
  })
});

// Get all vehicles
router.get('/vehicles', function(req, res) {
  mongoose.model('vehicle').find(function(err, vehicles) {
  	if(err) {
  		console.log('error getting vehicles');
  		console.log(err);
  		res.send(err);
  	} else {
  		res.send(vehicles);
  	}
  })
});

// Return value of index
module.exports = router;