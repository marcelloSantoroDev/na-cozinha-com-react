import { GET_RECIPES, GET_CATEGORIES } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
};

const getRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_RECIPES:
    return {
      ...state,
      recipes: action.recipes,
    };
  case GET_CATEGORIES:
    return {
      ...state,
      categories: action.categories,
    };
  default:
    return state;
  }
};

export default getRecipesReducer;
