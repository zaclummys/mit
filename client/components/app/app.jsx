import React from 'react';
import SocketIO from 'socket.io-client';

import { Alert } from '../alert/alert';
import { Header } from '../header/header';
import { LobbyController } from '../lobby/lobby';
import { ConversationController } from '../conversation/conversation';

export class AppController extends React.Component {
    constructor () {
        super();

        this.state = {
            socket: null,
            conversation: false,
        };
    }

    componentDidMount () {
        const socket = SocketIO();

        socket.once('connect', () => {
            this.setSocket(socket);
        });
    }

    setSocket (socket) {
        this.setState({
            socket
        });
    }

    setConversation (conversation) {
        this.setState({
            conversation
        });
    }

    enterConversation () {
        this.setConversation(true);
    }

    leaveConversation () {
        this.setConversation(false);
    }

    handleLeaveConversation () {
        this.leaveConversation();
    }

    actionEnterConversation () {
        this.enterConversation();
    }

    actionEnterLobby () {
        this.leaveConversation();
    }

    render () {
        return <AppView
            socket={ this.state.socket }
            conversation={ this.state.conversation }
            actionEnterLobby={() => this.actionEnterLobby()}
            actionEnterConversation={() => this.actionEnterConversation()} />
    }
}

export function AppView ({
    socket,
    conversation,
    actionEnterLobby,
    actionEnterConversation,
}) {
    return (
        <div>
            <Header />
            
            <AppViewContent
                socket={ socket }
                conversation={ conversation }
                actionEnterLobby={ actionEnterLobby }
                actionEnterConversation={ actionEnterConversation } />
        </div>
    );
}

export function AppViewContent ({
    socket,
    conversation,
    actionEnterLobby,
    actionEnterConversation,
}) {
    if (socket == null) {
        return <Alert>Connecting...</Alert>;
    }

    if (conversation) {
        return <ConversationController
                socket={ socket }
                actionEnterLobby={ actionEnterLobby } />;
    }
    else {
        return <LobbyController
            socket={ socket }
            actionEnterConversation={ actionEnterConversation } />;
    }
}