import { combineReducers } from 'redux'
import authReducer from "./reducer.auth";
import userReducer from "./reducer.user";
import uploadReducer from "./reducer.upload";
import viewReducer from "./reducer.view";
import followersReducer from "./reducer.followers";
import followingReducer from "./reducer.following";
import commentsReducer from './reducer.comments';
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  uploads: uploadReducer,
  view: viewReducer,
  following: followingReducer,
  followers: followersReducer,
  comments: commentsReducer
});

export default rootReducer;