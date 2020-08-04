import React from 'react';
import InputStyle from './input.css';

export function Input ({ required, name, type, hint, value, onChange }) {
    return <input
        className={ InputStyle.input }
        required={ required }
        placeholder={ hint }
        value={ value }
        name={ name }
        type={ type }
        onChange={ onChange } />;
}