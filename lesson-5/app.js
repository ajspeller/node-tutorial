require('dotenv').config();
require('./database/db');
const express = require('express');
const app = express();
const morgan = require('morgan');

const blogRoutes = require('./routes/blog.routes');
const basicRoutes = require('./routes/basic.routes');

const notFoundController = require('./controllers/notfound.controller');

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'newviewslocation'); // if you want to change the location of the views

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

app.use('/', basicRoutes);
app.use('/blogs', blogRoutes);

// 404 page
app.use(notFoundController.notfound);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

module.exports = app;
