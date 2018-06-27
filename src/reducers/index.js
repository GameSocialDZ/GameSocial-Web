import { combineReducers } from 'redux'
import authReducer from "./reducer.auth";
import userReducer from "./reducer.user";
import uploadReducer from "./reducer.upload";
import viewReducer from "./reducer.view";
import followersReducer from "./reducer.followers";
import followingReducer from "./reducer.following";
import commentsReducer from './reducer.comments';
import countViewsReducer from './reducer.count.views';
import favoritesReducer from './reducer.favoirites';
import likesReducer from './reducer.likes';
import trackedFavoritesReducer from './reducer.track.favorites';
import playlistReducer from './reducer.playlist';
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  uploads: uploadReducer,
  view: viewReducer,
  following: followingReducer,
  followers: followersReducer,
  comments: commentsReducer,
  countViews: countViewsReducer,
  favorites: favoritesReducer,
  likes: likesReducer,
  trackedFavorites: trackedFavoritesReducer,
  playlist: playlistReducer
});

export default rootReducer;