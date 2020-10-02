const express = require('express');
const compression = require('compression');
const uuid = require('uuid');
const SocketIO = require('socket.io');

const Lobby = require('./lib/lobby');

const app = express();
const io = SocketIO();

const lobby = new Lobby();

app.use(compression());
app.use(express.static('./dist/client'));

io.on('connection', socket => {
    socket.timeout = null;
    socket.conversation = null;

    function leave () {
        if (socket.conversation == null) {
            return;
        }

        socket.to(socket.conversation).emit('conversation:leave');

        socket.leave(socket.conversation);

        socket.conversation = null;
    }

    socket.on('connect', () => {
        if (socket.timeout) {
            clearTimeout(socket.timeout);

            socket.timeout = null;
        }
    });

    socket.on('conversation:start', () => {
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

            socket.emit('conversation:match');
            friend.emit('conversation:match');
        }
        else {
            lobby.enter(socket);
        }        
    });

    socket.on('conversation:message', ({ text } = {}) => {   
        const conversation = socket.conversation;

        if (conversation == null) {
            return;
        }
        
        if (text == null) {
            return;
        }

        text = text.trim();

        if (text == '') {
            return;
        }

        socket.to(conversation).emit('conversation:message', {
            text
        });
    });

    socket.on('conversation:leave', leave);

    socket.on('disconnect', () => {
        if (socket.conversation == null) {
            return;
        }

        socket.timeout = setTimeout(() => {
            if (socket.disconnected) {
                leave();
            }
        }, 63000);
    });
});

io.listen(
    app.listen(process.env.PORT || 5000)
);