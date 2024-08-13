const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
  },
  entryTime: {
    type: Date,
    required: true,
  },
  exitTime: {
    type: Date,
    required: true,
  },
  typeOfCarrying: {
    type: String,
    required: true,
  },
  sourceLocation: {
    type: String,
    required: true,
  },
  destinationLocation: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },

}, {
  timestamps: true, 
});


const User = mongoose.model('User', userSchema);

module.exports = User;
