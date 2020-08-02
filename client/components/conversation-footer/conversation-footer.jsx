import React from 'react';
import ConversationFooterStyle from './conversation-footer.css';

import { TextMessageFormController } from '../text-message-form/text-message-form';

export function ConversationFooter ({ onLeaveConversationButtonClick, onTextMessageFormSubmit }) {
    return (
        <div className={ ConversationFooterStyle.footer }>
            <button onClick={() => onLeaveConversationButtonClick()}>Leave</button>

            <div className={ ConversationFooterStyle.form }>
                <TextMessageFormController
                    onFormSubmit={message => onTextMessageFormSubmit(message)} />
            </div>
        </div>
    );
}