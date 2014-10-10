// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// vehicle model definition
var vehicleSchema = new Schema({
	id: Schema.ObjectId,
	userId: {
		type: String,
		required: true
	},
	license: {
		plateNumber: String,
		state: String
	},
	make: String,
	model: String,
	color: String
})

// Set the model
mongoose.model('vehicle', vehicleSchema);