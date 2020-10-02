module.exports = class Lobby {
    constructor () {
        this.sockets = [];
    }

    enter (socket) {
        this.sockets.push(socket);
    }

    match () {
        while (this.sockets.length > 0) {
            const socket = this.sockets.shift();
    
            if (socket && socket.connected) {
                return socket;
            }
        }
    }
};