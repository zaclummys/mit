module.exports = class SocketConversation {
    constructor () {
        this.conversations = new WeakMap();
    }
    
    enter (socket, conversation) {
        this.conversations.set(socket, conversation);
    }
    
    leave (socket) {
        this.conversations.delete(socket);
    }
    
    get (socket) {
        return this.conversations.get(socket);
    }

    has (socket) {
        return this.conversations.has(socket);
    }
}