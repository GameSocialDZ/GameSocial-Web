//import {SubmissionError} from 'redux-form';
//import {normalizeResponseErrors} from '../utils';
import {auth, database} from "../firebase";

import {NewUserObject} from './models';

export const USER_SUCCESS = 'USER_SUCCESS';
export const userSuccess = data => ({
  type: USER_SUCCESS,
  data
});

export const USER_ERROR = 'USER_ERROR';
export const userError = error => ({
  type: USER_ERROR,
  error
});

export const registerEmailPassword = (_user) => dispatch => {
  return auth.createUserWithEmailAndPassword(_user.email, _user.password)
    .then(user => {
      // TODO: Make any further validations (Check if existing identifier and passwords match)
      // Update the furebase.auth()
      user.updateProfile({displayName: _user.username})
        .then(() =>{console.log('register success1')})
        .catch(error => {console.log(error.message)});

      const newUser = new NewUserObject(user, '');
      let userRef = database.ref('users');
      userRef.child(user.uid).set(newUser);
    })
    .catch((error) => {
    console.log(error.message);
  });
};


export const loginEmailPassword = (user) => dispatch => {
  return auth.signInWithEmailAndPassword(user.loginEmail, user.loginPassword)
    .then(console.log('Login Success'))
    .catch(error =>{
      console.log(error.message);
    })
};
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