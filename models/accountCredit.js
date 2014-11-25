/*
	Copyright (c) 2014 FastPassParking -
			Jason Braswell, Kyle Mera, Pedra Poveda

	All rights reserved.
*/


// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// AccountCredit model definition
var accountCreditSchema = new Schema({
	id: Schema.ObjectId,
	userId: {
		type: String,
		required: true
	},
	amount: {
		type: Number
		required: true
	} 
	dateTimeAdded: {
		type: Date
		required: true
	},
	lastFourOfCreditCard: {
		type: String
		required, true
	}
})

// Set the model
mongoose.model('accountCredit', accountCreditSchema);