import firebase from 'firebase';


var config = {
    
    apiKey: "AIzaSyA0HeNfAC2LlagsXwbelzQN71xU3XLjvbk",
    authDomain: "collab-editor-22010.firebaseapp.com",
    databaseURL: "https://collab-editor-22010.firebaseio.com",
    projectId: "collab-editor-22010",
    storageBucket: "collab-editor-22010.appspot.com",
    messagingSenderId: "488365087389",
    appId: "1:488365087389:web:de53d486830a20a3"
  };

var fire = firebase.initializeApp(config);

export default fire;
