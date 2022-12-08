import { combineReducers } from 'redux';
import getEmailReducer from './emailReducer';
import getRecipesReducer from './recipesReducer';
import getCurrentStepsReducer from './currentStepsReducer';

const rootReducer = combineReducers({
  getEmailReducer,
  getRecipesReducer,
  getCurrentStepsReducer,
});

export default rootReducer;
