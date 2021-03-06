/*
	Copyright (c) 2014 FastPassParking -
			Jason Braswell, Kyle Mera, Pedra Poveda

	All rights reserved.
*/

// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ParkingPassValidation model definition
var parkingPassValidationSchema = new Schema({
	id: Schema.ObjectId,
	parkingLotId: {
		type: String,
		required: true
	},
	license: String,
	checkDateTime: Date,
	verdict: Boolean
})

// Set the model
mongoose.model('parkingPassValidation', parkingPassValidationSchema);