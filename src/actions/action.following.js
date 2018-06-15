import {database} from "../firebase";
import _ from 'lodash';

export const FOLLOWING_REQUEST = 'FOLLOWING_REQUEST';
export const followingRequest = () => ({
  type: FOLLOWING_REQUEST,
});

export const FOLLOWING_GET_SUCCESS = 'FOLLOWING_GET_SUCCESS';
export const followingGetSuccess = (data) => ({
  type: FOLLOWING_GET_SUCCESS,
  data
});

export const FOLLOWING_UPDATE_SUCCESS = 'FOLLOWING_UPDATE_SUCCESS';
export const followingUpdateSuccess = () => ({
  type: FOLLOWING_UPDATE_SUCCESS,
});

export const FOLLOWING_DELETE_SUCCESS = 'FOLLOWING_DELETE_SUCCESS';
export const followingDeleteSuccess = () => ({
  type: FOLLOWING_DELETE_SUCCESS,
});

export const FOLLOWING_ERROR = 'FOLLOWING_ERROR';
export const followingError = error => ({
  type: FOLLOWING_ERROR,
  error
});

//*** ACTIONS ***//

export const getFollowingPromise = (userId) => dispatch => {
  dispatch(followingRequest());
  return new Promise((resolve, reject) => {
    database.ref(`users/${userId}/following`).on('value', (data) => {
      const following = data.val();
      resolve(dispatch(followingGetSuccess(following)));
    })
  })
};

export const getFollowing = (userId) => dispatch => {
  dispatch(followingRequest());
  return database.ref(`users/${userId}/followers/`).on('value', (data) => {
    dispatch(followingGetSuccess(data.val()));
  });
};

export const getFollowingOnce = (userId) => dispatch => {
  dispatch(followingRequest());
  return database.ref(`users/${userId}/following`).once('value', (data) => {
    dispatch(followingGetSuccess(data.val()));
  }).catch(error => dispatch(followingError(error)));
};

//*** SERVICES ***//

export const addFollowing = (authId ,publisher) => dispatch => {
  const followingRef = database.ref(`users/${authId}/following`);
  followingRef.child(`${publisher.id}/id`).set(publisher.id);
  followingRef.child(`${publisher.id}/username`).set(publisher.username);
  followingRef.child(`${publisher.id}/avatar/url`).set(publisher.avatar.url);
};

export const removeFollowing = (authId, publisherId) => dispatch => {
  database.ref(`users/${authId}/following/${publisherId}`).remove();
};

export const updateFollowing = (auth, values, file) => dispatch => {
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