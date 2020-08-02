import React from 'React';
import { Messages } from '../messages/messages';
import { ConversationFooter } from '../conversation-footer/conversation-footer';

const LEFT = 'left';
const RIGHT = 'right';

export class ConversationController extends React.Component {   
    constructor () {
        super();

        this.textMessageListener = message => {
            this.addTextMessage({
                side: LEFT,
                message: message,
            });
        };

        this.state = {
            messages: [],
        };        
    };
    
    get socket () {
        return this.props.socket;
    }       

    componentDidMount () {
        this.socket.on('conversation:text-message', this.textMessageListener);
    }

    componentWillUnmount () {
        this.socket.off('conversation:text-message', this.textMessageListener);
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
        this.props.onLeaveConversationButtonClick();
    }

    render () {
        return <ConversationView
            messages={ this.state.messages }
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
                <Messages messages={ this.props.messages } />

                <ConversationFooter
                    onLeaveConversationButtonClick={() => this.handleLeaveConversationButtonClick()}
                    onTextMessageFormSubmit={message => this.handleTextMessageFormSubmit(message)} />
            </div>
        );
    }
}