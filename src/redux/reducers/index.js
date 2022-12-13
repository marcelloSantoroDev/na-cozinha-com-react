import { combineReducers } from 'redux';
import getCurrentFavoritesReducer from './currentFavoritesReducer';
import getCurrentStepsReducer from './currentStepsReducer';
import getEmailReducer from './emailReducer';
import getRecipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  getEmailReducer,
  getRecipesReducer,
  getCurrentStepsReducer,
  getCurrentFavoritesReducer,
});

export default rootReducer;
