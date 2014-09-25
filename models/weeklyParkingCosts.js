// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dailyParkingCosts = require('./dailyParkingCosts');

// WeeklyParkingCosts model definition
var weeklyParkingCostsSchema = new Schema({
	id: Schema.ObjectId,
	parkingType: String,
	dailyParkingCosts: [dailyParkingCosts]
})

// Set the model
mongoose.model('weeklyParkingCosts', weeklyParkingCostsSchema);