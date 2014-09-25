// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// AccountCredit model definition
var accountCreditSchema = new Schema({
	id: Schema.ObjectId,
	amount: Number,
	dateTimeAdded: Date,
	lastFourOfCreditCard: String
})

// Set the model
mongoose.model('accountCredit', accountCreditSchema);