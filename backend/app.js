const express = require('express');
const bodyParser = require('body-parser');


const app = express();

// const Student = require('./models/student');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');

//connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/students') //student database
  .then(() => {console.log('Connected to Database')})
  .catch((err) => {console.log(err)});
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use("/api/students", studentRoutes);


module.exports = app;
