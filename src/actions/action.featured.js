import {database} from "../firebase";
import {FavoriteObject} from './models';
import _ from 'lodash';

export const FEATURED_REQUEST = 'FEATURED_REQUEST';
export const featuredRequest = () => ({
  type: FEATURED_REQUEST,
});

export const FEATURED_GET_SUCCESS = 'FEATURED_GET_SUCCESS';
export const featuredGetSuccess = (data) => ({
  type: FEATURED_GET_SUCCESS,
  data
});

export const FEATURED_ERROR = 'FEATURED_ERROR';
export const featuredError = error => ({
  type: FEATURED_ERROR,
  error
});

//*** ACTIONS **//
export const getFeaturedPromise = () => dispatch => {
  dispatch(featuredRequest());
  return new Promise((resolve, reject) => {
    database.ref(`featured`).on('value', (data) => {
      let featured = data.val();
      resolve(dispatch(featuredGetSuccess(featured)));
    });
  }).catch(error => dispatch(featuredError(error)));
};

export const getFeaturedOnce = () => dispatch => {
  dispatch(featuredRequest());
  return database.ref(`featured`).once('value', (data) => {
    let featured = data.val();
    dispatch(featuredGetSuccess(featured));
  }).catch(error => dispatch(featuredError(error)));
};

//*** SERVICES ***//
export const addFeatured = (upload) => dispatch => {
  const featuredRef = database.ref(`featured/${upload.id}`);
  featuredRef.child('/id').set(upload.id);
  featuredRef.child('/publisher').set(upload.publisher);
  featuredRef.child('/content').set(upload.content);
  featuredRef.child('/url').set(upload.url);
  featuredRef.child('thumbnail').set(upload.thumbnail);
};

export const removeFeatured = (uploadId) => dispatch => {
  database.ref(`featured/${uploadId}`).remove();
};