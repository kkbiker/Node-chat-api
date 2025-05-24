const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getAllMessage);
router.post('/', messageController.saveMessage);

module.exports = router;
