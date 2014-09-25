// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ParkingPassValidation model definition
var parkingPassValidationSchema = new Schema({
	id: Schema.ObjectId,
	license: String,
	checkDateTime: Date,
	verdict: Boolean
})

// Set the model
mongoose.model('parkingPassValidation', parkingPassValidationSchema);