
const connectDB = require('./Connections/connect');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routers/auth_router');
const detailDriver=require('./routers/driverrouter');
const departments=require('./routers/departments');
const endpoints=require('./routers/endpoints');

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/auth', authRoutes);
app.use('/user', detailDriver);
app.use('/depart',departments );
app.use('/endpoint', endpoints);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
