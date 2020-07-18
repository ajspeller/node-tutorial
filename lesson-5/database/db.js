require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../app');

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log('db connection failed: ', err);
  });
