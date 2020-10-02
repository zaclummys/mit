import React from 'react';
import IconButtonStyle from './icon-button.css';

import { Icon } from '../icon/icon';

export function IconButton ({ icon, primary, secondary, ...props }) {
    let className = IconButtonStyle.button;

    if (primary) {
        className += ' ' + IconButtonStyle.primary;
    }

    return (
        <button { ...props } className={ className }>
            <Icon icon={ icon } />
        </button>
    );
}