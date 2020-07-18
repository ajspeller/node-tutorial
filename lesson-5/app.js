require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const { allowedNodeEnvironmentFlags } = require('process');

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('listening on port 3000');
    });
    console.log('connected to db');
  })
  .catch((err) => {
    console.log('db connection failed: ', err);
  });

app.get('/add-blog', (req, res, next) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: ' about my blog',
    body: 'more about my blog',
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => console.log(e));
});
app.get('/all-blogs', (req, res, next) => {
  Blog.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => res.status(500).json({ error: e }));
});
app.get('/single-blog/:id', (req, res, next) => {
  console.log(req.params.id);
  Blog.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => res.status(500).json({ error: e }));
});

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'newviewslocation'); // if you want to change the location of the views

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About',
  });
});

// blog routes

app.get('/blogs', (req, res, next) => {
  console.log('inside /blogs');
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {
        title: 'All Blogs',
        blogs: result || [],
      });
    })
    .catch((err) => {
      console.log({ error: err });
    });
});

app.get('/blogs/create', (req, res, next) => {
  console.log('inside create');
  res.render('create', {
    title: 'Create',
  });
});

app.get('/blogs/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.render('blog', { title: 'Blog', blog: result });
    })
    .catch((err) => console.log('error: ', err));
});

app.post('/blogs', (req, res, next) => {
  const { title, snippet, body } = req.body;
  const newBlog = new Blog({
    title,
    snippet,
    body,
  });
  newBlog
    .save()
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('error: ', err);
    });
});

app.delete('/blogs/:id', (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.json({
        redirect: '/blogs',
      });
    })
    .catch((e) => console.log(e));
});

// 404 page
app.use((req, res, next) => {
  res.status(404).render('404', {
    title: '404',
  });
});
