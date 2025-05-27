const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get('/showAll', skillController.getAllGenre);
router.post('/save', skillController.save);
router.get('/findArticleByid', skillController.findArticleByid);
router.get('/findArticlesByUserId', skillController.findArticlesByUserId);

module.exports = router;
