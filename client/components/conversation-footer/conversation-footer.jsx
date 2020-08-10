import React from 'react';
import ConversationFooterStyle from './conversation-footer.css';

import { Button } from '../button/button';
import { TextMessageFormController } from '../text-message-form/text-message-form';
import { ImageMessageFormController } from '../image-message-form/image-message-form';

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

    actionSendImageMessage (message) {
        this.props.actionSendImageMessage(message);
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
            actionSendTextMessage={message => this.actionSendTextMessage(message) }
            actionSendImageMessage={message => this.actionSendImageMessage(message) } />;
    }
}

export function ConversationFooterView ({
    alone,
    actionSendTextMessage,
    actionSendImageMessage,
    onLobbyButtonClick,
    onLeaveConversationButtonClick,
}) {
    return (
        <div className={ ConversationFooterStyle.footer }>
            <ConversationFooterViewContent
                alone={ alone }
                actionSendTextMessage={ actionSendTextMessage }
                actionSendImageMessage={ actionSendImageMessage }
                onLobbyButtonClick={ onLobbyButtonClick }
                onLeaveConversationButtonClick={ onLeaveConversationButtonClick } />
        </div>
    )
}

export function ConversationFooterViewContent ({
    alone,
    actionSendTextMessage,
    actionSendImageMessage,
    onLobbyButtonClick,
    onLeaveConversationButtonClick,
}) {
    if (alone) {
        return <Button secondary full raised onClick={ onLobbyButtonClick }>GO TO LOBBY</Button>;
    }
    else {
        return (
            <div className={ ConversationFooterStyle.regular }>
                <Button secondary raised onClick={ onLeaveConversationButtonClick }>LEAVE</Button>

                <ImageMessageFormController
                    actionSendImageMessage={ actionSendImageMessage } />

                <div className={ ConversationFooterStyle.form }>
                    <TextMessageFormController actionSendTextMessage={ actionSendTextMessage } />
                </div>            
            </div>
        );
    }
}