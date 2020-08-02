const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const uuid = require('uuid');
const SocketIO = require('socket.io');

function create_conversation () {
    return uuid.v4();
}

function find_friend_in_lobby (lobby) {
    while (lobby.length > 0) {
        const friend = lobby.shift();

        if (friend && friend.connected) {
            return friend;
        }
    }
}

const app = express();

app.use(helmet());

app.use(compression({
    level: 9
}));

app.use(express.static('./dist/client'));

const http = app.listen(process.env.PORT || 5000);

const io = SocketIO(http);

const lobby = [];

io.on('connection', socket => {
    socket.conversation = null;

    socket.on('global:lobby', () => {
        // Client must leave conversation to match again
        if (socket.conversation) {
            return;
        }

        // Find a friend waiting in lobby.
        const friend = find_friend_in_lobby(lobby);
        
        // Check if friend was found.
        if (friend) {
            // Create a new conversation
            const conversation = create_conversation();
            
            socket.conversation = conversation;
            friend.conversation = conversation;

            socket.join(conversation);
            friend.join(conversation);

            socket.emit('global:match');
            friend.emit('global:match');
        }

        // Otherwise, push client to wait in lobby.
        else {
            lobby.push(socket);
        }        
    });

    socket.on('conversation:text-message', message => {
        socket.to(socket.conversation).emit('conversation:text-message', message);
    });

    socket.on('conversation:leave', () => {
        socket.leave(socket.conversation);

        socket.conversation = null;
    });
});