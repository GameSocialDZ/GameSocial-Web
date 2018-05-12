import {
  UPLOAD_LOADER, UPLOAD_SUCCESS, UPLOAD_ERROR
} from '../actions/action.upload';

const initialState = {
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch(action.type){
    case (UPLOAD_LOADER):
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case(UPLOAD_SUCCESS):
      return Object.assign({}, state, {
        data: action.data,
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