import React from 'react';
import { Alert } from '../alert/alert';

export class LobbyController extends React.Component {
    constructor () {
        super();

        this.handleSocketMatch = () => {
            // Add a delay to improve user experience
            setTimeout(() => {
                this.props.onMatch();
            }, 500);
        };
    }

    get socket () {
        return this.props.socket;
    }

    componentDidMount () {    
        this.socket.on('global:match', this.handleSocketMatch);

        this.socket.emit('global:lobby');
    }

    componentWillUnmount () {
        this.socket.off('global:match', this.handleSocketMatch);
    }

    render () {
        return <LobbyView />;
    }
}

export class LobbyView extends React.Component {
    render () {
        return (
            <Alert>You're waiting for a friend...</Alert>
        );
    }
}