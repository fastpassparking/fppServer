// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User model definition
var userSchema = new Schema({
	id: Schema.ObjectId,
	firstName: {
		type: String,
		required: true
	},
	lastName: {
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
	phoneNumber: String,
	availableCredit: {
		type: Number,
		default: 0.00
	}
})

// Set the model
mongoose.model('user', userSchema);