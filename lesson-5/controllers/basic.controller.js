module.exports = {
  get_blogs: (req, res, next) => {
    res.redirect('/blogs');
  },
  get_about: (req, res, next) => {
    res.render('about', {
      title: 'About',
    });
  },
};
