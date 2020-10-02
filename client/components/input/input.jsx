import React from 'react';
import InputStyle from './input.css';

export function Input ({ trailing, ...props}) {
    return (
        <div className={ InputStyle.container }>            
            <input { ...props } className={ InputStyle.input } />

            { trailing && <div>{ trailing }</div> }
        </div>
    );
}