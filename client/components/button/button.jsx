import React from 'react';
import ButtonStyle from './button.css';

export function Button ({ type, children, onClick }) {
    return <button className={ ButtonStyle.button } type={ type } onClick={ onClick }>{ children }</button>;
}