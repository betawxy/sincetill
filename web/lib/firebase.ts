import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHl1c-b6dD0Am0ozSI3LyJni6Tj0j9jdo",
  authDomain: "sincetill-app.firebaseapp.com",
  projectId: "sincetill-app",
  storageBucket: "sincetill-app.appspot.com",
  messagingSenderId: "451310423828",
  appId: "1:451310423828:web:d827b684f8cb36f97e7c01",
  measurementId: "G-VR30FQ8HXD",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const imagesStorage = storage.ref("images");
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

// Collections
export const usersRef = firestore.collection("users");
export function getItemsRef(uid: string) {
  return usersRef.doc(uid).collection("items");
}

// Collection Groups
export const itemsGroupRef = firestore.collectionGroup("items");
export const usersGroupRef = firestore.collectionGroup("users");

// Misc
export type User = firebase.User;
export const analytics = firebase.analytics;
