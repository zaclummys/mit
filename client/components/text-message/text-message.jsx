import React from 'react';
import TextMessageStyle from './text-message.css';

// function computeContainerClassName (side) {
//     let className = TextMessageStyle.container;

//     if (side == 'left') {
//         className += ' ' + TextMessageStyle.left;
//     }

//     if (side == 'right') {
//         className += ' ' + TextMessageStyle.right;
//     }

//     return className;
// };

export function TextMessage ({ side, text }) {
    return (
        <div className={ TextMessageStyle.container } data-side={ side }>
            { text }
        </div>
    );
}