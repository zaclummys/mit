const uuid = require('uuid');
const SocketIO = require('socket.io');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const Lobby = require('./lib/lobby');

const app = express();

app.use(helmet());
app.use(compression({
    level: 9
}));

app.use(express.static('./dist/client'));

const server = app.listen(process.env.PORT || 5000);

const sio = SocketIO(server, {
    cookie: false
});

const lobby = new Lobby();

sio.on('connection', socket => {
    socket.conversation = null;
    
    function leave () {        
        if (socket.conversation == null) {
            return;
        }

        // Emit leave notification
        socket.to(socket.conversation).emit('conversation:leave');

        // Leave conversation
        socket.leave(socket.conversation);

        // Clear conversation
        socket.conversation = null;        
    }

    socket.on('global:lobby', () => {
        if (socket.conversation) {
            leave();
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

    socket.on('conversation:text-message', message => {
        if (socket.conversation == null) {
            return;
        }

        if (message == null) {
            return;
        }

        socket.to(socket.conversation).emit('conversation:text-message', {
            text: message.text,
        });
    });

    socket.on('conversation:leave', leave);
});