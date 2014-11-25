/*
	Copyright (c) 2014 FastPassParking -
			Jason Braswell, Kyle Mera, Pedra Poveda

	All rights reserved.
*/


// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var parkingPayment = require('./parkingPayment');

// ParkingPass model definition
var parkingPassSchema = new Schema({
	id: Schema.ObjectId,
	vehicleId: {
		type: String,
		required: true
	},
	parkingLotId: {
		type: String,
		required: true
	},
	parkingLotName: {
		type: String,
		required: true
	},
	costPerHour: {
		type: Number,
		required: true
	},
	parkingLocation: {
		latitude: Number,
		longitude: Number
	},
	startDateTime: {
		type: Date,
		required: true
	},
	endDateTime: {
		type: Date,
		required: true
	},
	parkingPayments: [parkingPayment]
})

// Set the model
mongoose.model('parkingPass', parkingPassSchema);
