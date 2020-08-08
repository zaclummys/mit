import React from 'react';
import ReactDOM from 'react-dom';

import { AppController } from './components/app/app';

import 'normalize.css';
import './main.css';

ReactDOM.render(
    <React.StrictMode>
        <AppController />
    </React.StrictMode>,
    document.getElementById("app"),
);