import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {testReducer} from './reducers';

export default createStore(
    testReducer,
    applyMiddleware(thunk, logger)
);
