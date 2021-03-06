/*
    Copyright (c) 2014 FastPassParking -
            Jason Braswell, Kyle Mera, Pedra Poveda

    All rights reserved.
*/


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('../models/parkingLot');

router.use(bodyParser.json());

// Important variables
var LAT_LONG_SEARCH_AREA = 3.0; // Degrees

router.post('/', function(req, res) {
    var newLot = req.body.parkingLot;
    var clientId = req.param('client_id');
    if (clientId) {
        // Find the client to ensure it exists
        mongoose.model('client').findOne({ '_id': clientId }, function(err, client) {
            if (err) {
                console.log(err);
                res.send(err);
            } else if (client) {
                // Add the lot to the database
                newLot.clientId = clientId;
                mongoose.model('parkingLot').create(newLot, function(err, parkingLotCreated) {
                    if (err) {
                        console.log('Error creating parking lot.');
                        console.log(newLot);
                        console.log(err);
                        res.send(err);
                    } else {
                        res.send(parkingLotCreated);
                    }
                })
            } else {
                res.status(404).json({
                    error: 'client not found'
                });
            }

        })
    } else {
        res.status(404).json({
            error: 'client_id parameter is required'
        });
    }
});

// Get all lots for a particular client
router.get('/', function(req, res) {
  var clientId = req.param('client_id');

    if (clientId) {
    // Find the client to ensure it exists
    mongoose.model('client').findOne({'_id': clientId}, function(err, client) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(client) {
        // Get all the lots for this client
        mongoose.model('parkingLot').find({'clientId': clientId}, function(err, lots) {
          if(err) {
            console.log('error getting all lots for client');
            console.log(err);
            res.send(err);
          } else {
            res.send(lots);
          }
        })
      } else {
        res.status(404).json({error: 'client not found'});
      }

  }) 
  } else {
    res.status(404).json({error: 'client_id parameter is required'});
  }
});

//remove parking Lot by ID
router.delete('/delete', function(req, res) {
  var lotId = req.param('lot_id');

    if (lotId) {
    // Find the client to ensure it exists
    mongoose.model('parkingLot').remove({'_id': lotId}, function(err, lot) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(lot) {
        res.send('lot with id' + lotId + ' removed ' + lot);
        
      } else {
        res.status(404).json({error: 'lotid not found'});
      }

  }) 
  } else {
    res.status(404).json({error: 'lot_id parameter is required'});
  }
});

// Get a parking lot by id
router.get('/details/:id', function(req, res) {
    var id = req.param('id');

    mongoose.model('parkingLot').findOne({
        "_id": id
    }, function(err, parkingLot) {
        if (err) {
            console.log('Error finding parking lot.');
            console.log(newLot);
            console.log(err);
            res.send(err);
        } else {
            res.send(parkingLot);
        }
    })
});

// Get Parking Lot within a bounding box
router.get('/byBoundingBox', function(req, res) {
    var validParameters = true,
        minLat = req.query.minLat,
        maxLat = req.query.maxLat,
        minLong = req.query.minLong,
        maxLong = req.query.maxLong;

    // Let's null-check the parameters
    if (minLat && maxLat && minLong && maxLong) {

        minLat = parseFloat(minLat);
        maxLat = parseFloat(maxLat);
        minLong = parseFloat(minLong);
        maxLong = parseFloat(maxLong);

        // Validate ranges
        if (minLat > maxLat || minLong > maxLong) {
            res.status(400).json({
                error: 'Minimum values cannot be larger than maximum values.'
            });
            validParameters = false;
        } else {

            // Prevent being able to query whole db...
            if (maxLat - minLat > LAT_LONG_SEARCH_AREA || maxLong - minLong > LAT_LONG_SEARCH_AREA) {
                res.status(400).json({
                    error: 'Range cannot be greater than threshold.'
                });
                validParameters = false;
            }
        }

    } else {
        res.status(400).json({
            error: 'Parameters missing.'
        });
        validParameters = false;
    }

    // Process request
    if (validParameters) {
        var query = mongoose.model('parkingLot')
            .find()
            .where('centerLocation.longitude').gte(minLong).lte(maxLong)
            .where('centerLocation.latitude').gte(minLat).lte(maxLat);

        // Retrieve parking lots within bounds
        query.exec(function(err, lots) {
            if (err) {
                console.log('Error getting parking lots.');
                console.log(err);
                res.send(err);
            } else {
                res.send(lots);
            }
        });
    }

});

// Update a vehicle
router.put('/', function(req, res) {
  var lot = req.body.parkingLot;

  if (lot) {
    // Find the parkingLot to ensure it exists
    mongoose.model('parkingLot').findOne({'_id': lot._id }, function(err, returnedLot) {
      if(err) {
        console.log(err);
        res.send(err);
      } else if(returnedLot) {
        // Update the parkingLot in the database
        if(lot.name) returnedLot.name = lot.name;
        if(lot.address) returnedLot.address = lot.address;
        if(lot.costPerHour) returnedLot.costPerHour = lot.costPerHour;
        if(lot.centerLocation) returnedLot.centerLocation = lot.centerLocation;
        if(lot.coordinates) returnedLot.coordinates = lot.coordinates;

        returnedLot.save();
        res.send(returnedLot);
        
      } else {
        res.status(404).json({error: 'parkingLot not found'});
      }

  }) 
  } else {
    res.status(404).json({error: 'parkingLot body is required'});
  }
});

module.exports = router;
