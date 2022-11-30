import { combineReducers } from 'redux';
import getEmailReducer from './emailReducer';
import getRecipesReducer from './recipesReducer';

const rootReducer = combineReducers({ getEmailReducer, getRecipesReducer });

export default rootReducer;
