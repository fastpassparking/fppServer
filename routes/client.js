var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('../models/client');


router.use(bodyParser.json());


// Creating a client 
router.post('/', function(req, res) {
	var newClient = req.body.client;

	mongoose.model('client').create(newClient, function(err, clientCreated) {
		if (err) {
			console.log('Error creating client');
			console.log(newClient);
			console.log(err);
			res.send(err);
		} else {
			res.send(clientCreated);
		}
	})
});


// Validate email and password
router.get('/login', function(req, res) {
  var email = req.query.email;
  var password = req.query.password;
  if(email && password) {
    mongoose.model('client').findOne({'email': email }, function(err, client) {
      if(err) {
        console.log('error getting client');
        console.log(err);
        res.send(err);
      } else {
        if(client) {
          if(client.password == password) {
            res.send(client);
          } else {
            // Return a 403 error because further access is forbidden 
            res.status(403).json({error: 'incorrect password'});
          }
        } else {
          // Return a 404 error because the object was not found
          res.status(404).json({error: 'incorrect email'});
        }
      }
    })
  } else {
    // Return a 400 error because the required
    // parameter was not provided
    if(email == null) {
      res.status(400).json({error: 'email parameter was not recieved'});
    } else {
      res.status(400).json({error: 'password parameter was not recieved'});
    }
  }
});

// Get client by id 
router.get('/:id', function(req, res) {
	var id = req.param('id');

	mongoose.model('client').findOne({"_id" : id} , function(err, client) {
		if (err) {
			console.log('Error finding client.');
			console.log(err);
			res.send(err);
		} else {
			res.send(client);
		}
	})
});


module.exports = router;