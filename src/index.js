import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import Admin from './layouts/Admin.jsx'
import Instructor from './layouts/Instructor.jsx'
import Queue from './layouts/Queue.jsx'
import Login from './layouts/Login'
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
