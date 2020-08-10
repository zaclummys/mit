import React from 'react';
import ImageMessageStyle from './image-message.css';

import { ImageController } from '../image/image';

function computeClassName (side) {
    let className = ImageMessageStyle.message;

    if (side == 'left') {
        className += ' ' + ImageMessageStyle.left;
    }

    if (side == 'right') {
        className += ' ' + ImageMessageStyle.right;
    }

    return className;
};

export function ImageMessage ({ side, image }) {
    let className = computeClassName(side);

    return (
        <div className={ className }>
            <ImageController image={ image } />
        </div>
    );
}