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

        this.handleSocketConversationDisconnect = () => {
            this.setDidFriendDisconnect(true);
        };

        this.state = {
            messages: [],
            didYouLeave: false,
            didFriendLeave: false,
            didFriendDisconnect: false,
        };        
    };
    
    get socket () {
        return this.props.socket;
    }       

    componentDidMount () {
        this.socket.on('conversation:text-message', this.handleSocketTextMessage);
        this.socket.on('conversation:leave', this.handleSocketConversationLeave);
        this.socket.on('conversation:disconnect', this.handleSocketConversationDisconnect);
    }

    componentWillUnmount () {
        this.socket.off('conversation:text-message', this.handleSocketTextMessage);
        this.socket.off('conversation:leave', this.handleSocketConversationLeave);
        this.socket.off('conversation:disconnect', this.handleSocketConversationDisconnect);
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

    setDidFriendLeave (didFriendLeave) {
        this.setState({
            didFriendLeave
        });
    }

    setDidFriendDisconnect (didFriendDisconnect) {
        this.setState({
            didFriendDisconnect
        });
    }

    addTextMessage (message) {
        this.setMessagesWith(messages => [
            ...messages,
            message,
        ]);
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
            didFriendLeave={ this.state.didFriendLeave }
            didFriendDisconnect={ this.state.didFriendDisconnect }
            actionEnterLobby={() => this.actionEnterLobby()}
            actionLeaveConversation={() => this.actionLeaveConversation()}
            actionSendTextMessage={message => this.actionSendTextMessage(message)} />;
    }
}

export function ConversationView ({
    messages,
    didYouLeave,
    didFriendLeave,
    didFriendDisconnect,
    actionEnterLobby,
    actionLeaveConversation,
    actionSendTextMessage,
}) {
    const alone = didYouLeave || didFriendLeave || didFriendDisconnect;

    return (
        <div>
            <div className={ ConversationStyle.main }>
                <Alert>Say hi to your friend!</Alert>

                { messages && <Messages messages={ messages } /> }

                { didFriendLeave && <Alert>Your friend left this conversation.</Alert> }
                { didFriendDisconnect && <Alert>Your friend disconnected.</Alert> }
                { didYouLeave && <Alert>You left this conversation.</Alert> }
            </div>

            <ConversationFooterController
                alone={ alone }
                actionEnterLobby={ actionEnterLobby }
                actionLeaveConversation={ actionLeaveConversation }
                actionSendTextMessage={ actionSendTextMessage } />
        </div>
    );
}