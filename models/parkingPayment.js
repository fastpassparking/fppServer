// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ParkingPayment model definition
var parkingPaymentSchema = new Schema({
	id: Schema.ObjectId,
	startDateTime: Date,
	endDateTie: Date,
	timeInitiated: Date,
	paymentAmount: Number,
	lastFourOfCreditCard: String,
	fromAccountCredit: Boolean
})

// Set the model
mongoose.model('parkingPayment', parkingPaymentSchema);