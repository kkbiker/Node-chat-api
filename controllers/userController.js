const userModel = require('../models/userModel');

exports.getAllUser = async (req, res) => {
    const users = await userModel.getAllUsers();
    res.json(users);
};

exports.createUser = async (req, res) => {
    const { name } = req.boby;
    await userModel.createUser(name);
};
