import { GET_RECIPES,
  GET_CATEGORIES, GET_RECIPE_DETAILS, GET_RECOMENDATIONS, LOADING } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  recipeDetails: [],
  recomendations: [],
  loading: false,
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
  case GET_RECIPE_DETAILS:
    return {
      ...state,
      recipeDetails: action.details,
    };
  case GET_RECOMENDATIONS:
    return {
      ...state,
      recomendations: action.recomendations,
    };
  case LOADING:
    return {
      ...state,
      loading: action.load,
    };
  default:
    return state;
  }
};

export default getRecipesReducer;
