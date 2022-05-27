import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import axios from './axiosInstance';


var firebaseConfig = {
    apiKey: "AIzaSyBFz51F328N_VENcwQjf5E85vAyuLo7FFA",
    authDomain: "global-news-test.firebaseapp.com",
    databaseURL: "https://global-news-test-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "global-news-test",
    storageBucket: "global-news-test.appspot.com",
    messagingSenderId: "555614161268",
    appId: "1:555614161268:web:d76b605a3a5e3fa33ac421"
  };


const provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.database();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};



// export const generateUserDocument = (user, additionalData) => {
//   if (!user){
//   	console.log("No user"); 
//   	return;
//   }

//   const userRef = firebase.database.ref(`users/${user.uid}`);
//   const data = null;
//   userRef.on('value', (snapshot) => {
//   data = snapshot.val();
// });

//   //const snapshot = userRef.get();
//   console.log(data);
//   if (!data.exists) {
//     const { email, displayName, photoURL } = user;
//     try {
//       userRef.set({
//         displayName,
//         email,
//         photoURL,
//         ...additionalData
//       });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };


// const getUserDocument = async uid => {
//   if (!uid) return null;
//   try {
//     const userDocument = firebase.database.ref(`users/${uid}`).get();
//     return {
//       uid,
//       ...userDocument.data()
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };
