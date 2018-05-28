import { combineReducers } from 'redux'
import authReducer from "./reducer.auth";
import userReducer from "./reducer.user";
import uploadReducer from "./reducer.upload";
import viewReducer from "./reducer.view";
import user2Reducer from './reducer.user2';
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  // firebase: firebaseReducer,
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  uploads: uploadReducer,
  view: viewReducer,
  user2: user2Reducer
});

export default rootReducer;