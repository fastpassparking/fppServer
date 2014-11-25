/*
	Copyright (c) 2014 FastPassParking -
			Jason Braswell, Kyle Mera, Pedra Poveda

	All rights reserved.
*/

// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ParkingViolation model definition
var parkingViolationSchema = new Schema({
	id: Schema.ObjectId,
	vehicleId: {
		type: String,
		required: true
	},
	givenDateTime: Date,
	violationStartTime: Date,
	violationEndTime: Date,
	violationFee: Number,
	outstanding: Boolean
})

// Set the model
mongoose.model('parkingViolation', parkingViolationSchema);