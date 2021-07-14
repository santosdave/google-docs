import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWR_GjaVNo2XT01Enr6TDC8-tr2txqytg",
    authDomain: "docs-clone-44e77.firebaseapp.com",
    projectId: "docs-clone-44e77",
    storageBucket: "docs-clone-44e77.appspot.com",
    messagingSenderId: "820315633663",
    appId: "1:820315633663:web:582ef30ad1691cfa1999ca",
    measurementId: "G-6QMGS7FSH7"
  };
  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  
  const db = app.firestore();

  export  {db};