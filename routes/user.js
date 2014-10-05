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

//get specific user
router.get('/:id', function(req, res) {
  mongoose.model('user').findOne({'_id': req.param('id') }, function(err, user) {
  	if(err) {
  		console.log('error getting user');
  		console.log(err);
  		res.send(err);
  	} else {
  		console.log(user);
  		res.send(user);
  		
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
