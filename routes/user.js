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
