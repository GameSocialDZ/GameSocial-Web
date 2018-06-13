//import  {database, storage} from "../firebase";
//import {VideoObject} from "./models";

import {database} from "../firebase";

export const VIEW_REQUEST = 'VIEW_REQUEST';
export const viewRequest = () => ({
  type: VIEW_REQUEST
});


export const VIEW_GET_SUCCESS = 'VIEW_GET_SUCCESS';
export const viewGetSuccess = (data) => ({
  type: VIEW_GET_SUCCESS,
  data
});

export const VIEW_DELETE_SUCCESS = 'VIEW_DELETE_SUCCESS';
export const viewDeleteSuccess = () => ({
  type: VIEW_DELETE_SUCCESS
});

export const VIEW_ERROR = 'VIEW_ERROR';
export const viewError = error => ({
  type: VIEW_ERROR,
  error
});

export const getViewPromise = (uploadId, type) => dispatch => {
  dispatch(viewRequest());
  return new Promise((resolve, reject) => {
    database.ref(`uploads/${type}/${uploadId}`).on('value', (data) => {
      let upload = data.val();
      console.log(upload);
      resolve(dispatch(viewGetSuccess(upload)));
    });
  });
};

export const deleteView = () => dispatch => {
  dispatch(viewRequest());
  dispatch(viewDeleteSuccess());
};