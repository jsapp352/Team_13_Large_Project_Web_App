import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import IncorrectInfo from './components/IncorrectInfo'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
