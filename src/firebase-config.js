import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { getStorage } from 'firebase/storage'

// //DB1
// const firebaseConfig = {
//   apiKey: "AIzaSyDADvlLhOibfEVyk7TRSl-LuWfxDv4KIio",
//   authDomain: "artzy-f21d3.firebaseapp.com",
//   projectId: "artzy-f21d3",
//   storageBucket: "artzy-f21d3.appspot.com",
//   messagingSenderId: "216536498272",
//   appId: "1:216536498272:web:59e0d2bafefca015d24305",
//   measurementId: "G-LEBF2M1R1B"
// };

// // DB2
// const firebaseConfig = {
//   apiKey: "AIzaSyCxF8o0a364xqbrNOWfLfeK98BjKnOHpU4",
//   authDomain: "artzy-f850f.firebaseapp.com",
//   projectId: "artzy-f850f",
//   storageBucket: "artzy-f850f.appspot.com",
//   messagingSenderId: "458723905927",
//   appId: "1:458723905927:web:32e62e6cf9fdf3c6600322"
// };

// // DB3
// const firebaseConfig = {
//   apiKey: "AIzaSyAWkQ6Kqlwz_jf0wIm-WpgmlLtfiGLCk20",
//   authDomain: "artzy3-7d844.firebaseapp.com",
//   projectId: "artzy3-7d844",
//   storageBucket: "artzy3-7d844.appspot.com",
//   messagingSenderId: "979179349911",
//   appId: "1:979179349911:web:6bbad13cde9922037006d2"
// };

// DB PRODUCTION DO NOT USE UNLESS NECESSARY
const firebaseConfig = {
  apiKey: "AIzaSyBYpDyo595Iwfjo7f5BAxCcjEbOWVtepLM",
  authDomain: "artzyprod-ef753.firebaseapp.com",
  projectId: "artzyprod-ef753",
  storageBucket: "artzyprod-ef753.appspot.com",
  messagingSenderId: "789222589511",
  appId: "1:789222589511:web:db9b9d8f58966f9ce91d62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);

//Signup/create user function Firebase
export function signup(email,password){
    return createUserWithEmailAndPassword(auth, email, password);
}

export function emailVerification(){
  return sendEmailVerification(auth.currentUser);
}

export function logout() {
  signOut(auth)
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function resetPassword(email){
  return sendPasswordResetEmail (auth, email)
}


