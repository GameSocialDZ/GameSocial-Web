import {database} from "../firebase";
import _ from 'lodash';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const commentsRequest = () => ({
  type: COMMENTS_REQUEST,
});

export const COMMENTS_GET_SUCCESS = 'COMMENTS_GET_SUCCESS';
export const commentsGetSuccess = (data) => ({
  type: COMMENTS_GET_SUCCESS,
  data
});

export const COMMENTS_UPDATE_SUCCESS = 'COMMENTS_UPDATE_SUCCESS';
export const commentsUpdateSuccess = () => ({
  type: COMMENTS_UPDATE_SUCCESS,
});

export const COMMENTS_DELETE_SUCCESS = 'COMMENTS_DELETE_SUCCESS';
export const commentsDeleteSuccess = () => ({
  type: COMMENTS_DELETE_SUCCESS,
});

export const COMMENTS_ERROR = 'COMMENTS_ERROR';
export const commentsError = error => ({
  type: COMMENTS_ERROR,
  error
});

// ACTIONS

export const getCommentsOnce = (uploadId) => dispatch => {
  dispatch(commentsRequest());
  return database.ref(`/comments/${uploadId}`).once('value', data => {
    const comments = data.val();
    dispatch(commentsGetSuccess(comments));
  })
};

export const getCommentsOncePromise = (uploadId) => dispatch => {
  dispatch(commentsRequest());
  return new Promise((resolve, reject) => {
    database.ref(`/comments/${uploadId}`).once('value', data => {
      const comments = data.val();
      resolve(dispatch(commentsGetSuccess(comments)))
    })
  })
};

export const getComments = (uploadId) => dispatch => {
  dispatch(commentsRequest());
  return database.ref(`/comments/${uploadId}`).on('value', data => {
    const comments = data.val();
    dispatch(commentsGetSuccess(comments));
  })
};

export const getCommentsPromise = (uploadId) => dispatch => {
  dispatch(commentsRequest());
  return new Promise((resolve, reject) => {
    database.ref(`/comments/${uploadId}`).on('value', data => {
      const comments = data.val();
      resolve(dispatch(commentsGetSuccess(comments)))
    })
  })
};

//SERVICES
export const addComment = (auth, uploadId, values) => dispatch => {
  console.log(values);
  const commentId = database.ref(`/comments/${uploadId}`).push().key;
  const commentRef = database.ref(`/comments/${uploadId}/${commentId}`);
  const userRef = database.ref(`/users/${auth.uid}/comments/${uploadId}/${commentId}`);

  commentRef.child('/comment').set(values.comment);
  commentRef.child('/uploadId').set(uploadId);
  commentRef.child('/commentId').set(commentId);
  commentRef.child('/profile/avatar/url').set(auth.photoURL);
  commentRef.child('/profile/username').set(auth.displayName);
  commentRef.child('profile/id').set(auth.uid);

  userRef.child('/uploadId').set(uploadId);
  userRef.child('/commentId').set(commentId);
};