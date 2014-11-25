/*
	Copyright (c) 2014 FastPassParking -
			Jason Braswell, Kyle Mera, Pedra Poveda

	All rights reserved.
*/

// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// vehicle model definition
var vehicleSchema = new Schema({
	id: Schema.ObjectId,
	userId: {
		type: String,
		required: true
	},
	licensePlateNumber: {
		type: String,
		required: true
	},
	licenseState: {
		type: String,
		required: true
	},
	make: String,
	model: String,
	color: String,
	year: String
})

// Set the model
mongoose.model('vehicle', vehicleSchema);