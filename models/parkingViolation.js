// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ParkingViolation model definition
var parkingViolationSchema = new Schema({
	id: Schema.ObjectId,
	givenDateTime: Date,
	violationStartTime: Date,
	violationEndTime: Date,
	violationFee: Number,
	outstanding: Boolean
})

// Set the model
mongoose.model('parkingViolation', parkingViolationSchema);