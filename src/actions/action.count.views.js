import {database} from "../firebase";
import _ from 'lodash';

export const COUNT_VIEWS_REQUEST = 'COUNT_VIEWS_REQUEST';
export const countViewsRequest = () => ({
  type: COUNT_VIEWS_REQUEST,
});

export const COUNT_VIEWS_GET_SUCCESS = 'COUNT_VIEWS_GET_SUCCESS';
export const countViewsGetSuccess = (data) => ({
  type: COUNT_VIEWS_GET_SUCCESS,
  data
});

export const COUNT_VIEWS_UPDATE_SUCCESS = 'COUNT_VIEWS_UPDATE_SUCCESS';
export const countViewsUpdateSuccess = () => ({
  type: COUNT_VIEWS_UPDATE_SUCCESS,
});

export const COUNT_VIEWS_DELETE_SUCCESS = 'COUNT_VIEWS_DELETE_SUCCESS';
export const countViewsDeleteSuccess = () => ({
  type: COUNT_VIEWS_DELETE_SUCCESS,
});

export const COUNT_VIEWS_ERROR = 'COUNT_VIEWS_ERROR';
export const countViewsError = error => ({
  type: COUNT_VIEWS_ERROR,
  error
});

//*** ACTIONS **//
export const getCountViewsPromise = (uploadId, type) => dispatch => {
  dispatch(countViewsRequest());
  if(type === 'image') {
    return new Promise((resolve, reject) => {
      database.ref(`uploads/images/${uploadId}/views`).on('value', (data) => {
        let views = data.val();
        let viewsCount = _.size(views);
        resolve(dispatch(countViewsGetSuccess(viewsCount)));
      });
    })
  }
  if(type === 'video') {
    return new Promise((resolve, reject) => {
      database.ref(`uploads/videos/${uploadId}/views`).on('value', (data) => {
        let views = data.val();
        let viewsCount = _.size(views);
        resolve(dispatch(countViewsGetSuccess(viewsCount)));
      });
    })
  }
};

export const getCountViews = (uploadId, type) => dispatch => {
  dispatch(countViewsRequest());
  if(type === 'image') {
    return database.ref(`uploads/images/${uploadId}/views`).on('value', (data) => {
      let views = data.val();
      let viewsCount = _.size(views);
      dispatch(countViewsGetSuccess(viewsCount));
    });
  }
  if(type === 'video') {
    return database.ref(`uploads/videos/${uploadId}/views`).on('value', (data) => {
      let views = data.val();
      let viewsCount = _.size(views);
      dispatch(countViewsGetSuccess(viewsCount));
    });
  }
};

export const getCountViewsOnce = (uploadId, type) => dispatch => {
  dispatch(countViewsRequest());
  if(type === 'image') {
    return database.ref(`uploads/images/${uploadId}/views`).once('value', (data) => {
      let views = data.val();
      let viewsCount = _.size(views);
      dispatch(countViewsGetSuccess(viewsCount));
    }).catch(error => dispatch(countViewsError(error)));
  }
  if(type === 'video') {
    return database.ref(`uploads/videos/${uploadId}/views`).once('value', (data) => {
      let views = data.val();
      let viewsCount = _.size(views);
      dispatch(countViewsGetSuccess(viewsCount));
    }).catch(error => dispatch(countViewsError(error)));
  }
};

//*** SERVICES ***//
export const addCountViews = (ipAddress, uploadId, type) => dispatch => {
  if(type === 'image') {
    //const ipKey = database.ref(`uploads/images/${uploadId}/views/`).push().key;
    database.ref(`uploads/images/${uploadId}/views/${ipAddress}`).set(ipAddress)
  }

  if(type === 'video') {
    //const ipKey = database.ref(`uploads/videos/${uploadId}/views/`).push().key;
    database.ref(`uploads/videos/${uploadId}/views/${ipAddress}`).set(ipAddress)
  }
};

export const checkUploadViewsList = (ipAddress, uploadId, type) => dispatch => {
  return new Promise((resolve, reject) => {
    if(type === 'image') {
      database.ref(`uploads/images/${uploadId}/views/${ipAddress}`)
        .on('value', data => {
          resolve(!!data.val())
        });
    }

    if(type === 'video'){
      database.ref(`uploads/videos/${uploadId}/views/${ipAddress}`)
        .on('value', data => {
          resolve(!!data.val())
        })
    }
  })
};