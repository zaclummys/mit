import React from 'react';
import ConversationStyle from './conversation.css';

import { Alert } from '../alert/alert';
import { Messages } from '../messages/messages';
import { ConversationFooterController } from '../conversation-footer/conversation-footer';

const LEFT = 'left';
const RIGHT = 'right';

export class ConversationController extends React.Component {
    constructor () {
        super();

        this.handleSocketTextMessage = message => {
            this.addTextMessage({
                side: LEFT,
                message: message,
            });
        };

        this.handleSocketConversationLeave = () => {
            this.setDidFriendLeave(true);
        };

        this.handleSocketDisconnect = () => {
            this.setDidYouDisconnect(true);
        };

        this.handleSocketConnect = () => {
            this.setDidYouDisconnect(false);
        }

        this.state = {
            messages: [],
            didYouLeave: false,
            didYouDisconnect: false,
            didFriendLeave: false,
        };        
    };
    
    get socket () {
        return this.props.socket;
    }       

    componentDidMount () {
        this.socket.on('connect', this.handleSocketConnect);
        this.socket.on('disconnect', this.handleSocketDisconnect);

        this.socket.on('conversation:text-message', this.handleSocketTextMessage);
        this.socket.on('conversation:leave', this.handleSocketConversationLeave);
    }

    componentWillUnmount () {
        this.socket.off('connect', this.handleSocketConnect);
        this.socket.off('disconnect', this.handleSocketDisconnect);

        this.socket.off('conversation:text-message', this.handleSocketTextMessage);
        this.socket.off('conversation:leave', this.handleSocketConversationLeave);
    }

    componentDidUpdate (previousProps, previousState) {
        if (this.state.messages.length != previousState.messages.length) {
            document.documentElement.scrollTop = document.documentElement.scrollHeight;
        }
    }

    setMessagesWith (f) {
        this.setState(state => ({
            messages: f(state.messages)
        }));
    }

    setDidYouLeave (didYouLeave) {
        this.setState({
            didYouLeave
        });
    }

    setDidYouDisconnect (didYouDisconnect) {
        this.setState({
            didYouDisconnect
        });
    }

    setDidFriendLeave (didFriendLeave) {
        this.setState({
            didFriendLeave
        });
    }

    addTextMessage (message) {
        this.setMessagesWith(messages => ([
            ...messages,
            message,
        ]));
    }

    sendTextMessage (message) {
        this.addTextMessage({
            side: RIGHT,
            message: message,
        });

        this.socket.emit('conversation:text-message', message);
    }

    leaveConversation () {
        this.setDidYouLeave(true);

        this.socket.emit('conversation:leave');
    }

    actionSendTextMessage (message) {
        this.sendTextMessage(message);
    }

    actionLeaveConversation () {
        this.leaveConversation();
    }

    actionEnterLobby () {
        this.props.actionEnterLobby();
    }

    render () {
        return <ConversationView
            messages={ this.state.messages }
            didYouLeave={ this.state.didYouLeave }
            didYouDisconnect={ this.state.didYouDisconnect }
            didFriendLeave={ this.state.didFriendLeave }
            actionEnterLobby={() => this.actionEnterLobby()}
            actionLeaveConversation={() => this.actionLeaveConversation()}
            actionSendTextMessage={message => this.actionSendTextMessage(message)} />;
    }
}

export function ConversationView ({
    messages,
    didYouLeave,
    didYouDisconnect,
    didFriendLeave,
    actionEnterLobby,
    actionLeaveConversation,
    actionSendTextMessage,
}) {
    return (
        <div>
            <div className={ ConversationStyle.main }>
                { messages.length > 0 && <Messages messages={ messages } /> }

                { didYouLeave && <Alert>You left this conversation.</Alert> }
                { didYouDisconnect && <Alert>You're disconnected. Reconnecting...</Alert> }
                { didFriendLeave && <Alert>Your friend left this conversation.</Alert> }
            </div>

            <ConversationFooterController
                alone={ didYouLeave || didFriendLeave }
                actionEnterLobby={ actionEnterLobby }
                actionLeaveConversation={ actionLeaveConversation }
                actionSendTextMessage={ actionSendTextMessage } />
        </div>
    );
}