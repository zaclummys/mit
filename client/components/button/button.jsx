import React from 'react';
import ButtonStyle from './button.css';

export function Button ({
    primary,
    children,
    ...props
}) {
    let className = ButtonStyle.button;

    if (primary) {
        className += ' ' + ButtonStyle.primary;
    }

    return (
        <button { ...props } className={ className }>
            { children }
        </button>
    );
}