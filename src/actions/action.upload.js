//import {normalizeResponseErrors} from '../utils';
//import {SubmissionError} from "redux-form";

import  {database} from "../firebase";

// GET Action
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const uploadRequest = () => ({
  type: UPLOAD_REQUEST
});

export const UPLOAD_GET_SUCCESS = 'UPLOAD_GET_SUCCESS';
export const uploadGetSuccess = (data) => ({
  type: UPLOAD_GET_SUCCESS,
  data
});

export const UPLOAD_POST_SUCCESS = 'UPLOAD_POST_SUCCESS';
export const uploadPostSuccess = (data) => ({
  type: UPLOAD_POST_SUCCESS,
  data
});

export const UPLOAD_DELETE_SUCCESS = 'UPLOAD_DELETE_SUCCESS';
export const uploadDeleteSuccess = () => ({
  type: UPLOAD_DELETE_SUCCESS
});

export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const uploadError = error => ({
  type: UPLOAD_ERROR,
  error
});

// Methods
export const getUploads = () => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadRequest(true));
  return database.ref('posts/').on('value', data => {
    dispatch(uploadGetSuccess(data.val()));})
};

export const upload = (data) => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadRequest());
  return database.ref('posts/').push(data)
    .then(dispatch(uploadPostSuccess()))
    .catch(err => {dispatch(uploadError(err))});
};

export const deleteUpload = (id) => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadRequest());
  return database.ref('posts/').child(id).remove()
    .then(dispatch(uploadDeleteSuccess()))
    .catch(err => {dispatch(uploadError(err));});
};