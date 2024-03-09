import './bootstrap';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    // <React.StrictMode>
        <Routes/>
    // </React.StrictMode>
);
