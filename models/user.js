// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var car = require('./car');
var parkingPass = require('./parkingPass');
var parkingViolation = require('./parkingViolation');

// User model definition
var userSchema = new Schema({
	id: Schema.ObjectId,
	accountInformation: {
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		phoneNumner: String
	},
	cars: [car],
	availableCredit: Number,
	accountCreditHistory: [Schema.ObjectId],
	currentParkingPasses: [parkingPass],
	parkingPassHistory: [Schema.ObjectId],
	outstandingParkingViolations: [parkingViolation],
	parkingViolationHistory: [Schema.ObjectId]
})

// Set the model
mongoose.model('user', userSchema);