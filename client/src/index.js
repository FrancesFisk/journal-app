import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import {Provider} from 'react-redux';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Main from './components/main';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
