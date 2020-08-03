import React from 'react';
import AlertStyle from './alert.css';

export function Alert ({ children }) {
    return <div className={ AlertStyle.alert }>{ children }</div>
}