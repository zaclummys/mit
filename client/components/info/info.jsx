import React from 'react';
import InfoStyle from './info.css';

export function Info ({ children }) {
    return (
        <div className={ InfoStyle.info }>
            { children }
        </div>
    );
}