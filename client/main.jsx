import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/app/app';

import 'normalize.css';
import './main.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("app"),
);