import React from 'react';
import ConversationStyle from './conversation.css';
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
                alone: true
            });
        };

        this.state = {
            messages: [],
            alone: false,
        };        
    };
    
    get socket () {
        return this.props.socket;
    }       

    componentDidMount () {
        this.socket.on('conversation:text-message', this.handleSocketTextMessage);
        this.socket.on('conversation:leave', this.handleSocketLeave);
    }

    componentWillUnmount () {
        this.socket.off('conversation:text-message', this.handleSocketTextMessage);
        this.socket.off('conversation:leave', this.handleSocketLeave);
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

    handleTextMessageFormSubmit (message) {
        this.sendTextMessage(message);
    }

    handleLeaveConversationButtonClick () {
        this.socket.emit('conversation:leave');

        this.props.onLeaveConversation();
    }

    render () {
        return <ConversationView
            messages={ this.state.messages }
            alone={ this.state.alone }
            onTextMessageFormSubmit={message => this.handleTextMessageFormSubmit(message)}
            onLeaveConversationButtonClick={() => this.handleLeaveConversationButtonClick()} />
    }
}

export class ConversationView extends React.Component {
    handleLeaveConversationButtonClick () {
        this.props.onLeaveConversationButtonClick();
    }

    handleTextMessageFormSubmit (message) {
        this.props.onTextMessageFormSubmit(message);
    }

    render () { 
        return (
            <div>
                <div className={ ConversationStyle.main }>
                    <Messages messages={ this.props.messages } />

                    { this.props.alone && (
                        <div className={ ConversationStyle.alone }>
                            Your friend left conversation.
                        </div>
                    )}
                </div>

                <ConversationFooter
                    onLeaveConversationButtonClick={() => this.handleLeaveConversationButtonClick()}
                    onTextMessageFormSubmit={message => this.handleTextMessageFormSubmit(message)} />
            </div>
        );
    }
}