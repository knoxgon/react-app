import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';


import '@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/mdbreact/dist/css/mdb.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
