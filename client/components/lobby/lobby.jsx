import React from 'react';

export class LobbyController extends React.Component {
    get socket () {
        return this.props.socket;
    }

    get actionEnterConversation () {
        return this.props.actionEnterConversation;
    }

    componentDidMount () {    
        this.socket.once('global:match', () => {
            this.actionEnterConversation();
        });

        this.socket.emit('global:lobby');
    }

    render () {
        return <LobbyView />;
    }
}

export class LobbyView extends React.Component {
    render () {
        return (
            <div>You are waiting for a friend...</div>
        );
    }
}