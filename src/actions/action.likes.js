import {database} from "../firebase";
import {FavoriteObject} from './models';
import _ from 'lodash';

export const LIKES_REQUEST = 'LIKES_REQUEST';
export const likesRequest = () => ({
  type: LIKES_REQUEST,
});

export const LIKES_GET_SUCCESS = 'LIKES_GET_SUCCESS';
export const likesGetSuccess = (data) => ({
  type: LIKES_GET_SUCCESS,
  data
});

export const LIKES_ERROR = 'LIKES_ERROR';
export const likesError = error => ({
  type: LIKES_ERROR,
  error
});

//*** ACTIONS **//
export const getLikesPromise = (authId) => dispatch => {
  dispatch(likesRequest());
  return new Promise((resolve, reject) => {
    database.ref(`users/${authId}/likes`).once('value', (data) => {
      let likes = data.val();
      resolve(dispatch(likesGetSuccess(likes)));
    });
  }).catch(error => dispatch(likesError(error)));
};

export const getLikesOnce = (authId) => dispatch => {
  dispatch(likesRequest());
  return database.ref(`users/${authId}/likes`).once('value', (data) => {
    let likes = data.val();
    dispatch(likesGetSuccess(likes));
  }).catch(error => dispatch(likesError(error)));
};

//*** SERVICES ***//
export const addLike = (authId, uploadId, type) => dispatch => {
  const likesUserRef = database.ref(`users/${authId}/likes`);
  likesUserRef.child(`/${uploadId}/id`).set(uploadId);

  if(type === 'image'){
    const likesUploadRef = database.ref(`uploads/images/${uploadId}/likes`);
    likesUploadRef.child(`${authId}/id`).set(authId);
  }
  if(type === 'video') {
    const likesUploadRef = database.ref(`uploads/videos/${uploadId}/likes`);
    likesUploadRef.child(`${authId}/id`).set(authId);
  }
};

export const removeLike = (authId, uploadId, type) => dispatch => {
  database.ref(`users/${authId}/likes/${uploadId}`).remove();

  if(type === 'image'){
    database.ref(`uploads/images/${uploadId}/likes/${authId}`).remove()
  }
  if(type === 'video') {
    database.ref(`uploads/videos/${uploadId}/likes/${authId}`).remove()
  }
};