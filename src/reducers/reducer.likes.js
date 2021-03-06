import {
  LIKES_REQUEST, LIKES_ERROR, LIKES_GET_SUCCESS
} from '../actions/action.likes';

const initialState = {
  loading: false,
  error: null,
  data: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (LIKES_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(LIKES_GET_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false
      });
    case(LIKES_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}