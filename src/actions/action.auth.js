import {auth, database} from "../firebase";
import * as firebase from "firebase";
import {NewUserObject} from "./models";

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_GET_SUCCESS = 'AUTH_GET_SUCCESS';
export const authGetSuccess = (currentUser, data) => ({
  type: AUTH_GET_SUCCESS,
  currentUser,
  data
});

export const AUTH_UPDATE_SUCCESS = 'AUTH_UPDATE_SUCCESS';
export const authUpdateSuccess = () => ({
  type: AUTH_UPDATE_SUCCESS,
});

export const AUTH_DELETE_SUCCESS = 'AUTH_DELETE_SUCCESS';
export const authDeleteSuccess = () => ({
  type: AUTH_DELETE_SUCCESS
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = (error) => ({
  type: AUTH_ERROR,
  error
});

//*** ACTIONS ***//

export const registerEmailPassword = (user) => dispatch => {
  dispatch(authRequest());
  return auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(auth => {
      // TODO: Make any further validations (Check if existing identifier and passwords match)
      auth.updateProfile({displayName: user.username,
        photoURL: "https://res.cloudinary.com/diygdnbei/image/upload/v1519444005/zumnvvbqi0fo1zthkal7.png"})
        .catch(error => console.log(error.message));

      const username = user.username;

      const newUser = new NewUserObject(auth, '', username);
      let userRef = database.ref('users');
      userRef.child(auth.uid).set(newUser);

      return auth
    })
    .then(auth => dispatch(authGetSuccess(auth)))
    .catch((error) => {
      dispatch(authError(error));
    });
};


export const loginEmailPassword = (user) => dispatch => {
  dispatch(authRequest());
  return new Promise((resolve, reject) => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        auth.signInWithEmailAndPassword(user.loginEmail, user.loginPassword)
          .then(auth => {
            database.ref(`/users/${auth.uid}`).once('value', data =>{
              const user = data.val();
              auth.updateProfile({photoURL: user.profile.avatar.url});
              auth.isAdmin = user.isAdmin
            });
            console.log(auth);
            dispatch(authGetSuccess(auth));
          })
      })
  }).catch(error => dispatch(authError(error)))
};

export const getAuth = () => dispatch => {
  dispatch(authRequest());
  return auth.onAuthStateChanged(data => {
    dispatch(authGetSuccess(data));
  });
};


//*** SERVICES ***//

export const setAdmin = (auth) => dispatch => {
  database.ref(`users/${auth.id}/isAdmin`).once('value', data => {
    auth.isAdmin = data.val();
  })
};

export const updateAuth = (file) => dispatch => {
  auth.currentUser.updateProfile({
    photoURL: file.secure_url
  }).then(() => {
      console.log('Successfully Updated');
    }).catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  dispatch(authRequest());
  return auth.signOut().then(() =>{
    dispatch(authDeleteSuccess());
    console.log('Sign Out Successful');
  }).catch(error =>{
    dispatch(authError(error));
    console.log(error);
  });
};