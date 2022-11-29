import { GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const getEmailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMAIL:
    return {
      ...state,
      email: action.userEmail,
    };
  default:
    return state;
  }
};

export default getEmailReducer;
