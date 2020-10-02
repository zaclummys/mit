import React from 'react';

export function Icon ({ icon, ...props }) {
    return (
        <i { ...props } className="material-icons-round">
            { icon }
        </i>
    );
}