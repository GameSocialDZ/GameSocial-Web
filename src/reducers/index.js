// import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import authReducer from "./reducer.auth";
import userReducer from "./reducer.user";
import uploadReducer from "./reducer.upload";
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  // firebase: firebaseReducer,
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  uploads: uploadReducer
});

export default rootReducer;