import React from 'react';
import ConversationStyle from './conversation.css';

import { Alert } from '../alert/alert';
import { Messages } from '../messages/messages';
import { ConversationFooter } from '../conversation-footer/conversation-footer';

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

        this.handleSocketLeave = () => {
            this.setState({
                didFriendLeave: true
            });
        };

        this.handleSocketDisconnect = () => {
            this.setState({
                didFriendDisconnect: true
            });
        };

        this.state = {
            messages: [],
            didFriendLeave: false,
            didFriendDisconnect: false,
        };        
    };
    
    get socket () {
        return this.props.socket;
    }       

    componentDidMount () {
        this.socket.on('conversation:text-message', this.handleSocketTextMessage);
        this.socket.on('conversation:leave', this.handleSocketLeave);
        this.socket.on('conversation:disconnect', this.handleSocketDisconnect);
    }

    componentWillUnmount () {
        this.socket.off('conversation:text-message', this.handleSocketTextMessage);
        this.socket.off('conversation:leave', this.handleSocketLeave);
        this.socket.off('conversation:disconnect', this.handleSocketDisconnect);
    }

    componentDidUpdate () {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
    }

    setMessagesWith (f) {
        this.setState(state => ({
            messages: f(state.messages)
        }));
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

    shouldConfirmLeaveConversation () {
        if (this.state.didFriendLeave == false && this.state.didFriendDisconnect == false) {
            return true;
        }

        return false;
    }

    confirmLeaveConversation () {
        if (this.shouldConfirmLeaveConversation()) {
            return window.confirm('Are you sure you want to return to lobby?');
        }

        return true;
    }

    handleTextMessageFormSubmit (message) {
        this.sendTextMessage(message);
    }

    handleLeaveConversationButtonClick () {
        const confirmed = this.confirmLeaveConversation();

        if (confirmed) {
            this.socket.emit('conversation:leave');
    
            this.props.onLeaveConversation();
        }
    }

    render () {
        return <ConversationView
            messages={ this.state.messages }
            didFriendLeave={ this.state.didFriendLeave }
            didFriendDisconnect={ this.state.didFriendDisconnect }
            onTextMessageFormSubmit={message => this.handleTextMessageFormSubmit(message)}
            onLeaveConversationButtonClick={() => this.handleLeaveConversationButtonClick()} />
    }
}

export function ConversationView ({ messages, didFriendLeave, didFriendDisconnect, onLeaveConversationButtonClick, onTextMessageFormSubmit }) {
    return (
        <div>
            <div className={ ConversationStyle.main }>
                <Alert>Say hello to your friend!</Alert>

                <Messages messages={ messages } />

                { didFriendLeave && <Alert>Your friend has left conversation.</Alert> }
                { didFriendDisconnect && <Alert>Your friend has disconnected.</Alert> }
            </div>

            <ConversationFooter
                showOnlyLeaveButton={ didFriendLeave || didFriendDisconnect }
                onLeaveConversationButtonClick={() => onLeaveConversationButtonClick()}
                onTextMessageFormSubmit={message => onTextMessageFormSubmit(message)} />
        </div>
    );
}