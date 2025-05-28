const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get('/showAll', skillController.getAllGenre);
router.get('/findPostList', skillController.findPostList);
router.post('/save', skillController.save);
router.get('/findArticleByid', skillController.findArticleByid);
router.get('/findArticlesByUserId', skillController.findArticlesByUserId);
router.post('/postStatus', skillController.postStatus);
router.post('/favorite', skillController.favorite);
router.get('/findByGenre', skillController.findByGenre);
router.get('/getComments', skillController.getComments);
router.post('/insertComment', skillController.insertComment);
router.get('/findArticlesByTitle', skillController.findArticlesByTitle);
router.post('/problem', skillController.problem);
router.get('/showFavorite', skillController.showFavorite);

module.exports = router;
