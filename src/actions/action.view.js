//import  {database, storage} from "../firebase";
//import {VideoObject} from "./models";

// GET Action
export const VIEW_REQUEST = 'VIEW_REQUEST';
export const viewRequest = () => ({
  type: VIEW_REQUEST
});

export const VIEW_GET_SUCCESS = 'VIEW_GET_SUCCESS';
export const viewGetSuccess = (data) => ({
  type: VIEW_GET_SUCCESS,
  data
});

export const VIEW_POST_SUCCESS = 'VIEW_POST_SUCCESS';
export const viewPostSuccess = (data) => ({
  type: VIEW_POST_SUCCESS,
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

export const VIEW_SET = 'VIEW_SET';
export const viewSet = (data) => ({
  type: VIEW_SET,
  data
});

export const setView = data => dispatch => {
  dispatch(viewRequest);
  dispatch(viewSet(data))
};