import React from 'react';
import ReactDOM from 'react-dom';
import { store } from '@notizen/frontend-common/src/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker.js';
import '@notizen/frontend-common/index.css';
import App from '@notizen/frontend-common/src/App';

// Debug
declare global {
  interface Window { store: any; }
}

window.store = store || {};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();