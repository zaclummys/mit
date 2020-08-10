const SocketIO = require('socket.io');
const express = require('express');
const compression = require('compression');

const imagemin = require('imagemin');
const imageminJPEGTran = require('imagemin-jpegtran');
const imageminOptiPNG = require('imagemin-optipng');

const Lobby = require('./lib/lobby');
const SocketConversation = require('./lib/socket-conversation');

const app = express();
const io = SocketIO();

const lobby = new Lobby();
const socket_conversation = new SocketConversation();

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
            socket_conversation.exit(socket);
        }
    }

    socket.on('global:lobby', async () => {
        if (socket_conversation.has(socket)) {
            leave();
        }

        const friend = await lobby.match();
        
        if (friend) {
            const conversation = await socket_conversation.create();
            
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

    socket.on('conversation:text-message', ({ text } = {}) => {        
        const conversation = socket_conversation.get(socket);

        if (conversation == null) {
            return;
        }
        
        if (text == null) {
            return;
        }

        socket.to(conversation).emit('conversation:text-message', {
            text,
        });
    });

    socket.on('conversation:image-message', async ({ image } = {}) => {        
        const conversation = socket_conversation.get(socket);
        
        if (conversation == null) {
            return;
        }
    
        if (image == null) {
            return;
        }

        const output = await imagemin.buffer(image, {
            plugins: [
                imageminJPEGTran(),
                imageminOptiPNG({
                    optimizationLevel: 0
                })
            ]
        });

        socket.to(conversation).emit('conversation:image-message', {
            image: output
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