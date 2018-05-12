//export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyALcEJyPvQDEb1bZZVGKbveu5woOpxw4hs",
  authDomain: "gamesocial-zb.firebaseapp.com",
  databaseURL: "https://gamesocial-zb.firebaseio.com",
  projectId: "gamesocial-zb",
  storageBucket: "gamesocial-zb.appspot.com",
  messagingSenderId: "659801044712"
};

firebase.initializeApp(config);

export const database =  firebase.database();

export const auth = firebase.auth();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();