import { combineReducers } from 'redux';
import email from './emailReducer';

const rootReducer = combineReducers({ email });

export default rootReducer;
