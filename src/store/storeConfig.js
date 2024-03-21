import {combineReducers, compose, applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import userReducer from './reducers/user';
import postsReducer from './reducers/posts';
 
const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
});
 
const storeConfig = configureStore({
  reducer: reducers,
});
 
export default storeConfig;