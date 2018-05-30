import {auth, database} from "../firebase";
import * as firebase from "firebase";
import {NewUserObject} from "./models";
import {getUserOnce} from "./action.user";
import {userError} from './action.user';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_GET_SUCCESS = 'AUTH_GET_SUCCESS';
export const authGetSuccess = (currentUser) => ({
  type: AUTH_GET_SUCCESS,
  currentUser
});

export const AUTH_UPDATE_SUCCESS = 'AUTH_UPDATE_SUCCESS';
export const authUpdateSucess = () => ({
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
  return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      dispatch(authRequest());
      return auth.signInWithEmailAndPassword(user.loginEmail, user.loginPassword)
        .then(auth => {
          console.log(auth);

          database.ref(`/users/${auth.uid}/profile/avatar/url`).once('value', data =>{
            auth.updateProfile({photoURL: data.val()});
          });

          dispatch(authGetSuccess(auth));
          return dispatch(getUserOnce(auth.uid))
            .catch(error => dispatch(userError(error)))
        })
        .catch(error => {
          dispatch(authError(error));
        })
    }).catch((error) =>{
     dispatch(authError(error));
  });
};

export const getAuth = () => dispatch => {
  dispatch(authRequest());
  return auth.onAuthStateChanged(data => {
    dispatch(authGetSuccess(data));
  });
};

export const updateAuth = (file) => dispatch => {
  dispatch(authRequest());
  return auth.currentUser.updateProfile({
    photoURL: file.secure_url
  }).then(() => {
      dispatch(authUpdateSucess());
      console.log('Successfully Updated')
    }).catch(error => {
      dispatch(authError(error));
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  dispatch(authRequest());
  return auth.signOut().then(() =>{
    dispatch(authDeleteSuccess());
    console.log('Sign Out Successful');
  }).catch(error =>{
    dispatch(authError());
  });
};

//TODO: POSSIBLE FACEBOOK AND TWITERLOGIN
// export const facebookLogin = () => dispatch => {
//   return auth.signInWithPopup(facebookProvider)
//     .then(user => {
//       // TODO: Make any further validations (Check if existing identifier and passwords match)
//       // const token = result.credential.accessToken;
//       // const secret = result.credential.secret;
//       const user = user.user;
//       // TODO: Create user in the database
//       let newUser = new NewUserObject(user, '');
//       database.ref('users/').child(user.id).set(newUser)
//     }).catch(error => {
//       // const errorCode = error.code;
//       // const errorMessage = error.message;
//       // const email = error.email;
//       // const credential = error.credential;
//     });
// };
//
// export const twitterLogin = () => dispatch => {
//   return auth.signInWithPopup(twitterProvider)
//     .then(user => {
//       if(user.email === null) {
//         //TODO: Request email from user
//         //user.updateEmail('email')
//         // .then(() =>{console.log('Email Added')})
//         // .catch(error =>{console.log(error)})
//       }
//       // TODO: Make any further validations (Check if existing identifier and passwords match)
//       // const token = result.credential.accessToken;
//       // const secret = result.credential.secret;
//       // const user = user.user;
//       // TODO: Create user in the datatbase
//       let newUser = new NewUserObject(user, '');
//       database.ref('users/').child(user.id).set(newUser)
//     }).catch(error => {
//       // const errorCode = error.code;
//       // const errorMessage = error.message;
//       // const email = error.email;
//       // const credential = error.credential;
//     });
// };