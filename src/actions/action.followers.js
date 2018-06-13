import {database} from "../firebase";
import _ from 'lodash';

export const FOLLOWERS_REQUEST = 'FOLLOWERS_REQUEST';
export const followersRequest = () => ({
  type: FOLLOWERS_REQUEST,
});

export const FOLLOWERS_GET_SUCCESS = 'FOLLOWERS_GET_SUCCESS';
export const followersGetSuccess = (data) => ({
  type: FOLLOWERS_GET_SUCCESS,
  data
});

export const FOLLOWERS_UPDATE_SUCCESS = 'FOLLOWERS_UPDATE_SUCCESS';
export const followersUpdateSuccess = () => ({
  type: FOLLOWERS_UPDATE_SUCCESS,
});

export const FOLLOWERS_DELETE_SUCCESS = 'FOLLOWERS_DELETE_SUCCESS';
export const followersDeleteSuccess = () => ({
  type: FOLLOWERS_DELETE_SUCCESS,
});

export const FOLLOWERS_ERROR = 'FOLLOWERS_ERROR';
export const followersError = error => ({
  type: FOLLOWERS_ERROR,
  error
});

export const getFollowersPromise = (userId) => dispatch => {
  dispatch(followersRequest());
  return new Promise((resolve, reject) => {
    database.ref(`users/${userId}/followers`).on('value', (data) => {
      let followers = data.val();
      resolve(dispatch(followersGetSuccess(followers)));
    });
  })
};

export const getFollowers = (userId) => dispatch => {
  dispatch(followersRequest());
  return database.ref(`users/${userId}/followers/`).on('value', (data) => {
    dispatch(followersGetSuccess(data.val()));
  });
};

export const getFollowersOnce = (userId) => dispatch => {
  dispatch(followersRequest());
  return database.ref(`users/${userId}/followers`).once('value', (data) => {
    dispatch(followersGetSuccess(data.val()));
  }).catch(error => dispatch(followersError(error)));
};

export const addUserFollowers = (user, publisherId) => dispatch => {
  const followersRef = database.ref(`users/${publisherId}/followers`);
  followersRef.child(`${user.id}/id`).set(user.id);
  followersRef.child(`${user.id}/username`).set(user.username);
  followersRef.child(`${user.id}/avatar/url`).set(user.avatar.url);
  // followersRef.child(`${user.id}/bio`).set(user.bio);
};

export const removeUserFollowers = (userId, publisherId) => dispatch => {
  database.ref(`users/${publisherId}/followers/${userId}`).remove();
};

export const updateUserFollowers = (auth, values, file) => dispatch => {
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