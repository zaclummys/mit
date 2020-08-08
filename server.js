const uuid = require('uuid');
const SocketIO = require('socket.io');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const Lobby = require('./lib/lobby');
const SocketConversation = require('./lib/socket-conversation');

const app = express();
const io = SocketIO();

const lobby = new Lobby();
const socket_conversation = new SocketConversation();

app.use(helmet());
app.use(compression({
    level: 9
}));

app.use(express.static('./dist/client'));

io.on('connection', socket => {
    function leave () {        
        const conversation = socket_conversation.get(socket);

        if (conversation) {
            // Emit leave notification
            socket.to(conversation).emit('conversation:leave');

            // Leave conversation
            socket.leave(conversation);

            // Clear conversation
            socket_conversation.leave(socket);
        }
    }

    socket.on('global:lobby', () => {
        if (socket_conversation.has(socket)) {
            leave();
        }

        const friend = lobby.match();
        
        if (friend) {
            const conversation = uuid.v4();
            
            socket_conversation.enter(socket, conversation);
            socket_conversation.enter(friend, conversation);
            
            socket.join(conversation);
            friend.join(conversation);

            socket.emit('global:match');
            friend.emit('global:match');
        }
        else {
            lobby.enter(socket);
        }        
    });

    socket.on('conversation:text-message', message => {        
        const conversation = socket_conversation.get(socket);

        if (conversation == null) {
            return;
        }
        
        if (message == null) {
            return;
        }
        
        const text = message.text;

        socket.to(conversation).emit('conversation:text-message', {
            text,
        });
    });

    socket.on('conversation:leave', () => {
        leave();
    });

    socket.on('disconnect', () => {
        const conversation = socket_conversation.get(socket);     

        if (conversation) {
            socket.to(conversation).emit('conversation:disconnect');
        }
    });
});

const server = app.listen(process.env.PORT || 5000);

io.listen(server, {
    cookie: false
});