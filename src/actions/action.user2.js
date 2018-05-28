import {database} from "../firebase";

export const USER2_REQUEST = 'USER2_REQUEST';
export const user2Request = () => ({
  type: USER2_REQUEST,
});

export const USER2_GET_SUCCESS = 'USER2_GET_SUCCESS';
export const user2GetSuccess = (data) => ({
  type: USER2_GET_SUCCESS,
  data
});

export const USER2_UPDATE_SUCCESS = 'USER2_UPDATE_SUCCESS';
export const user2UpdateSuccess = () => ({
  type: USER2_UPDATE_SUCCESS,
});

export const USER2_DELETE_SUCCESS = 'USER2_DELETE_SUCCESS';
export const user2DeleteSuccess = () => ({
  type: USER2_DELETE_SUCCESS,
});

export const USER2_ERROR = 'USER2_ERROR';
export const user2Error = error => ({
  type: USER2_ERROR,
  error
});

export const getUser = userId => dispatch => {
  dispatch(user2Request());
  return database.ref(`users/${userId}/`).on('value', (data) => {
    dispatch(user2GetSuccess(data.val()));
  });
};

export const getUserOnce = userId => dispatch => {
  dispatch(user2Request());
  return database.ref(`users/${userId}/`).once('value', (data) => {
    dispatch(user2GetSuccess(data.val()));
  }).catch(error => dispatch(user2Error(error)));
};