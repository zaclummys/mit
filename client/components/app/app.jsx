import React from 'react';
import SocketIO from 'socket.io-client';

import { LobbyController } from '../lobby/lobby';
import { ConversationController } from '../conversation/conversation';

const LOBBY = 'LOBBY';
const CONVERSATION = 'CONVERSATION';

export default class App extends React.Component {
    constructor () {
        super();

        this.state = {
            socket: null,
            route: LOBBY,
        }
    }

    componentDidMount () {
        const socket = SocketIO();

        socket.on('connect', () => {
            this.setSocket(socket);
        });
    }

    setSocket (socket) {
        this.setState({
            socket
        });
    }

    setRoute (route) {
        this.setState({
            route
        });
    }

    enterConversation () {
        this.setRoute(CONVERSATION);
    }

    leaveConversation () {
        this.setRoute(LOBBY);
    }

    handleLeaveConversationButtonClick () {
        this.leaveConversation();
    }

    view () {
        if (this.state.socket == null) {
            return <div>Connecting...</div>;
        }

        if (this.state.route == LOBBY) {
            return <LobbyController
                socket={ this.state.socket }
                actionEnterConversation={() => this.enterConversation()} />;
        }

        if (this.state.route == CONVERSATION) {
            return <ConversationController
                    socket={ this.state.socket }
                    onLeaveConversationButtonClick={() => this.handleLeaveConversationButtonClick()} />;
        }
    }

    render () {
        return this.view();
    }
}
