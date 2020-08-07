import React from 'react';
import HeaderStyle from './header.css';

export function Header () {
    return (
        <div className={ HeaderStyle.header }>
            <div className={ HeaderStyle.title }>Mit</div>
        </div>
    );
}