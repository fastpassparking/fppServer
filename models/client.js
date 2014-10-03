// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var parkingLot = require('./parkingLot');

// Client model definition
var clientSchema = new Schema({
	id: Schema.ObjectId,
	companyName: String,
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
	parkingLots: [parkingLot]
})

// Set the model
mongoose.model('client', clientSchema);