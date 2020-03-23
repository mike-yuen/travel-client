// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9DTxANpBymMcXNd6JUWCmVI6Wxcezk2I",
  authDomain: "responsum-ckd-staging.firebaseapp.com",
  projectId: "responsum-ckd-staging"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
