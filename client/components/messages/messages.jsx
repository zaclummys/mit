import React from 'react';
import MessagesStyle from './messages.css';

import { TextMessage } from '../text-message/text-message';
import { ImageMessage } from '../image-message/image-message';

function computeMessageItem ({ type, key, side, message }) {
    if (type == 'text') {
        return <TextMessage key={ key } side={ side } text={ message.text } />;
    }

    if (type == 'image') {
        return <ImageMessage key={ key } side={ side } image={ message.image } />;
    }
}

export function Messages ({ messages }) {
    return (
        <div className={ MessagesStyle.messages }>
            {
                messages.map(({ type, side, message }, key) => (
                    computeMessageItem({ type, key, side, message })
                ))
            }
        </div>
    );
}
