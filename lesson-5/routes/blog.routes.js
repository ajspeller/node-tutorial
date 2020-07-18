const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog.controller');

router.get('/', blogController.get_blogs);

router.get('/create', blogController.create_blog);

router.get('/:id', blogController.get_blog);

router.post('/', blogController.save_blog);

router.delete('/:id', blogController.delete_blog);

module.exports = router;
