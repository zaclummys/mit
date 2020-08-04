const SocketIO = require('socket.io');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const uuid = require('uuid');

const Lobby = require('./lib/lobby');

const app = express();

app.use(helmet());

app.use(compression({
    level: 9
}));

app.use(express.static('./dist/client'));

const server = app.listen(process.env.PORT || 5000);

const ws = SocketIO(server);

const lobby = new Lobby();

ws.on('connection', socket => {
    socket.conversation = null;

    socket.on('global:lobby', () => {
        if (socket.conversation) {
            return;
        }

        const friend = lobby.match();
        
        if (friend) {
            const conversation = uuid.v4();
            
            socket.conversation = conversation;
            friend.conversation = conversation;
            
            socket.join(conversation);
            friend.join(conversation);

            socket.emit('global:match');
            friend.emit('global:match');
        }
        else {
            lobby.enter(socket);
        }        
    });

    socket.on('conversation:text-message', ({ text }) => {
        if (socket.conversation) {
            socket.to(socket.conversation).emit('conversation:text-message', { text });
        }
    });

    socket.on('conversation:leave', () => {
        if (socket.conversation) {
            // Emit leave notification
            socket.to(socket.conversation).emit('conversation:leave');

            // Leave conversation
            socket.leave(socket.conversation);
        }

        socket.conversation = null;
    });

    socket.on('disconnect', () => {
        if (socket.conversation) {
            socket.to(socket.conversation).emit('conversation:disconnect');
        }
    });
});