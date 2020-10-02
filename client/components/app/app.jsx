import React from 'react';
import SocketIO from 'socket.io-client';

import { Splash } from '../splash/splash';
import { Conversation } from '../conversation/conversation';

import { SocketStatus } from '../../constants';

export class App extends React.Component {
    constructor () {
        super();

        this.state = {
            status: SocketStatus.UNINITIALIZED,
            socket: null,
        };
    }

    componentDidMount () {
        const socket = new Promise((resolve, reject) => {
            const socket = SocketIO({
                timeout: 20000,
                randomizationFactor: 0,
                reconnectionAttempts: 3,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 1000,
            });

            socket.once('connect', () => resolve(socket));
            socket.once('reconnect_failed', () => reject(socket));
        });

        socket
            .then(socket => {
                this.setState({
                    socket: socket,
                    status: SocketStatus.CONNECTED,
                });
            })
            .catch(() => {
                this.setState({
                    socket: null,
                    status: SocketStatus.ERROR,
                });
            });

        this.setState({
            status: SocketStatus.CONNECTING
        });
    }

    render () {
        return (
            <AppView
                status={ this.state.status }
                socket={ this.state.socket } />
        );
    }
}

function AppView ({ status, socket }) {
    if (status == SocketStatus.CONNECTED) {
        return <Conversation socket={ socket } />;
    }
        
    return <Splash status={ status } />;
}