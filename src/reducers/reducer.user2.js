import {
  USER2_REQUEST,
  USER2_GET_SUCCESS,
  USER2_ERROR,
  USER2_UPDATE_SUCCESS,
  USER2_DELETE_SUCCESS
} from '../actions/action.user2';

const initialState = {
  loading: false,
  error: null,
  data:{}
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case USER2_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true
      });
    case USER2_GET_SUCCESS:
      return Object.assign({}, state, {
        data: action.data,
        loading: false,
        error: null
      });
    case USER2_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null
      });
    case USER2_DELETE_SUCCESS:
      return Object.assign({}, state, {
        data: {},
        loading: false,
        error: null
      });
    case USER2_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}
