  
  import firebase from 'firebase'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAgc7NeXs7KXB59VerIVWM925h4sncg5mE",
    authDomain: "control-inventario-5c8da.firebaseapp.com",
    projectId: "control-inventario-5c8da",
    storageBucket: "control-inventario-5c8da.appspot.com",
    messagingSenderId: "14927172760",
    appId: "1:14927172760:web:103a3762265842f9602ced"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()