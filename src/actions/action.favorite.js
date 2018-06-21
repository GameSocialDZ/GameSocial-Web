import {database} from "../firebase";
import {FavoriteObject} from './models';
import _ from 'lodash';

export const FAVORITE_REQUEST = 'FAVORITE_REQUEST';
export const favoriteRequest = () => ({
  type: FAVORITE_REQUEST,
});

export const FAVORITE_GET_SUCCESS = 'FAVORITE_GET_SUCCESS';
export const favoriteGetSuccess = (data) => ({
  type: FAVORITE_GET_SUCCESS,
  data
});

export const FAVORITE_UPDATE_SUCCESS = 'FAVORITE_UPDATE_SUCCESS';
export const favoriteUpdateSuccess = () => ({
  type: FAVORITE_UPDATE_SUCCESS,
});

export const FAVORITE_DELETE_SUCCESS = 'FAVORITE_DELETE_SUCCESS';
export const favoriteDeleteSuccess = () => ({
  type: FAVORITE_DELETE_SUCCESS,
});

export const FAVORITE_ERROR = 'FAVORITE_ERROR';
export const favoriteError = error => ({
  type: FAVORITE_ERROR,
  error
});

//*** ACTIONS **//
export const getFavoritesPromise = (authId) => dispatch => {
  dispatch(favoriteRequest());
  return new Promise((resolve, reject) => {
    database.ref(`users/${authId}/favorites`).on('value', (data) => {
      let favorites = data.val();
      resolve(dispatch(favoriteGetSuccess(favorites)));
    });
  })
};

export const getFavorites = (authId) => dispatch => {
  dispatch(favoriteRequest());
  return database.ref(`users/${authId}/favorites`).on('value', (data) => {
    let favorites = data.val();
    dispatch(favoriteGetSuccess(favorites));
  });
};

export const getFavoritesOnce = (authId) => dispatch => {
  dispatch(favoriteRequest());
  return database.ref(`users/${authId}/favorites`).once('value', (data) => {
    let favorites = data.val();
    dispatch(favoriteGetSuccess(favorites));
  }).catch(error => dispatch(followersError(error)));
};

//*** SERVICES ***//
export const addFavorite = (authId, upload) => dispatch => {
  let favoriteObject = new FavoriteObject(upload);

  const favoritesRef = database.ref(`users/${authId}/favorites`);
  favoritesRef.child(`/${upload.id}`).set(favoriteObject);
};

export const removeFavorite = (authId, uploadId) => dispatch => {
  database.ref(`users/${authId}/favorites/${uploadId}`).remove()
};