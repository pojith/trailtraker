const express = require('express');
const router = express.Router();
const {authenticate, authorizeVerified}=require('./view')
const dept = require('../models/centers');

router.post('/createdept', async (req, res) => {
    const { name,
        address,location,
    } = req.body;
  
    try {
        const deptsExists = await dept.findOne({ name });
      
      if (deptsExists) {
        return res.status(400).json({ message: 'depts already exists' });
      }
      const deptsdata = await dept.create({
        name,
        address,location,
      });
      await deptsdata.save();
      res.json(deptsdata);
    } catch (error) {
      res.status(500).json({ message: 'Error creating depts unit', error });
    }
  });

  router.get('/all',async(req,res)=>{
  try{
    const result =await dept.find();
    res.json(result);
  }
  catch(err){
    res.status(500).json({ message: 'Error accessing  depts unit', error });
  }
  })
  module.exports = router;

