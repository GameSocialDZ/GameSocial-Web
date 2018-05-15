//import {normalizeResponseErrors} from '../utils';
//import {SubmissionError} from "redux-form";
import  {database, storage} from "../firebase";
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
export const uploadPostSuccess = (data) => ({
  type: UPLOAD_POST_SUCCESS,
  data
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

// Methods
export const getUploads = () => dispatch => {
  dispatch(uploadRequest());
  return database.ref('posts/').on('value', data => {
    dispatch(uploadGetSuccess(data.val()));})
};

export const upload = (data, file) => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadRequest());

  const uploadRef = storage.child(`uploads/${file.name}`);
  uploadRef.put(file)
    .then(store =>{
      const url = store.downloadURL;
      console.log(url);
      console.log(store);

      const upload = {
        id: '',
        content: {
          category: '', //values.category
          title: data.title,
          caption: data.caption,
          createdAt: store.metadata.timeCreated
        },
        publisher: data.publisher,
        source: {
          name: store.metadata.name,
          fullPath: store.metadata.fullPath,
          url: url,
          type: store.metadata.contentType,
          size: store.metadata.size
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
        thumbnail:{
          small: '',
          large: ''
        }
      };

      //TODO: Use the newVideo Obj
      // const newVideo = new VideoObject(data, url);
      const postId = database.ref().child('posts').push().key;
      upload.id = postId;
      console.log(postId);

      const updates = {};
      updates[`posts/${postId}`] = upload;
      updates[`users/${data.publisher.id}/pictures/${postId}`] = upload;

      return database.ref().update(updates);
  })
};

export const deleteUpload = (id) => dispatch => {
  // TODO: Check Authentication
  dispatch(uploadRequest());
  return database.ref('posts/').child(id).remove()
    .then(dispatch(uploadDeleteSuccess()))
    .catch(err => {dispatch(uploadError(err));});
};