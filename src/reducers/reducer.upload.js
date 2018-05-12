import {
  UPLOAD_REQUEST, UPLOAD_ERROR, UPLOAD_GET_SUCCESS, UPLOAD_POST_SUCCESS, UPLOAD_DELETE_SUCCESS
} from '../actions/action.upload';

const initialState = {
  loading: false,
  error: null,
  data: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (UPLOAD_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(UPLOAD_GET_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false
      });
    case(UPLOAD_POST_SUCCESS):
      return Object.assign({}, state, {
        error: null,
        loading: false
      });
    case(UPLOAD_DELETE_SUCCESS):
      return Object.assign({}, state, {
        error: null,
        loading: false
      });
    case(UPLOAD_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}