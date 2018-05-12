import {
  AUTH_GET, AUTH_UPDATE
} from '../actions/action.auth';

const initialState = {

};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case AUTH_GET:
      return Object.assign({}, state, {
        data: action.data
      });
    case AUTH_UPDATE:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}