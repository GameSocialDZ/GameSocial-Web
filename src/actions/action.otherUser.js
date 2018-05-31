//import  {database, storage} from "../firebase";
//import {VideoObject} from "./models";

import {database} from "../firebase";

export const OTHER_USER_REQUEST = 'OTHER_USER_REQUEST';
export const otherUserRequest = () => ({
  type: OTHER_USER_REQUEST
});


export const OTHER_USER_GET_SUCCESS = 'OTHER_USER_GET_SUCCESS';
export const otherUserGetSuccess = (data) => ({
  type: OTHER_USER_GET_SUCCESS,
  data
});

export const OTHER_USER_DELETE_SUCCESS = 'OTHER_USER_DELETE_SUCCESS';
export const otherUserDeleteSuccess = () => ({
  type: OTHER_USER_DELETE_SUCCESS
});

export const OTHER_USER_UPDATE_SUCCESS = 'OTHER_USER_UPDATE_SUCCESS';
export const otherUserUpdateSuccess = () => ({
  type: OTHER_USER_UPDATE_SUCCESS
});


export const OTHER_USER_ERROR = 'OTHER_USER_ERROR';
export const otherUserError = error => ({
  type: OTHER_USER_ERROR,
  error
});

export const getOtherUser = (userId) => dispatch => {
  dispatch(otherUserRequest);
  database.ref(`users/${userId}`).on('value', data => {
    return dispatch(otherUserGetSuccess(data.val()));
  });
};

export const deleteOtherUser = () => dispatch => {
  dispatch(otherUserRequest());
  dispatch(otherUserDeleteSuccess());
};