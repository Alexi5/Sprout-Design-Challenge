import {createStore, applyMiddleware, combineReducers} from 'redux';
import rootReducer from './reducers/root';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

//creates store with rootReducer, middleware
const store = createStore(rootReducer, applyMiddleware(createLogger({collapsed: true}), thunkMiddleware))

export default store;