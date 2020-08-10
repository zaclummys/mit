import React from 'react';

export function HiddenInputFile ({ accept, multiple, onChange, children }) {
    const ref = React.createRef();

    return (
        <div>
            <input hidden type="file" accept={ accept } multiple={ multiple } ref={ ref } onChange={ onChange }/>
            { children(ref) }
        </div>
    );
}
