const skillModel = require('../models/skillModel');

exports.getAllGenre = async (req, res) => {
    const genres = await skillModel.getAllGenre();
    res.json(genres);
};

exports.findPostList = async (req, res) => {
    try {
        const rows = await skillModel.findPostList(req);
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ message: "取得失敗" });
    }
}

exports.findArticlesByUserId = async (req, res) => {
    const articles = await skillModel.findArticlesByUserId(req);
    res.status(200).json(articles);
};

exports.findByGenre = async (req, res) => {
    const article = await skillModel.findByGenre(req);
    res.status(200).json(article)
};

exports.findArticleByid = async (req, res) => {
    const article = await skillModel.findArticleByid(req);
    res.status(200).json(article);
};

exports.findArticlesByTitle = async (req, res) => {
    const articles = await skillModel.findArticlesByTitle(req);
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

exports.postStatus = async (req, res) => {
    try {
        await skillModel.postStatus(req);
        return res.status(200).json({ message: "更新完了" });
    } catch (err) {
        console.error(err);
    }
};

exports.favorite = async (req, res) => {
    try {
        await skillModel.favorite(req);
        return res.status(200).json({messsage: "お気に入り登録に成功しました。"});
    } catch (err) {
        console.log(err);
    }
};

exports.getComments = async (req, res) => {
    const {articleId} = req.query;
    try {
        const comments = await skillModel.getComments(articleId);
        return res.status(200).json(comments);
    } catch (err) {
        console.log(err);
    }
};

exports.insertComment = async (req, res) => {
    const {userId, articleId, comment} = req.body;
    try {
        await skillModel.insertComment(comment, userId, articleId);
        const comments = await skillModel.getComments(articleId);
        return res.status(200).json(comments);
    } catch (err) {
        console.log(err);
    }
}
