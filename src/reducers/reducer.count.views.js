import {
  COUNT_VIEWS_REQUEST, COUNT_VIEWS_ERROR, COUNT_VIEWS_GET_SUCCESS, COUNT_VIEWS_DELETE_SUCCESS
} from '../actions/action.count.views';

const initialState = {
  loading: false,
  error: null,
  data: []
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (COUNT_VIEWS_REQUEST):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(COUNT_VIEWS_GET_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: false
      });
    case(COUNT_VIEWS_DELETE_SUCCESS):
      return Object.assign({}, state, {
        data: [],
        error: null,
        loading: false
      });
    case(COUNT_VIEWS_ERROR):
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
}