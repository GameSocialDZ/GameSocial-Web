//import {normalizeResponseErrors} from '../utils';
//import {SubmissionError} from "redux-form";

import  {database} from "../firebase";

// GET Action
export const POST_LOADER = 'FETCH_STATES_DATA_ERROR';
export const postLoader = () => ({
  type: POST_LOADER
});

export const POSTS_SUCCESS = 'FETCH_STATES_DATA_SUCCESS';
export const postsSuccess = data => ({
  type: POSTS_SUCCESS,
  data
});

export const POSTS_ERROR = 'FETCH_STATES_DATA_ERROR';
export const postsError = error => ({
  type: POSTS_ERROR,
  error
});

// Methods
export const getPosts = () => dispatch => {
  // TODO: Check Authentication
  dispatch(postLoader());
  return database.ref('posts/').on('value', data => {
    dispatch(postsSuccess(data.val()));
  });
};

export const postPost = (data) => dispatch => {
  // TODO: Check Authentication
  dispatch(postLoader());
  return database.ref('posts/').push(data)
    .then(dispatch(getPosts()))
    .catch(err => {
      dispatch(postsError(err))
    });
};

export const deletePost = (id) => dispatch => {
  // TODO: Check Authentication
  dispatch(postLoader());
  return database.ref('posts/').child(id).remove()
    .then(dispatch(getPosts()))
    .catch(err => {
      dispatch(postsError(err))
    });
};