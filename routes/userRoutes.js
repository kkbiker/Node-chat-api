const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUser);
router.post('/register', userController.createUser);
router.post('/login', userController.getUser);

module.exports = router;
