const Blog = require('../models/Blog');

module.exports = {
  get_blogs: (req, res, next) => {
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
  },
  create_blog: (req, res, next) => {
    res.render('create', {
      title: 'Create',
    });
  },
  get_blog: (req, res, next) => {
    Blog.findById(req.params.id)
      .then((result) => {
        console.log(result);
        res.render('blog', { title: 'Blog', blog: result });
      })
      .catch((err) => console.log('error: ', err));
  },
  save_blog: (req, res, next) => {
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
  },
  delete_blog: (req, res, next) => {
    Blog.findByIdAndDelete(req.params.id)
      .then((result) => {
        console.log(result);
        res.json({
          redirect: '/blogs',
        });
      })
      .catch((e) => console.log(e));
  },
};
