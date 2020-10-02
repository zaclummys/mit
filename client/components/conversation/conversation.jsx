import React from 'react';
import ConversationStyle from './conversation.css';

import { ConversationStatus, MessageSide } from '../../constants';

import { Info } from '../info/info';
import { Button } from '../button/button';
import { Messages } from '../messages/messages';
import { MessageForm } from '../message-form/message-form';

export class Conversation extends React.Component {
    constructor () {
        super();

        this.handleConversationMatch = () => {
            this.setState({
                status: ConversationStatus.IN,

                messages: [],
                didYouLeave: false,
                didFriendLeave: false,
            });
        };

        this.handleConversationMessage = message => {
            this.addMessage({
                side: MessageSide.LEFT,
                message: message,
            });
        };

        this.handleConversationLeave = () => {
            this.setState({
                status: ConversationStatus.OUT,
                didFriendLeave: true,
            });
        };

        this.state = {
            status: ConversationStatus.UNINITIALIZED,
            
            messages: [],
            didYouLeave: false,
            didFriendLeave: false,
        };        
    };
    
    get socket () {
        return this.props.socket;
    }       

    componentDidMount () {
        this.socket.on('conversation:match', this.handleConversationMatch);
        this.socket.on('conversation:message', this.handleConversationMessage);
        this.socket.on('conversation:leave', this.handleConversationLeave);
    }

    componentWillUnmount () {
        this.socket.off('conversation:match', this.handleConversationMatch);
        this.socket.off('conversation:message', this.handleConversationMessage);
        this.socket.off('conversation:leave', this.handleConversationLeave);
    }

    componentDidUpdate (_, previousState) {
        if (this.state.messages.length > previousState.messages.length) {
            document.documentElement.scrollTop = document.documentElement.scrollHeight;
        }
    }

    setMessagesWith (f) {
        this.setState(state => ({
            messages: f(state.messages)
        }));
    }

    addMessage (message) {
        this.setMessagesWith(messages => ([
            ...messages,
            message,
        ]));
    }

    sendMessage (message) {
        this.addMessage({
            side: MessageSide.RIGHT,
            message: message,
        });

        this.socket.emit('conversation:message', message);
    }

    startConversation () {
        this.setState({
            status: ConversationStatus.WAITING
        });

        this.socket.emit('conversation:start');
    }

    stopConversation () {
        this.setState({
            status: ConversationStatus.OUT,
            didYouLeave: true,
        });

        this.socket.emit('conversation:leave');
    }

    renderHeaderPrimaryActionView () {
        switch (this.state.status) {
            case ConversationStatus.OUT:
            case ConversationStatus.UNINITIALIZED:
                return <Button onClick={() => this.startConversation()}>START</Button>;
            
            case ConversationStatus.IN:
                return <Button onClick={() => this.stopConversation()}>STOP</Button>;
    
            case ConversationStatus.WAITING:
                return <Button disabled>WAITING...</Button>;
        }
    }

    renderMainView () {
        return (
            <main className={ ConversationStyle.main }>
                <div className={ ConversationStyle.content }>
                    { this.renderMainContentView() }
                </div>
            </main>
        );
    }

    renderMainContentView () {
        switch (this.state.status) {
            case ConversationStatus.UNINITIALIZED:
                return (
                    <Info>Welcome! Press <b>start</b> to meet a friend!</Info>
                );

            case ConversationStatus.WAITING:
                return (
                    <Info>Waiting for a friend...</Info>
                );

            default:
                return (
                    <div>
                        { this.state.messages.length > 0 && <Messages messages={ this.state.messages } /> }
            
                        { this.state.didFriendLeave && <Info>Your friend left this conversation.</Info> }
                        { this.state.didYouLeave && <Info>You left this conversation.</Info> }
                    </div>
                );
        }
    }

    renderFooterView () {
        if (this.state.status == ConversationStatus.IN) {
            return (
                <footer className={ ConversationStyle.footer }>
                    <div className={ ConversationStyle.content }>
                        <MessageForm
                            actionSendMessage={message => this.sendMessage(message)} />
                    </div>
                </footer>
            );
        }

        return null;
    }

    render () {
        return (
            <div>
                <header className={ ConversationStyle.header }>
                    <div className={ ConversationStyle.content }>
                        <div className={ ConversationStyle.title }>Mit</div>
                        { this.renderHeaderPrimaryActionView() }
                    </div>
                </header>
    
                { this.renderMainView() }    
                { this.renderFooterView() }
            </div>
        );
    }
}