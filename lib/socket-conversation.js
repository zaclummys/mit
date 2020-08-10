const uuid = require('uuid');

module.exports = class SocketConversation {
    constructor () {
        this.conversations = new WeakMap();
    }

    async create () {
        return uuid.v4();
    }
    
    enter (socket, conversation) {
        this.conversations.set(socket, conversation);
    }
    
    exit (socket) {
        this.conversations.delete(socket);
    }
    
    get (socket) {
        return this.conversations.get(socket);
    }

    has (socket) {
        return this.conversations.has(socket);
    }
}