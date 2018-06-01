import {database} from "../firebase";
import _ from 'lodash';
import {otherUserUpdateSuccess} from './action.otherUser';

export const FOLLOW_REQUEST = 'USER_REQUEST';
export const followRequest = () => ({
  type: FOLLOW_REQUEST,
});

export const FOLLOW_GET_SUCCESS = 'FOLLOW_GET_SUCCESS';
export const followGetSuccess = (followers, following) => ({
  type: FOLLOW_GET_SUCCESS,
  followers,
  following
});

export const FOLLOW_UPDATE_SUCCESS = 'FOLLOW_UPDATE_SUCCESS';
export const followUpdateSuccess = () => ({
  type: FOLLOW_UPDATE_SUCCESS,
});

export const FOLLOW_DELETE_SUCCESS = 'FOLLOW_DELETE_SUCCESS';
export const followDeleteSuccess = () => ({
  type: FOLLOW_DELETE_SUCCESS,
});

export const FOLLOW_ERROR = 'FOLLOW_ERROR';
export const followError = error => ({
  type: FOLLOW_ERROR,
  error
});

export const getFollowers = (userId) => dispatch => {
  dispatch(followRequest());
  return database.ref(`users/${userId}/followers/`).on('value', (data) => {
    dispatch(followGetSuccess(data.val()));
  });
};

export const getFollowing = (userId) => dispatch => {
  dispatch(followRequest());
  return database.ref(`users/${userId}/followers`).on('value', (data) => {
    dispatch(followGetSuccess(data.val()));
  });
};

export const getFollowersOnce = (userId) => dispatch => {
  dispatch(userRequest());
  return database.ref(`users/${userId}/followers`).once('value', (data) => {
    dispatch(userGetSuccess(data.val()));
  }).catch(error => dispatch(userError(error)));
};

export const getFollowingOnce = (userId) => dispatch => {
  dispatch(followRequest());
  return database.ref(`users/${userId}/following`).once('value', (data) => {
    dispatch(followGetSuccess(data.val()));
  }).catch(error => dispatch(followError(error)));
};

export const addUserFollowing = (userId ,publisher) => dispatch => {
  const followingRef = database.ref(`users/${userId}/following`);
  followingRef.child(`${publisher.id}/id`).set(publisher.id);
  followingRef.child(`${publisher.id}/username`).set(publisher.username);
  followingRef.child(`${publisher.id}/avatar/url`).set(publisher.avatar.url);
  // followingRef.child(`${publisher.id}/bio`).set(publisher.bio);
};

export const addUserFollower = (user, publisherId) => dispatch => {
  const followersRef = database.ref(`users/${publisherId}/followers`);
  followersRef.child(`${user.id}/id`).set(user.id);
  followersRef.child(`${user.id}/username`).set(user.username);
  followersRef.child(`${user.id}/avatar/url`).set(user.avatar.url);
  // followersRef.child(`${user.id}/bio`).set(user.bio);
};

export const removeUserFollowing = (userId, publisherId) => dispatch => {
  database.ref(`users/${userId}/following/${publisherId}`).remove();
};

export const removeUserFollower = (userId, publisherId) => dispatch => {
  database.ref(`users/${publisherId}/followers/${userId}`).remove();
};

export const updateUserFollowersAndFollowing = (auth, values, file) => dispatch => {
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
};

export const deleteFollow = () => dispatch => {
  dispatch(followRequest());
  dispatch(followDeleteSuccess());
};