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
router.get('/byUser', function(req, res) {
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

// Get vehicle by id
router.get('/:id', function(req, res) {
  var id = req.param('id');
  mongoose.model('vehicle').findOne({'_id': id }, function(err, vehicle) {
    if(err) {
      console.log('error getting vehicle');
      console.log(err);
      res.send(err);
    } else {
      if(vehicle) {
        res.send(vehicle);
      } else {
        // Return a 404 error because the object was not found
        res.status(404).json({error: 'no vehicle was found for id: ' + id});
      }
    }
  })
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
        mongoose.model('vehicle').findOne({'_id': updatedvehicle._id}, function(err, vehicle) {
          if(err) {
            console.log('error creating vehicle:');
            console.log(err);
            res.send(err);
          } else if(vehicle) {
            // Only update certain fields
            vehicle.licensePlateNumber = updatedvehicle.licensePlateNumber;
            vehicle.licenseState = updatedvehicle.licenseState;
            vehicle.make = updatedvehicle.make;
            vehicle.model = updatedvehicle.model;
            vehicle.color = updatedvehicle.color;
            vehicle.year = updatedvehicle.year;
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
