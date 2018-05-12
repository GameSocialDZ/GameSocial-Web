import {
  USER_SUCCESS,
  USER_ERROR
} from '../actions/action.user';

const initialState = {
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === USER_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  } else if (action.type === USER_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
