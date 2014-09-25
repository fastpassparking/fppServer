// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ParkingLot model definition
var parkingLotSchema = new Schema({
	id: Schema.ObjectId,
	name: String,
	location: {
		street: String,
		state: String,
		city: String,
		zipcode: String,
		latitude: Number,
		longitude: Number
	}
})

// Set the model
mongoose.model('parkingLot', parkingLotSchema);