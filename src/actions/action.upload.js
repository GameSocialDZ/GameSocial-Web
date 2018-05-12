//import {normalizeResponseErrors} from '../utils';
//import {SubmissionError} from "redux-form";

import  {database} from "../firebase";

// GET Action
export const UPLOAD_LOADER = 'UPLOAD_LOADER';
export const uploadLoader = () => ({
  type: UPLOAD_LOADER
});

export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const uploadSuccess = data => ({
  type: UPLOAD_SUCCESS,
  data
});

export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const uploadError = error => ({
  type: UPLOAD_ERROR,
  error
});

// Methods
export const getUploads = () => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadLoader());
  return database.ref('posts/').on('value', data => {
    dispatch(uploadSuccess(data.val()));
  });
};

export const upload = (data) => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadLoader());
  return database.ref('posts/').push(data)
    .then(dispatch(getUploads()))
    .catch(err => {
      dispatch(uploadError(err))
    });
};

export const deleteUpload = (id) => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadLoader());
  return database.ref('posts/').child(id).remove()
    .then(dispatch(uploadSuccess()))
    .catch(err => {
      dispatch(uploadError(err));
    });
};