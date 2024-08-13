const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  }
});

const endpointSchema = new mongoose.Schema({
  ownername: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: locationSchema, 
    required: true,
  }

}, {
  timestamps: true, 
});

const Endpoint = mongoose.model('endpoint', endpointSchema);

module.exports = Endpoint;
