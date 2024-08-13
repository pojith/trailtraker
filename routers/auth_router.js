const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Employee = require('../models/login');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const employeeExists = await Employee.findOne({ email });
      
      if (employeeExists) {
        return res.status(400).json({ message: 'Employee already exists' });
      }
  
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
      const employee = await Employee.create({
        name,
        email,
        password,
        verificationCode,
      });
  
      res.status(201).json({
        message: 'Employee registered. Please verify your account.',
        verificationCode, // In a real application, do not return this in the response.
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering employee', error });
    }
  });

  router.post('/verify', async (req, res) => {
    const { email, verificationCode } = req.body;
  
    try {
      const employee = await Employee.findOne({ email });
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      if (employee.verificationCode === verificationCode) {
        employee.verified = true;
        employee.verificationCode = null;
        await employee.save();
  
        res.status(200).json({ message: 'Employee verified successfully' });
      } else {
        res.status(400).json({ message: 'Invalid verification code' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error verifying employee', error });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const employee = await Employee.findOne({ email });
  
      if (!employee || !(await employee.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      if (!employee.verified) {
        return res.status(400).json({ message: 'Account not verified' });
      }
  
      const token = generateToken(employee._id);
  
      res.status(200).json({
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });
  
  module.exports = router;
