module.exports = class Lobby {
    constructor () {
        this.sockets = [];
    }

    enter (client) {
        this.sockets.push(client);
    }

    async match () {
        while (this.sockets.length > 0) {
            const socket = this.sockets.shift();
    
            if (socket && socket.connected) {
                return socket;
            }
        }
    }
};