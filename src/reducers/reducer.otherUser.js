import {
  OTHER_USER_REQUEST, OTHER_USER_GET_SUCCESS, OTHER_USER_DELETE_SUCCESS, OTHER_USER_ERROR
} from '../actions/action.otherUser';

const initialState = {
  loading: false,
  error: null,
  data: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (OTHER_USER_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null,
        isOtherUser: false
      });
    case(OTHER_USER_GET_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false,
        isOtherUser: true
      });
    case(OTHER_USER_DELETE_SUCCESS):
      return Object.assign({}, state, {
        data: [],
        error: null,
        loading: false,
        isOtherUser: false
      });
    case(OTHER_USER_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        isOtherUser: false
      });
    default:
      return state;
  }
}