import {database} from "../firebase";
import _ from 'lodash';
import {UserObject, UploadObject} from './models';

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

export const editUserUpload = (auth, data) => dispatch => {
  const updates = {};
  updates[`users/${auth.uid}/${data.type}s/${data.uploadId}/content/title`] = data.editTitle;
  updates[`users/${auth.uid}/${data.type}s/${data.uploadId}/content/caption`] = data.editCaption;
  return database.ref().update(updates)
    .catch(error => dispatch(userError(error)));
};

export const updateUserComments = (auth, comments, file) => dispatch => {
  Object.keys(comments).map((uploadId) => {
    Object.keys(comments[uploadId]).map((commentId) => {
      database.ref('/comments/').child(`${comments[uploadId][commentId].uploadId}/${comments[uploadId][commentId].commentId}/profile/avatar/url`).set(file.secure_url)
    })
  })
};

export const updateUserFavorites = (auth, trackedFavorites, file) => dispatch => {
  _.forEach(trackedFavorites, trackedFavorite => {
    Object.keys(trackedFavorite).map((uploadId) =>{
      Object.keys(trackedFavorite[uploadId]).map((userId) => {
        database.ref('users')
          .child(`/${trackedFavorite[uploadId][userId].userId}/favorites/${trackedFavorite[uploadId][userId].uploadId}/publisher/avatar/url`)
          .set(file.secure_url)
      })
    })
  })
};

export const updateUserFollows = (auth, following, followers, values, file) => dispatch => {
  _.forEach(following, followee => {
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
  });

  _.forEach(followers, follower => {
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
};


//TODO: Update all Uploads on user edit (**favorites**, uploads, users)
export const updateUserUploads = (auth, values, file) => dispatch => {
  database.ref(`/uploads`).child('/images').once('value', data => {
    const imageArray = data.val();
    _.forEach(imageArray, item => {
      const publisherRef = database.ref(`/uploads/images/${item.id}/publisher`);
      if(item.id === 'default') {
        return null;
      }
      else if(item.publisher.id === auth.uid) {
        const update = new UploadObject(values, file);
        publisherRef.update(update);
      }
    });
  });

  database.ref(`/uploads`).child('/videos').once('value', data => {
    const videoArray = data.val();
    _.forEach(videoArray, item => {
      const publisherRef = database.ref(`/uploads/videos/${item.id}/publisher`);
      if(item.id === 'default') {
        return null;
      }
      else if(item.publisher.id === auth.uid) {
        const update = new UploadObject(values, file);
        publisherRef.update(update);
      }
    });
  });

  database.ref(`/users/${auth.uid}`).child('/images').once('value', data => {
    const imageArray = data.val();
    _.forEach(imageArray, item => {
      const publisherRef = database.ref(`/users/${auth.uid}/images/${item.id}/publisher`);
      const update = new UploadObject(values, file);
      publisherRef.update(update);
    });
  });

  database.ref(`/users/${auth.uid}`).child('/videos').once('value', data => {
    const videoArray = data.val();
    _.forEach(videoArray, item => {
      const publisherRef = database.ref(`/users/${auth.uid}/videos/${item.id}/publisher`);
      const update = new UploadObject(values, file);
      publisherRef.update(update);
    });
  });

  //TODO: Update all tracked Favorites
};