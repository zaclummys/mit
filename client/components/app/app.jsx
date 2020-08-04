import React from 'react';
import SocketIO from 'socket.io-client';

import HeaderStyle from './header.css';

import { Alert } from '../alert/alert';
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
        };
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

    handleLeaveConversation () {
        this.leaveConversation();
    }

    handleMatch () {
        this.enterConversation();
    }

    view () {
        if (this.state.socket == null) {
            return <Alert>Connecting...</Alert>;
        }

        if (this.state.route == LOBBY) {
            return <LobbyController
                socket={ this.state.socket }
                onMatch={() => this.handleMatch()} />;
        }

        if (this.state.route == CONVERSATION) {
            return <ConversationController
                    socket={ this.state.socket }
                    onLeaveConversation={() => this.handleLeaveConversation()} />;
        }
    }

    render () {
        return (
            <div>
                <div className={ HeaderStyle.header }>
                    <div className={ HeaderStyle.title }>Mit</div>
                </div>

                { this.view() }
            </div>
        );
    }
}
