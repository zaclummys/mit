import React from 'react';
import MessagesStyle from './messages.css';

import { Message } from '../message/message';

export function Messages ({ messages }) {
    return (
        <div className={ MessagesStyle.messages }>
            {
                messages.map(({ side, message }, key) => (
                    <Message key={ key } side={ side } text={ message.text } />
                ))
            }
        </div>
    );
}
