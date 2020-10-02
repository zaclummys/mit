import React from 'react';
import MessageStyle from './message.css';

import { MessageSide } from '../../constants';

export function Message ({ side, text }) {
    let className = MessageStyle.message;

    if (side == MessageSide.LEFT) {
        className += ' ' + MessageStyle.left;
    }

    else if (side == MessageSide.RIGHT) {
        className += ' ' + MessageStyle.right;
    }

    return (
        <div className={ className }>
            <span>{ text }</span>
        </div>
    );
}