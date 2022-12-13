import { GET_CURRENT_FAVORITES } from '../actions';

const INITIAL_STATE = {
  count: 0,
};

const getCurrentFavoritesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENT_FAVORITES:
    return {
      ...state,
      count: action.currentFavorites,
    };
  default:
    return state;
  }
};

export default getCurrentFavoritesReducer;
