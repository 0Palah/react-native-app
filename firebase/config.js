// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIfp7uV_JRXcLadgHlYKnGhN_zKnal8Sw",
  authDomain: "rn-social-58923.firebaseapp.com",
  projectId: "rn-social-58923",
  storageBucket: "rn-social-58923.appspot.com",
  messagingSenderId: "866615434732",
  appId: "1:866615434732:web:7f7abcd66861f2db3574c9",
  measurementId: "G-83MSL9WXDX",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

// const analytics = getAnalytics(firebaseApp);

// ===============================================

// import * as firebase from "firebase";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCIfp7uV_JRXcLadgHlYKnGhN_zKnal8Sw",
//   authDomain: "rn-social-58923.firebaseapp.com",
//   projectId: "rn-social-58923",
//   storageBucket: "rn-social-58923.appspot.com",
//   messagingSenderId: "866615434732",
//   appId: "1:866615434732:web:7f7abcd66861f2db3574c9",
//   measurementId: "G-83MSL9WXDX",
// };

// export default firebase.initializeApp(firebaseConfig);

// // const auth = firebase.auth();

// // export { auth };
