// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Client model definition
var clientSchema = new Schema({
	id: Schema.ObjectId,
	companyName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phoneNumber: String
})

// Set the model
mongoose.model('client', clientSchema);