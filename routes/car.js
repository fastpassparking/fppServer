var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('../models/user');
require('../models/car');

router.use(bodyParser.json());

// Get all cars
router.get('/', function(req, res) {
  mongoose.model('car').find(function(err, cars) {
  	if(err) {
  		console.log('error getting cars');
  		console.log(err);
  		res.send(err);
  	} else {
  		res.send(cars);
  	}
  })
});

// Create car
router.post('/', function(req, res) {
  var userId = req.param('user_id');
	var carToAdd = req.body.car;

  if (userId) {
    // Find the user to ensure it exists
    mongoose.model('user').findOne({'_id': userId }, function(err, user) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(user) {
        // Add the car to the database
        carToAdd.userId = userId;
        mongoose.model('car').create(carToAdd, function(err, car) {
          if(err) {
            console.log('error creating car:');
            console.log(carToAdd);
            console.log(err);
            res.send(err);
          } else {
            res.send(car);
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

// Update a car
router.put('/', function(req, res) {
  var updatedCar = req.body.car;
  var userId = req.param('user_id');

  if (userId) {
    // Find the user to ensure it exists
    mongoose.model('user').findOne({'_id': userId }, function(err, user) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(user) {
        // Update the car in the database
        mongoose.model('car').findOne({'_id': updatedCar.id}, function(err, car) {
          if(err) {
            console.log('error creating car:');
            console.log(err);
            res.send(err);
          } else if(car) {
            // Only update certain fields
            car.license = updatedCar.license;
            car.make = updatedCar.make;
            car.model = updatedCar.model;
            car.color = updatedCar.color;
            car.save();
            res.send(car);
          } else {
            res.status(404).json({error: 'car not found in database'});
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
