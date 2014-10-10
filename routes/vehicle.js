var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('../models/user');
require('../models/vehicle');

router.use(bodyParser.json());

// Create vehicle
router.post('/', function(req, res) {
  var userId = req.param('user_id');
  var vehicleToAdd = req.body.vehicle;

  if (userId) {
    // Find the user to ensure it exists
    mongoose.model('user').findOne({'_id': userId }, function(err, user) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(user) {
        // Add the vehicle to the database
        vehicleToAdd.userId = userId;
        mongoose.model('vehicle').create(vehicleToAdd, function(err, vehicle) {
          if(err) {
            console.log('error creating vehicle:');
            console.log(vehicleToAdd);
            console.log(err);
            res.send(err);
          } else {
            res.send(vehicle);
          }
        })
      } else {
        res.status(404).json({error: 'user not found'});
      }

  }) 
  } else {
    res.status(404).json({error: 'user_id parameter is required'});
  }
});

// Get all vehicles for a particular user
router.get('/', function(req, res) {
  var userId = req.param('user_id');

    if (userId) {
    // Find the user to ensure it exists
    mongoose.model('user').findOne({'_id': userId}, function(err, user) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(user) {
        // Get all the vehicles for this user
        mongoose.model('vehicle').find({'userId': userId}, function(err, vehicles) {
          if(err) {
            console.log('error getting all vehicles for user');
            console.log(err);
            res.send(err);
          } else {
            res.send(vehicles);
          }
        })
      } else {
        res.status(404).json({error: 'user not found'});
      }

  }) 
  } else {
    res.status(404).json({error: 'user_id parameter is required'});
  }
});

// Update a vehicle
router.put('/', function(req, res) {
  var updatedvehicle = req.body.vehicle;
  var userId = req.param('user_id');

  if (userId) {
    // Find the user to ensure it exists
    mongoose.model('user').findOne({'_id': userId }, function(err, user) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(user) {
        // Update the vehicle in the database
        mongoose.model('vehicle').findOne({'_id': updatedvehicle.id}, function(err, vehicle) {
          if(err) {
            console.log('error creating vehicle:');
            console.log(err);
            res.send(err);
          } else if(vehicle) {
            // Only update certain fields
            vehicle.license = updatedvehicle.license;
            vehicle.make = updatedvehicle.make;
            vehicle.model = updatedvehicle.model;
            vehicle.color = updatedvehicle.color;
            vehicle.save();
            res.send(vehicle);
          } else {
            res.status(404).json({error: 'vehicle not found in database'});
          }
        })
      } else {
        res.status(404).json({error: 'user not found'});
      }

  }) 
  } else {
    res.status(404).json({error: 'user_id parameter is required'});
  }
});

module.exports = router;
