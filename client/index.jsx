import React from 'react';
import ReactDOM from 'react-dom';

import { AppController } from './components/app/app';

ReactDOM.render(
    <React.StrictMode>
        <AppController />
    </React.StrictMode>,
    document.getElementById("app"),
);