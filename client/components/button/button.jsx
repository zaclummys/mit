import React from 'react';
import ButtonStyle from './button.css';

function computeButtonClassName ({ primary, secondary, full, raised }) {
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

    if (raised) {
        className += ' ' + ButtonStyle.raised;
    }

    return className;
}

export function Button ({
    primary,
    secondary,
    full,
    raised,
    type,
    children,
    onClick,
}) {
    const className = computeButtonClassName({
        primary,
        secondary,
        full,
        raised,
    });

    return <button className={ className } type={ type } onClick={ onClick }>{ children }</button>;
}