// websocket.js
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer();
const io = socketIo(server);

io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});


server.listen(5000, () => {
    console.log('WebSocket server running on port 5000');
});

module.exports = io;
