const skillModel = require('../models/skillModel');

exports.getAllGenre = async (req, res) => {
    const genres = await skillModel.getAllGenre();
    res.json(genres);
};

exports.findArticlesByUserId = async (req, res) => {
    const articles = await skillModel.findArticlesByUserId(req);
    res.status(200).json(articles);
};

exports.findArticleByid = async (req, res) => {
    const articles = await skillModel.findArticleByid(req);
    res.status(200).json(articles);
};

exports.save = async (req, res) => {
    try {
        if (req.body.postId) {
            skillModel.deleteArticle(req);
        }

        const parentId = await skillModel.saveArticle(req);

        if (req.body.subposts) {
            for (const subpost of req.body.subposts) {
                await skillModel.saveSubArticle(subpost, parentId);
            }
        }

        return res.status(200).json({ parentId: parentId });
    } catch (err) {
        console.log(err);
    }
};

exports.saveSubArticle = async (req, res) => {
    await skillModel.saveSubArticle(req);
};

exports.deleteArticle = async (req, res) => {
    await skillModel.deleteArticle(req);
};
