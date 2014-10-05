// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dailyParkingCosts = require('./dailyParkingCosts');

// WeeklyParkingCosts model definition
var weeklyParkingCostsSchema = new Schema({
	id: Schema.ObjectId,
	parkingLotId: {
		type: String,
		required: true
	},
	parkingType: String,
	dailyParkingCosts: [dailyParkingCosts],
	parkingCostsOverrides: [dailyParkingCosts]
})

// Set the model
mongoose.model('weeklyParkingCosts', weeklyParkingCostsSchema);