var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('../models/parkingPass');
require('../models/parkingPayment');

router.use(bodyParser.json());

// Create parkingPass
router.post('/', function(req, res) {
  var vehicleId = req.param('vehicle_id');
  var lotId = req.param('lot_id');
  var parkingPayment = req.body.parkingPayment;

  if (vehicleId && lotId) {
    // Find the vehicle to ensure it exists
    mongoose.model('vehicle').findOne({'_id': vehicleId }, function(err, vehicle) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(vehicle) {

        // Find the parkingLot to ensure it exists
        mongoose.model('parkingLot').findOne({'_id': lotId}, function(err, parkingLot) {
          if(err) {
            console.log(err);
            res.send(err);
          } else if(parkingLot) {

            // Add the parkingPass to the database
            parkingPassToAdd = new Object();
            parkingPassToAdd.vehicleId = vehicleId;
            parkingPassToAdd.parkingLotId = lotId;
            parkingPassToAdd.parkingLotName = parkingLot.name;
            parkingPassToAdd.startDateTime = new Date();
            if(parkingPayment.amountOfTime) {
              parkingPassToAdd.endDateTime = new Date(parkingPassToAdd.startDateTime.getTime() 
                + parkingPayment.amountOfTime * 60000);
            }

            // Create a parkingPayment to add to the parkingPass
            parkingPayment.timeInitiated = new Date();
            parkingPassToAdd.parkingPayments = [];
            parkingPassToAdd.parkingPayments.push(parkingPayment);

            // Add the model to the database
            mongoose.model('parkingPass').create(parkingPassToAdd, function(err, parkingPass) {
              if(err) {
                console.log('error creating parkingPass:');
                console.log(parkingPass);
                console.log(err);
                res.send(err);
              } else {
                res.send(parkingPass);
              }
            })
          } else {
            res.status(404).json({error: 'parkingLot not found'});
          }
        })
      } else {
        res.status(404).json({error: 'vehicle not found'});
      }
    })
  } else {
    if(lotId) {
      res.status(404).json({error: 'vehicle_id parameter is required'});
    } else {
      res.status(404).json({error: 'lot_id parameter is required'});
    }
    
  }
});

// Get parkingPasses for User
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
            console.log('error getting all parkingPasses for user');
            console.log(err);
            res.send(err);
          } else {

            // Get all parking passes for each vehicle
            getAllParkingPasses(vehicles, function(err, data) {
              if(err) {
                res.send(err);
              } else {
                res.send(data);
              }
            });

            // Get all parking passes prototype
            function getAllParkingPasses(vehicles, callback) {
              var allParkingPasses = [];

              for(var i = 0; i < vehicles.length; i++) {
                var vehicleId = vehicles[i]._id;
                var query = mongoose.model('parkingPass').find({'vehicleId': vehicleId}).limit(5);
                query.exec(function(err, parkingPasses) {
                  if(err) {
                    console.log('error getting all parkingPasses for user');
                    console.log(err);
                    callback(err);
                  } else if(parkingPasses) {
                    allParkingPasses = allParkingPasses.concat(parkingPasses);
                    if((i) >= vehicles.length) {
                      callback(null, allParkingPasses);
                    }
                  }
                });
              }
            }
          }
        });
      } else {
        res.status(404).json({error: 'user not found'});
      }
    });
  } else {
    res.status(404).json({error: 'user_id parameter is required'});
  }
});

// Get parkingPasses for ParkingLot
router.get('/byParkingLot', function(req, res) {
  var lotId = req.param('lot_id');

    if (lotId) {
    // Find the lot to ensure it exists
    mongoose.model('parkingLot').findOne({'_id': lotId}, function(err, parkingLot) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(parkingLot) {
        // Get all the parking passes for this parkingLot
        mongoose.model('parkingPass').find({'parkingLotId': lotId}, function(err, parkingPasses) {
          if(err) {
            console.log('error getting all parkingPasses for parkingLot');
            console.log(err);
            res.send(err);
          } else {
            res.send(parkingPasses);
          }
        })
      } else {
        res.status(404).json({error: 'parking lot not found'});
      }

  }) 
  } else {
    res.status(404).json({error: 'lot_id parameter is required'});
  }
});

// Add time to a parking pass
router.put('/', function(req, res) {
  var parkingPassId = req.param('parking_pass_id');
  var parkingPayment = req.body.parkingPayment;

  if (parkingPassId) {
    // Find the parkingPass to ensure it exists
    mongoose.model('parkingPass').findOne({'_id': parkingPassId }, function(err, parkingPass) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(parkingPass) {
          parkingPayment.timeInitiated = new Date();

          // Add park payment object to parking pass
          parkingPass.parkingPayments.push(parkingPayment);

          // Update parking pass in the database
          vehicle.save();
          res.send(vehicle);
      } else {
        res.status(404).json({error: 'parkingPass not found'});
      }

  }) 
  } else {
    res.status(404).json({error: 'user_id parameter is required'});
  }
});

module.exports = router;
