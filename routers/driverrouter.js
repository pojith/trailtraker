const express = require('express');
const router = express.Router();
const {authenticate, authorizeVerified}=require('./view')
const drivers = require('../models/users');

router.post('/createuser', async (req, res) => {
    const { name,
        address,
        vehicleId,
        entryTime,
        exitTime,
        typeOfCarrying,
        sourceLocation,
        destinationLocation,
        currentLocation
    } = req.body;
  
    try {
        const usersExists = await drivers.findOne({ name });
      
      if (usersExists) {
        return res.status(400).json({ message: 'users already exists' });
      }
      const userdata = await drivers.create({
        name,
        address,
        vehicleId,
        entryTime,
        exitTime,
        typeOfCarrying,
        sourceLocation,
        destinationLocation,
        currentLocation
      });
      await userdata.save();
      res.json(userdata);
    } catch (error) {
      res.status(500).json({ message: 'Error creating users unit', error });
    }
  });

  router.get('/all',async(req,res)=>{
  try{
    const result =await drivers.find();
    res.json(result);
  }
  catch(err){
    res.status(500).json({ message: 'Error accessing  users unit', error });
  }
  })
  module.exports = router;

