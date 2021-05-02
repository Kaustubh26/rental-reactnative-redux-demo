const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema to store GeoJSON point
const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const ApartmentSchema =  new Schema({
  name: {
  	type: String,
  	required: true
  },
  description: {
  	type: String,
  	required: true
  },
  area: {
  	type: Number,
  	required: true
  },
  price: {
  	type: Number,
  	required: true
  },
  dateAdded: {
  	type: Date,
	  default: Date.now
  },
  realtorId: {
  	type: String,
  	required: true
  },
  rooms:  {
  	type: Number,
  	required: true
  },
  location: {
    type: pointSchema,
    required: true
  },
  isRented:{
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = Apartment = mongoose.model("apartments", ApartmentSchema);
