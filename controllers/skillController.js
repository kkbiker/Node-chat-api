const skillModel = require('../models/skillModel');

exports.getAllGenre = async (req, res) => {
    const genres = await skillModel.getAllGenre();
    res.json(genres);
};
