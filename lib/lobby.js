module.exports = class Lobby {
    constructor () {
        this.clients = [];
    }

    enter (client) {
        this.clients.push(client);
    }

    match () {
        while (this.clients.length > 0) {
            const client = this.clients.shift();
    
            if (client && client.connected) {
                return client;
            }
        }
    }
};