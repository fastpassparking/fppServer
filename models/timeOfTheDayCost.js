/*
	Copyright (c) 2014 FastPassParking -
			Jason Braswell, Kyle Mera, Pedra Poveda

	All rights reserved.
*/

// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TimeOfTheDayCost model definition
var timeOfTheDayCostSchema = new Schema({
	id: Schema.ObjectId,
	startTime: Date,
	endTime: Date,
	cost: Number,
	costInterval: Number,
	oneTimeCost: Boolean
})

// Set the model
mongoose.model('timeOfTheDayCost', timeOfTheDayCostSchema);