import {
  POST_LOADER, POSTS_SUCCESS, POSTS_ERROR
} from '../actions/postActions';

const initialState = {
  loading: false,
  data: [],
  error: null
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (POST_LOADER):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(POSTS_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false
      });
    case(POSTS_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}