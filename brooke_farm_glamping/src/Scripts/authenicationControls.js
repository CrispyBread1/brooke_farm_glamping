import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAms2TxN-V_0N0q56ERISmsZnzv5RTdnmY",
  authDomain: "brooke-farm-glamping.firebaseapp.com",
  databaseURL: "https://brooke-farm-glamping-default-rtdb.firebaseio.com",
  projectId: "brooke-farm-glamping",
  storageBucket: "brooke-farm-glamping.appspot.com",
  messagingSenderId: "900497975699",
  appId: "1:900497975699:web:bb6906451214461bdc2066"
});

// Initialize Firebase
const auth = getAuth(firebaseConfig);

const logInEmailPassword = async (logInEmail, logInPassword) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, logInEmail, logInPassword)
        console.log(userCredentials)
    }
    catch(error) {
        console.log(error)
        // return handleError(error)
        return error.code
        
    }
};

// const handleError = (err) => {
//     // return err.code
//     if(err.code == AuthErrorCodes.INVALID_EMAIL) {
//         return "working"
//     } else return ("not working bud")

//     // {
//     //     "code": "auth/invalid-email",
//     //     "customData": {},
//     //     "name": "FirebaseError"
//     // }
    
    
// }

export {logInEmailPassword};