const express = require('express');
const router = express.Router();
const {authenticate, authorizeVerified}=require('./view')
const endpoint = require('../models/endpoint');

router.post('/createendpoint', async (req, res) => {
    const { ownername,
        address,location,
    } = req.body;
  
    try {
        const endpointsExits = await endpoint.findOne({ ownername });
      
      if (endpointsExits) {
        return res.status(400).json({ message: 'endpoint already exists' });
      }
      const endpointed = await endpoint.create({
        ownername,
        address,location,
      });
      await endpointed.save();
      res.json(endpointed);
    } catch (error) {
      res.status(500).json({ message: 'Error creating end point unit', error });
    }
  });

  router.get('/all',async(req,res)=>{
  try{
    const result =await endpoint.find();
    res.json(result);
  }
  catch(err){
    res.status(500).json({ message: 'Error accessing  endpoint unit', error });
  }
  })
  module.exports = router;

