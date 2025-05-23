require("dotenv").config();

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: [process.env.APP_URL]
    }
});

const PORT = parseInt(process.env.PORT || "3001", 10);

io.on("connection", (socket) => {
    socket.on("send-message", (data) => {
        io.emit("receive-message", data);
    });
});

server.listen(PORT, () => console.log("サーバーが起動しました。"));
