// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User model definition
var userSchema = new Schema({
	id: Schema.ObjectId,
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
	availableCredit: Number
})

// Set the model
mongoose.model('user', userSchema);