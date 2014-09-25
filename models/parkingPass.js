// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var parkingPayment = require('./parkingPayment');

// ParkingPass model definition
var parkingPassSchema = new Schema({
	id: Schema.ObjectId,
	carId: Schema.ObjectId,
	parkingLotId: Schema.ObjectId,
	parkingType: String,
	parkingLocation: {
		latitude: Number,
		longitude: Number
	},
	parkingPayments: [parkingPayment]
})

// Set the model
mongoose.model('parkingPass', parkingPassSchema);