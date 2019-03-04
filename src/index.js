import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/index';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();