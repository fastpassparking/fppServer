// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ParkingPayment model definition
var parkingPaymentSchema = new Schema({
	timeInitiated: {
		type: Date,
		required: true
	},
	amountOfTime: {
		type: Number,
		required: true
	},
	paymentAmount: {
		type: Number,
		required: true
	},
	lastFourOfCreditCard: String,
	fromAccountCredit: Boolean
})

// Set the model
mongoose.model('parkingPayment', parkingPaymentSchema);
