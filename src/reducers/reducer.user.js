import {
  USER_REQUEST,
  USER_GET_SUCCESS,
  USER_ERROR
} from '../actions/action.user';

const initialState = {
  loading: false,
  error: null,
  data:{}
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case USER_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true
      });
    case USER_GET_SUCCESS:
      return Object.assign({}, state, {
        data: action.data,
        loading: false,
        error: null,
      });
    case USER_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}
