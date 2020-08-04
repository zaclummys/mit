import React from 'react';
import ConversationFooterStyle from './conversation-footer.css';

import { Button } from '../button/button';
import { TextMessageFormController } from '../text-message-form/text-message-form';

export class ConversationFooterController extends React.Component {
    constructor () {
        super();
    }

    confirmLeaveConversation () {
        return window.confirm('Are you sure you want to leave this conversation?');
    }

    actionEnterLobby () {
        this.props.actionEnterLobby();
    }
    
    actionLeaveConversation () {
        this.props.actionLeaveConversation();
    }

    actionSendTextMessage (message) {
        this.props.actionSendTextMessage(message);
    }

    handleLeaveConversationButtonClick () {
        const confirmed = this.confirmLeaveConversation();

        if (confirmed) {
            this.actionLeaveConversation();
        }
    }

    handleLobbyButtonClick () {
        this.actionEnterLobby();
    }

    render () {
        return <ConversationFooterView
            alone={ this.props.alone }
            onLobbyButtonClick={() => this.handleLobbyButtonClick()}
            onLeaveConversationButtonClick={() => this.handleLeaveConversationButtonClick() }
            actionSendTextMessage={message => this.actionSendTextMessage(message) } />;
    }
}

export function ConversationFooterView ({
    alone,
    actionSendTextMessage,
    onLobbyButtonClick,
    onLeaveConversationButtonClick,
}) {
    return (
        <div className={ ConversationFooterStyle.footer }>
            <ConversationFooterViewContent
                alone={ alone }
                actionSendTextMessage={ actionSendTextMessage }
                onLobbyButtonClick={ onLobbyButtonClick }
                onLeaveConversationButtonClick={ onLeaveConversationButtonClick } />
        </div>
    )
}

export function ConversationFooterViewContent ({
    alone,
    actionSendTextMessage,
    onLobbyButtonClick,
    onLeaveConversationButtonClick,
}) {
    if (alone) {
        return <Button secondary full onClick={ onLobbyButtonClick }>GO TO LOBBY</Button>;
    }
    else {
        return (
            <div className={ ConversationFooterStyle.regular }>
                <Button secondary onClick={ onLeaveConversationButtonClick }>LEAVE</Button>

                <div className={ ConversationFooterStyle.form }>
                    <TextMessageFormController actionSendTextMessage={ actionSendTextMessage } />
                </div>            
            </div>
        );
    }
}