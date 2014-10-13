// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var parkingPayment = require('./parkingPayment');

// ParkingPass model definition
var parkingPassSchema = new Schema({
	id: Schema.ObjectId,
	vehicleId: {
		type: String,
		required: true
	},
	parkingLotId: {
		type: String,
		required: true
	},
	parkingType: String,
	parkingLocation: {
		latitude: Number,
		longitude: Number
	},
	startDateTime: {
		type: Date,
		required: true
	},
	endDateTime: {
		type: Date,
		required: true
	},
	parkingPayments: [parkingPayment]
})

// Set the model
mongoose.model('parkingPass', parkingPassSchema);
