const messageModel = require('../models/messageModel');

exports.getAllMessage = async (req, res) => {
    const messages = await messageModel.getAllMessage();
    res.json(messages);
};

exports.saveMessage = async (req, res) => {
    await messageModel.saveMessage(req);
}
