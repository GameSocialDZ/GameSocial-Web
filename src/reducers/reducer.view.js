import {
  VIEW_REQUEST, VIEW_ERROR, VIEW_GET_SUCCESS, VIEW_DELETE_SUCCESS
} from '../actions/action.view';

const initialState = {
  loading: false,
  error: null,
  data: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (VIEW_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(VIEW_GET_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false
      });
    case(VIEW_DELETE_SUCCESS):
      return Object.assign({}, state, {
        data: [],
        error: null,
        loading: false
      });
    case(VIEW_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}