
const connectDB = require('./Connections/connect');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routers/auth_router');
const detailDriver=require('./routers/driverrouter');
const app = express();
dotenv.config();
connectDB();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/auth', authRoutes);
app.use('/user', detailDriver);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
