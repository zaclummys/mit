import React from 'react';
import ConversationFooterStyle from './conversation-footer.css';

import { Button } from '../button/button';
import { TextMessageFormController } from '../text-message-form/text-message-form';

function ConversationFooterForm ({ onTextMessageFormSubmit }) {
    return (
        <div className={ ConversationFooterStyle.form }>
            <TextMessageFormController
                onFormSubmit={message => onTextMessageFormSubmit(message)} />
        </div>            
    );
}

export function ConversationFooter ({ showOnlyLeaveButton, onLeaveConversationButtonClick, onTextMessageFormSubmit }) {
    return (
        <div className={ ConversationFooterStyle.footer }>
            <Button full={ showOnlyLeaveButton } secondary onClick={() => onLeaveConversationButtonClick()}>LEAVE</Button>

            { !showOnlyLeaveButton && <ConversationFooterForm onTextMessageFormSubmit={ onTextMessageFormSubmit } /> }
        </div>
    );
}