import {
  USER_REQUEST,
  USER_GET_SUCCESS,
  USER_ERROR,
  USER_UPDATE_SUCCESS,
  USER_OTHER_GET_SUCCESS
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
        isOtherUser: false
      });
    case USER_OTHER_GET_SUCCESS:
      return Object.assign({}, state, {
        data: action.data,
        loading: false,
        error: null,
        isOtherUser: true
      });
    case USER_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null
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
