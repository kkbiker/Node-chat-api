const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.post('/', mailController.sendmail);

module.exports = router;
