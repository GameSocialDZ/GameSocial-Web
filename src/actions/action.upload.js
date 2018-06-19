//import {normalizeResponseErrors} from '../utils';
//import {SubmissionError} from "redux-form";
import  {database} from "../firebase";
import _ from 'lodash';
//import {VideoObject} from "./models";

// GET Action
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const uploadRequest = () => ({
  type: UPLOAD_REQUEST
});

export const UPLOAD_GET_SUCCESS = 'UPLOAD_GET_SUCCESS';
export const uploadGetSuccess = (data) => ({
  type: UPLOAD_GET_SUCCESS,
  data
});

export const UPLOAD_POST_SUCCESS = 'UPLOAD_POST_SUCCESS';
export const uploadPostSuccess = () => ({
  type: UPLOAD_POST_SUCCESS,
});

export const UPLOAD_UPDATE_SUCCESS = 'UPLOAD_POST_SUCCESS';
export const uploadUpdateSuccess = () => ({
  type: UPLOAD_UPDATE_SUCCESS
});

export const UPLOAD_DELETE_SUCCESS = 'UPLOAD_DELETE_SUCCESS';
export const uploadDeleteSuccess = () => ({
  type: UPLOAD_DELETE_SUCCESS
});

export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const uploadError = error => ({
  type: UPLOAD_ERROR,
  error
});

// Actions
export const getUploads = () => dispatch => {
  dispatch(uploadRequest());
  return database.ref('uploads/').on('value', data => {
    dispatch(uploadGetSuccess(data.val()));
  })
};

export const getUploadsPromise = () => dispatch => {
  dispatch(uploadRequest());
  return new Promise((resolve, reject) => {
    database.ref('uploads/').on('value', data => {
      let uploads = data.val();
      resolve(dispatch(uploadGetSuccess(uploads)));
    })
  });
};

// Services

export const upload = (data, file) => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadRequest());

    let upload;
  if(file.resource_type === 'video') {
    //TODO: Use the newVideo Obj
    // const newVideo = new VideoObject(data, file);
    upload = {
      id: file.public_id,
      c_id: file.public_id,
      content: {
        category: '', //values.category
        title: data.title || '',
        caption: data.caption || '',
        createdAt: file.created_at
      },
      publisher: data.publisher,
      name: file.original_filename,
      url: file.secure_url,
      config: {
        type: file.resource_type,
        size: file.bytes,
        format: file.format,
        width: file.width,
        height: file.height,
        codec: file.video.codec
      },
      audio: file.audio,
      points: {
        comment_count: 0,
        like_count: 0,
        timestamp: '',
        view_count: 0
      },
      status: {
        enabled: true,
        featured: false,
        flagged: false
      },
      options: {
        autoPlay: true,
        looping_enabled: true,
      },
      thumbnail: {
        small: '',
        large: ''
      }
    };

    //TODO: Remove debug
    console.log(upload);

    const postId = database.ref().child('uploads/videos').push().key;
    upload.id = postId;
    console.log(postId);

    const updates = {};
    updates[`uploads/videos/${postId}`] = upload;
    updates[`users/${data.publisher.id}/videos/${postId}`] = upload;

    return database.ref().update(updates)
      .catch(dispatch(error => dispatch(uploadError(error))));
  }
  else if (file.resource_type === 'image'){
    //TODO: Use the newImage Obj
    // const newImage = new ImageObject(data, file)
    upload = {
      id: file.public_id,
      content: {
        category: '', //values.category
        title: data.title || '',
        caption: data.caption || '',
        createdAt: file.created_at
      },
      publisher: data.publisher,
      name: file.original_filename,
      url: file.secure_url,
      config: {
        type: file.resource_type,
        size: file.bytes,
        format: file.format,
        width: file.width,
        height: file.height,
      },
      points: {
        comment_count: 0,
        like_count: 0,
        timestamp: '',
        view_count: 0
      },
      status: {
        enabled: true,
        featured: false,
        flagged: false
      },
      options: {
        autoPlay: true,
        looping_enabled: true,
      },
      thumbnail: {
        small: '',
        large: ''
      }
    };

    //TODO: Remove debug
    console.log(upload);

    const postId = database.ref().child('uploads/images').push().key;
    upload.id = postId;

    const updates = {};
    updates[`uploads/images/${postId}`] = upload;
    updates[`users/${data.publisher.id}/images/${postId}`] = upload;

    return database.ref().update(updates)
      .catch(dispatch(error => dispatch(uploadError(error))));
  }
};

export const updateUpload = (data) => dispatch => {
  dispatch(uploadRequest());

  const updates = {};
  updates[`uploads/${data.type}s/${data.uploadId}/content/title`] = data.editTitle;
  updates[`uploads/${data.type}s/${data.uploadId}/content/caption`] = data.editCaption ;

  return database.ref().update(updates)
    .catch(error => dispatch(uploadError(error)));
};

export const updatePublisherUploads = (auth, values, file) => dispatch => {
  database.ref(`/uploads`).child('/images').once('value', data => {
    const imageArray = data.val();
    _.forEach(imageArray, item => {
      const publisherRef = database.ref(`/uploads/images/${item.id}/publisher`);
      if(item.id === 'default') {
        return null;
      }
      else if(item.publisher.id === auth.uid) {
        publisherRef.child('/avatar/createdAt').set(file.created_at);
        publisherRef.child('/avatar/etag').set(file.etag);
        publisherRef.child('/avatar/format').set(file.format);
        publisherRef.child('/avatar/width').set(file.width);
        publisherRef.child('/avatar/height').set(file.height);
        publisherRef.child('/avatar/url').set(file.secure_url);
        publisherRef.child('/bio').set(values.editBio);
        publisherRef.child('/name').set(values.editName);
      }
    });
  });

  database.ref(`/uploads`).child('/videos').once('value', data => {
    const videoArray = data.val();
    console.log(videoArray);
    _.forEach(videoArray, item => {
      const publisherRef = database.ref(`/uploads/videos/${item.id}/publisher`);
      if(item.id === 'default') {
        return null;
      }
      else if(item.publisher.id === auth.uid) {
        publisherRef.child('/avatar/createdAt').set(file.created_at);
        publisherRef.child('/avatar/etag').set(file.etag);
        publisherRef.child('/avatar/format').set(file.format);
        publisherRef.child('/avatar/width').set(file.width);
        publisherRef.child('/avatar/height').set(file.height);
        publisherRef.child('/avatar/url').set(file.secure_url);
        publisherRef.child('/bio').set(values.editBio);
        publisherRef.child('/name').set(values.editName);
      }
    });
  });

  database.ref(`/users/${auth.uid}`).child('/images').once('value', data => {
    const imageArray = data.val();
    console.log(imageArray);
    _.forEach(imageArray, item => {
      const publisherRef = database.ref(`/users/${auth.uid}/images/${item.id}/publisher`);
        publisherRef.child('/avatar/createdAt').set(file.created_at);
        publisherRef.child('/avatar/etag').set(file.etag);
        publisherRef.child('/avatar/format').set(file.format);
        publisherRef.child('/avatar/width').set(file.width);
        publisherRef.child('/avatar/height').set(file.height);
        publisherRef.child('/avatar/url').set(file.secure_url);
        publisherRef.child('/bio').set(values.editBio);
        publisherRef.child('/name').set(values.editName);
    });
  });

  database.ref(`/users/${auth.uid}`).child('/videos').once('value', data => {
    const videoArray = data.val();
    _.forEach(videoArray, item => {
      const publisherRef = database.ref(`/users/${auth.uid}/videos/${item.id}/publisher`);
        publisherRef.child('/avatar/createdAt').set(file.created_at);
        publisherRef.child('/avatar/etag').set(file.etag);
        publisherRef.child('/avatar/format').set(file.format);
        publisherRef.child('/avatar/width').set(file.width);
        publisherRef.child('/avatar/height').set(file.height);
        publisherRef.child('/avatar/url').set(file.secure_url);
        publisherRef.child('/bio').set(values.editBio);
        publisherRef.child('/name').set(values.editName);
    });
  });
};

export const deleteUpload = (uploadId, type) => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadRequest());

  return database.ref('uploads/').child(`${type}/${uploadId}`).remove()
    .then(dispatch(uploadDeleteSuccess()))
    .catch(err => {dispatch(uploadError(err));});
};