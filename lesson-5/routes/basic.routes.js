const express = require('express');
const router = express.Router();
const basicController = require('../controllers/basic.controller');

router.get('/', basicController.get_blogs);

router.get('/about', basicController.get_about);

module.exports = router;
