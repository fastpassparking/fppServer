// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var weeklyParkingCosts = require('./weeklyParkingCosts');
var dailyParkingCosts = require('./dailyParkingCosts');
var parkingPass = require('./parkingPass');

// ParkingLot model definition
var parkingLotSchema = new Schema({
	id: Schema.ObjectId,
	name: String,
	location: {
		street: String,
		state: String,
		city: String,
		zipcode: String,
		latitude: Number,
		longitude: Number
	},
	weeklyParkingCosts: [weeklyParkingCosts],
	parkingCostsOverrides: [dailyParkingCosts],
	currentParkingPasses: [parkingPass],
	parkingPassHistory: [Schema.ObjectId],
	parkingPassValidationHistory: [Schema.ObjectId]
})

// Set the model
mongoose.model('parkingLot', parkingLotSchema);