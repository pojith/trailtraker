const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URl

const connectDB = async () => {
    try {
      await mongoose.connect(url);
      console.log('Connected to MongoDB successfully');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); 
    }
  };
  
  module.exports = connectDB;

