import {
  OTHER_USER_REQUEST, OTHER_USER_GET_SUCCESS,
  OTHER_USER_DELETE_SUCCESS, OTHER_USER_ERROR,
  OTHER_USER_UPDATE_SUCCESS
} from '../actions/action.otherUser';

const initialState = {
  loading: false,
  error: null,
  data: [],
  isOtherUser: false
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (OTHER_USER_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(OTHER_USER_GET_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false
      });
    case(OTHER_USER_UPDATE_SUCCESS):
      return Object.assign({}, state, {
        error: null,
        loading: false
      });
    case(OTHER_USER_DELETE_SUCCESS):
      return Object.assign({}, state, {
        data: [],
        error: null,
        loading: false
      });
    case(OTHER_USER_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}