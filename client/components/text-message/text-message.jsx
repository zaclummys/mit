import React from 'react';
import TextMessageStyle from './text-message.css';

function computeClassName (side) {
    let className = TextMessageStyle.message;

    if (side == 'left') {
        className += ' ' + TextMessageStyle.left;
    }

    if (side == 'right') {
        className += ' ' + TextMessageStyle.right;
    }

    return className;
};

export function TextMessage ({ side, text }) {
    let className = computeClassName(side);

    return (
        <div className={ className }>
            { text }
        </div>
    );
}