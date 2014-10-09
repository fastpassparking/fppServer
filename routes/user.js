var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userModel = require('../models/user');

router.use(bodyParser.json());

// Get all users
router.get('/', function(req, res) {
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

// Validate email and password
router.get('/login', function(req, res) {
  var email = req.query.email;
  var password = req.query.password;
  if(email && password) {
    mongoose.model('user').findOne({'email': email }, function(err, user) {
      if(err) {
        console.log('error getting user');
        console.log(err);
        res.send(err);
      } else {
        if(user) {
          if(user.password == password) {
            res.send(user);
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

// Get user by id
router.get('/:id', function(req, res) {
  var id = req.param('id');
  mongoose.model('user').findOne({'_id': id }, function(err, user) {
    if(err) {
      console.log('error getting user');
      console.log(err);
      res.send(err);
    } else {
      if(user) {
        res.send(user);
      } else {
        // Return a 404 error because the object was not found
        res.status(404).json({error: 'no user was found for id: ' + id});
      }
    }
  })
});

// Create user
router.post('/', function(req, res) {
	var userToAdd = req.body.user;

	mongoose.model('user').create(userToAdd, function(err, user) {
		if(err) {
			console.log('error creating user:');
			console.log(userToAdd);
			console.log(err);
			res.send(err);
		} else {
			res.send(user);
		}
	})
})



module.exports = router;
