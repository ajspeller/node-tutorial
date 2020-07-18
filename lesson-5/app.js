const express = require('express');
const { RSA_NO_PADDING } = require('constants');
const app = express();

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'newviewslocation'); // if you want to change the location of the views

app.get('/', (req, res, next) => {
  // res.send('<p>index.html</p>');
  // console.log(__dirname);
  // res.sendFile('./views/index.html', { root: __dirname });
  const blogs = [
    { title: 'Running', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    { title: 'Jumping', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    { title: 'Walking', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
  ];
  res.render('index', {
    title: 'Home',
    blogs,
  });
});

app.get('/about', (req, res, next) => {
  // res.send('<p>about.html</p>');
  // console.log(__dirname);
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', {
    title: 'About',
  });
});

// redirect
app.get('/about-us', (req, res, next) => {
  res.redirect('/about');
});

app.get('/blogs/create', (req, res, next) => {
  res.render('create', {
    title: 'Create',
  });
});

// 404 page
app.use((req, res, next) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', {
    title: '404',
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
