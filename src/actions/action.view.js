//import  {database, storage} from "../firebase";
//import {VideoObject} from "./models";

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
export const viewDelete = () => ({
  type: VIEW_DELETE_SUCCESS
});

export const VIEW_ERROR = 'VIEW_ERROR';
export const viewError = error => ({
  type: VIEW_ERROR,
  error
});

export const getView = data => dispatch => {
  dispatch(viewRequest);
  return dispatch(viewGetSuccess(data));
};

export const deleteView = () => dispatch => {
  dispatch(viewRequest());
  dispatch(viewDelete());
};