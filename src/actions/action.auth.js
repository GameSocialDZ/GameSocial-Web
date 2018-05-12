//import {SubmissionError} from 'redux-form';
//import {normalizeResponseErrors} from '../utils';

import {auth} from "../firebase";

export const AUTH_GET = 'AUTH_GET';
export const authGet = (data) => ({
  type: AUTH_GET,
  data
});

export const AUTH_UPDATE = 'AUTH_UPDATE';
export const authUpdate = (data) => ({
  type: AUTH_UPDATE,
  data
});

export const getAuth = () => dispatch => {
  // Firebase method to watch the state of user
  return auth.onAuthStateChanged(data => {
    dispatch(authGet(data));
  });
};

export const updateAuth = (data) => {
  return auth.currentUser().updateAuth({
    displayName: data.username,
    photoURL: data.avatar
  })
    .then(() => {
      //TODO: Notify the user there profile was successfully updated
      console.log('Successfully Updated')
    }).catch(error => {
      //TODO: report to the user reason for unsuccessful update
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  return auth.signOut().then(() =>{
    console.log('Sign Out Successful');
  }).catch(error =>{
    console.log(error);
  });
};