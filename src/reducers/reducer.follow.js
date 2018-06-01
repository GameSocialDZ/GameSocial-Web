import {
  FOLLOW_REQUEST, FOLLOW_ERROR, FOLLOW_GET_SUCCESS, FOLLOW_DELETE_SUCCESS
} from '../actions/action.follow';

const initialState = {
  loading: false,
  error: null,
  followers: [],
  following:[]
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (FOLLOW_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(FOLLOW_GET_SUCCESS):
      return Object.assign({}, state, {
        followers: action.followers,
        following: action.following,
        error: null,
        loading: false
      });
    case(FOLLOW_DELETE_SUCCESS):
      return Object.assign({}, state, {
        data: [],
        error: null,
        loading: false
      });
    case(FOLLOW_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}