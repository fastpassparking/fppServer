// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timeOfTheDayCost = require('./timeOfTheDayCost');

// DailyParkingCosts model definition
var dailyParkingCostsSchema = new Schema({
	id: Schema.ObjectId,
	costTimePeriods: [timeOfTheDayCost],
	feeTimePeriods: [timeOfTheDayCost]
})

// Set the model
mongoose.model('dailyParkingCosts', dailyParkingCostsSchema);