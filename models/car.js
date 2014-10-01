// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Car model definition
var carSchema = new Schema({
	id: Schema.ObjectId,
	license: String,
	make: String,
	model: String,
	color: String
})

// Set the model
mongoose.model('car', carSchema);