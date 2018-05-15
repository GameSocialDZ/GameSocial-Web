import {
  AUTH_REQUEST, AUTH_GET_SUCCESS, AUTH_UPDATE_SUCCESS, AUTH_DELETE_SUCCESS, AUTH_ERROR
} from '../actions/action.auth';

const initialState = {
  loading: false,
  currentUser: [],
  error: null
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case AUTH_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case AUTH_GET_SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.currentUser,
        error: null,
        loading: false,
      });
    case AUTH_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });
    case AUTH_DELETE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });
    case AUTH_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
}