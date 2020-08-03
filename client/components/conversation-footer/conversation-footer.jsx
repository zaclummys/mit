import React from 'react';
import ConversationFooterStyle from './conversation-footer.css';

import { Button } from '../button/button';
import { TextMessageFormController } from '../text-message-form/text-message-form';

export function ConversationFooter ({ onLeaveConversationButtonClick, onTextMessageFormSubmit }) {
    return (
        <div className={ ConversationFooterStyle.footer }>
            <Button onClick={() => onLeaveConversationButtonClick()}>LEAVE</Button>

            <div className={ ConversationFooterStyle.form }>
                <TextMessageFormController
                    onFormSubmit={message => onTextMessageFormSubmit(message)} />
            </div>
        </div>
    );
}