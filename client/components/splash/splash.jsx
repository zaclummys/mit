import React from 'react';
import SplashStyle from './splash.css';

import { SocketStatus } from '../../constants';

export function Splash ({ status }) {
    return (
        <div className={ SplashStyle.splash }>
            <SplashTitle />
            <SplashDescription status={ status } />
        </div>
    );
}

function SplashTitle () {
    return (
        <div className={ SplashStyle.title }>
            <span>Mit</span>
        </div>
    );
}

function SplashDescription ({ status }) {
    switch (status) {
        case SocketStatus.CONNECTING:
            return (
                <div className={ SplashStyle.description }>
                    <p>Connecting...</p>
                </div>
            );

        case SocketStatus.ERROR:
            return (
                <div className={ SplashStyle.description }>
                    <p>Unable to connect to the server.</p>
                    <p>Try again later.</p>
                </div>
            );

        default:
            return null;
    }
}