const express = require('express');
const router = express.Router();
const checkImage = require('../controllers/imageController');

router.route('/').post(checkImage);

module.exports = router;