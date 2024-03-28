import "@firebase/database";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCgDEmQc1fXbVX9zUGEIO73LBs7MH_ZTo0",
  authDomain: "instagram-f2446.firebaseapp.com",
  databaseURL: "https://instagram-f2446.firebaseio.com",
  projectId: "instagram-f2446",
  storageBucket: "instagram-f2446.appspot.com",
  messagingSenderId: "681299450062",
  appId: "1:681299450062:ios:4edf1d14758631ea5dd89f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
