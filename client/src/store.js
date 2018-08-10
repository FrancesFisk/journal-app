import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {selfCareReducer} from './reducers';

export default createStore(
    selfCareReducer,
    applyMiddleware(thunk, logger)
);
