import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDRZCVnqnq0h2bf0_g2saxJtwBfXHREnZE",
    authDomain: "chat-web-app-791c7.firebaseapp.com",
    databaseURL: "https://chat-web-app-791c7-default-rtdb.firebaseio.com",
    projectId: "chat-web-app-791c7",
    storageBucket: "chat-web-app-791c7.appspot.com",
    messagingSenderId: "832953670107",
    appId: "1:832953670107:web:38f21dd94cfa7888f6affe"
  };

  const app = firebase.initializeApp(config); 

  export const auth = app.auth();
  export const database = app.database();
  export const storage = app.storage();