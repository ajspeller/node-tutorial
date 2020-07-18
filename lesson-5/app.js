const express = require('express');
const app = express();
const morgan = require('morgan');

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'newviewslocation'); // if you want to change the location of the views

app.use(express.static('public'));

app.use(morgan('dev'));

// app.use((req, res, next) => {
//   console.log('new request made');
//   console.log('hostname: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

app.get('/', (req, res, next) => {
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
  res.render('about', {
    title: 'About',
  });
});

app.get('/blogs/create', (req, res, next) => {
  res.render('create', {
    title: 'Create',
  });
});

// 404 page
app.use((req, res, next) => {
  res.status(404).render('404', {
    title: '404',
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
