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

export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const userUpdateSuccess = () => ({
  type: USER_UPDATE_SUCCESS,
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

export const updateUserProfile = (userId, data, file) => dispatch => {
  dispatch(userRequest());
  return database.ref(`users/${userId}/profile`).update({
    name: data.editName,
    bio: data.editBio,
    avatar: {
      etag: file.etag,
      url: file.secure_url,
      height: file.height,
      width: file.width,
      format: file.format,
      createdAt: file.created_at
    }
  })
    .then(dispatch(userUpdateSuccess()))
    .catch(error => dispatch(userError(error)))
};

export const updateUserUpload = (data) => dispatch => {
  dispatch(userRequest());

  const updates = {};
  updates[`users/${data.userId}/${data.type}s/${data.uploadId}/content/title`] = data.editTitle;
  updates[`users/${data.userId}/${data.type}s/${data.uploadId}/content/caption`] = data.editCaption;

  return database.ref().update(updates)
    .then(dispatch(userUpdateSuccess()))
    .catch(error => dispatch(userError(error)));
};

export const addUserFollowing = (authId ,publisherId) => dispatch => {
  return database.ref(`users/${authId}/following`).child(publisherId).set(publisherId);
};

export const addUserFollower = (authId, publisherId) => dispatch => {
  return database.ref(`users/${publisherId}/followers`).child(authId).set(authId);
};

export const removeUserFollowing = (authId, publisherId) => dispatch => {
  return database.ref(`users/${authId}/following/${publisherId}`).remove();
};

export const removeUserFollower = (authId, publisherId) => dispatch => {
  return database.ref(`users/${publisherId}/followers/${authId}`).remove();
};

// export const getUserUploads = (id) => dispatch => {
//   dispatch(uploadRequest());
//   return database.ref(`user/${id}/videos`).on('value', data => {
//     dispatch(uploadGetSuccess())
//   });
// };