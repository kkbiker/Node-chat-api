const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get('/showAll', skillController.getAllGenre);

module.exports = router;
