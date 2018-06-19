import {
  COMMENTS_DELETE_SUCCESS, COMMENTS_ERROR, COMMENTS_GET_SUCCESS, COMMENTS_REQUEST, COMMENTS_UPDATE_SUCCESS
} from '../actions/action.comments';

const initialState = {
  loading: false,
  error: null,
  data: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (COMMENTS_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(COMMENTS_GET_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false
      });
    case(COMMENTS_DELETE_SUCCESS):
      return Object.assign({}, state, {
        data: [],
        error: null,
        loading: false
      });
    case(COMMENTS_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}