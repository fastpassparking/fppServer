// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ParkingLot model definition
var parkingLotSchema = new Schema({
	id: Schema.ObjectId,
	clientId: {
		type: String,
		required: true
	},
	name: String,
	costPerHour: {
		type: Number,
		required: true
	},
	centerLocation: {
		longitude: Number,
		latitude: Number
	},
	coordinates : [{
		longitude: Number,
		latitude: Number
	}],
	address: {
		street: String,
		state: String,
		city: String,
		zipcode: String,
		timeZone: String
	}
})

// Set the model
mongoose.model('parkingLot', parkingLotSchema);
