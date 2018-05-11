// import { firebaseReducer } from 'react-redux-firebase'

import { combineReducers } from 'redux'
import postReducer from "./postReducer";
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  // firebase: firebaseReducer,
  form: formReducer,
  posts: postReducer
});

export default rootReducer;