import React from 'react';
import ButtonStyle from './button.css';

function computeButtonClassName ({ primary, secondary, full }) {
    let className = ButtonStyle.button;

    if (primary) {
        className += ' ' + ButtonStyle.primary;
    }

    if (secondary) {
        className += ' ' + ButtonStyle.secondary;
    }

    if (full) {
        className += ' ' + ButtonStyle.full;
    }

    return className;
}

export function Button ({ primary, secondary, full, type, children, onClick }) {
    const className = computeButtonClassName({
        primary,
        secondary,
        full,
    });

    return <button className={ className } type={ type } onClick={ onClick }>{ children }</button>;
}