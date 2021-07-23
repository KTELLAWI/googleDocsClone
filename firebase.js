import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCju9m5L-Cbjivp-1oTE-zlq6qochLLU8w",
    authDomain: "docs-877c6.firebaseapp.com",
    projectId: "docs-877c6",
    storageBucket: "docs-877c6.appspot.com",
    messagingSenderId: "34888984898",
    appId: "1:34888984898:web:6bca98119727f3b50040db"
  };


  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();

  export default db;