import {database} from "../firebase";
import _ from 'lodash';
import {UserObject} from './models';
import * as firebase from "firebase";

export const USER_REQUEST = 'USER_REQUEST';
export const userRequest = () => ({
  type: USER_REQUEST,
});

export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const userGetSuccess = (data) => ({
  type: USER_GET_SUCCESS,
  data
});

export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const userUpdateSuccess = () => ({
  type: USER_UPDATE_SUCCESS,
});

export const USER_ERROR = 'USER_ERROR';
export const userError = error => ({
  type: USER_ERROR,
  error
});

//*** ACTIONS ***//

export const getUser = userId => dispatch => {
  dispatch(userRequest());
  return database.ref(`users/${userId}/`).on('value', (data) => {
    dispatch(userGetSuccess(data.val()));
  });
};

export const getUserPromise = (userId) => dispatch => {
  dispatch(userRequest());
  return new Promise((resolve, reject) => {
    database.ref(`users/${userId}`).on('value', (data) => {
      let userInfo = data.val();
      resolve(dispatch(userGetSuccess(userInfo)));
    });
  });
};

export const getUserOnce = userId => dispatch => {
  dispatch(userRequest());
  return database.ref(`users/${userId}/`).once('value', (data) => {
    dispatch(userGetSuccess(data.val()));
  }).catch(error => dispatch(userError(error)));
};

export const getUserOncePromise = userId => dispatch => {
  dispatch(userRequest());
  return new Promise((resolve, reject) => {
    database.ref(`users/${userId}/`).once('value', (data) => {
      let userInfo = data.val();
      resolve(dispatch(userGetSuccess(userInfo)));
    }).catch(error => resolve(dispatch(userError(error))));
  })
};

//*** SERVICES ***//

export const updateUserProfile = (auth, data, file) => dispatch => {
  return database.ref(`users/${auth.uid}/profile`).update({
    name: data.editName,
    bio: data.editBio,
    avatar: {
      etag: file.etag,
      url: file.secure_url,
      height: file.height,
      width: file.width,
      format: file.format,
      createdAt: file.created_at
    }})
    .catch(error => dispatch(userError(error)))
};

export const updateUserUpload = (auth, data) => dispatch => {
  dispatch(userRequest());
  const updates = {};
  updates[`users/${auth.uid}/${data.type}s/${data.uploadId}/content/title`] = data.editTitle;
  updates[`users/${auth.uid}/${data.type}s/${data.uploadId}/content/caption`] = data.editCaption;

  return database.ref().update(updates)
    .catch(error => dispatch(userError(error)));
};

export const updateUserFollows = (auth, values, file) => dispatch => {
  database.ref(`/users/${auth.uid}/following`).on('value', data => {
    const followingArray = data.val();
    _.forEach(followingArray, followee => {
      if(followee.id === 'default'){return null}
      const userFollowingRef = database.ref(`users/${followee.id}/following/${auth.uid}`);
      userFollowingRef.update({
        avatar: {
          url: file.secure_url
        },
        bio: values.editBio,
        name: values.editName,
        username: auth.displayName
      })
    })
  });

  database.ref(`/users/${auth.uid}/followers/`).on('value', data => {
    const followersArray = data.val();
    _.forEach(followersArray, follower => {
      if (follower.id === 'default') {
        return null
      }
      const userFollowersRef = database.ref(`users/${follower.id}/followers/${auth.uid}`);
      userFollowersRef.update({
        avatar: {
          url: file.secure_url
        },
        bio: values.editBio,
        name: values.editName,
        username: auth.displayName
      })
    });
  });
};