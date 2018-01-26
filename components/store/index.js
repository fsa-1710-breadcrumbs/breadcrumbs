'use strict';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


// REDUCERS WE MAKE GO HERE
import trails from './trails';

const reducer = combineReducers({
  trails
});

// WITH LOGGER
const middleware = applyMiddleware(thunkMiddleware, logger);

// // NO LOGGER
// const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;
export * from './trails';
