import { GET_CURRENT_STEPS } from '../actions';

const INITIAL_STATE = {
  count: 0,
};

const getCurrentStepsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENT_STEPS:
    return {
      ...state,
      count: action.currentSteps,
    };
  default:
    return state;
  }
};

export default getCurrentStepsReducer;
