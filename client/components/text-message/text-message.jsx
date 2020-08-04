import React from 'react';
import TextMessageStyle from './text-message.css';

function computeMessageClassName ({ side }) {
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
    let className = computeMessageClassName({ side });

    return (
        <div className={ className }>
            { text }
        </div>
    );
}