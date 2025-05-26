require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const chatSocket = require('./socket/chatSocket');

const PORT = parseInt(process.env.PORT || '3001', 10);

app.use(cors({
    origin: [process.env.APP_URL],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());

app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/userRoutes'));
app.use('/mailsend', require('./routes/mailRoutes'));
app.use('/chat', require('./routes/messageRoutes'));
app.use('/genre', require('./routes/genreRoutes'));

const io = new Server(server, {
    cors: {
        origin: [process.env.APP_URL],
        methods: ['GET', 'POST']
    }
});

chatSocket(io);

server.listen(PORT, () => console.log("サーバーが起動しました。"));
