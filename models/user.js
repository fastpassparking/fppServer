// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User model definition
var userSchema = new Schema({
	id: Schema.ObjectId
})

// Set the model
mongoose.model('user', userSchema);