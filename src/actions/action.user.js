import {database} from "../firebase";

export const USER_REQUEST = 'USER_REQUEST';
export const userRequest = () => ({
  type: USER_REQUEST,
});

export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const userGetSuccess = (data) => ({
  type: USER_GET_SUCCESS,
  data
});

export const USER_ERROR = 'USER_ERROR';
export const userError = error => ({
  type: USER_ERROR,
  error
});

export const getUser = userId => dispatch => {
  dispatch(userRequest());
  return database.ref(`users/${userId}/`).on('value', (data) => {
    dispatch(userGetSuccess(data.val()));
  });
};

export const getUserOnce = userId => dispatch => {
  dispatch(userRequest());
  return database.ref(`users/${userId}/`).once('value', (data) => {
    dispatch(userGetSuccess(data.val()));
  }).catch(error => dispatch(userError(error)));
};

// export const getUserUploads = (id) => dispatch => {
//   dispatch(uploadRequest());
//   return database.ref(`user/${id}/videos`).on('value', data => {
//     dispatch(uploadGetSuccess())
//   });
// };