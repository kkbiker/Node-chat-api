const messageController = require('../controllers/messageController');

module.exports = (io) => {
    io.on('connection', socket => {
        socket.on("send-message", async (data) => {
            const { message } = data;
            await messageController.saveMessage(message);
            
            io.emit("receive-message", data);
        });
    });
};
