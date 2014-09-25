// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var parkingLot = require('./parkingLot');

// Client model definition
var clientSchema = new Schema({
	id: Schema.ObjectId,
		loginInformation: {
		userName: String,
		password: String,
		email: String,
		phoneNumner: String
	},
	parkingLots: [parkingLot]
})

// Set the model
mongoose.model('client', clientSchema);