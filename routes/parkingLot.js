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

// Get a parking lot by id (dev only)
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
            .where('geoLocation.longitude').gte(minLong).lte(maxLong)
            .where('geoLocation.latitude').gte(minLat).lte(maxLat)
            .select('name geoLocation');

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

module.exports = router;
