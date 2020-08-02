import React from 'react';
import MessagesStyle from './messages.css';

import { TextMessage } from '../text-message/text-message';

export function Messages ({ messages }) {
    return (
        <div className={ MessagesStyle.messages }>
            {
                messages.map(({ side, message }, index) => (
                    <TextMessage key={ index } side={ side } text={ message.text } />
                ))
            }
        </div>
    );
}
