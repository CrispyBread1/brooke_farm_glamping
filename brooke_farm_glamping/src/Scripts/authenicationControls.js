import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes, onAuthStateChanged, signOut} from "firebase/auth";
// import {userLogIn} from "../App.js"

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

const logInEmailPassword = (logInEmail, logInPassword) => {
    return signInWithEmailAndPassword(auth, logInEmail, logInPassword)
    // try {
    //     const userCredentials = await signInWithEmailAndPassword(auth, logInEmail, logInPassword)
    //     // console.log(userCredentials)
    // }
    // catch(error) {
    //     // console.log(error)
    //     // return handleError(error)
    //     return error.code
        
    // }
}

const registerNewAccountEmailPassword = async (registerEmail, registerPassword) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        // console.log(userCredentials)
    }
    catch(error) {
        console.log(error)
        // return handleError(error)
        return error.code
        
    }
}

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if(user) {
            // console.log(user)
            var userAccount = user
            return userAccount
            // userLogIn(user.email)
        }
        else {
            console.log("Logged out bro")
        }
    })
}


// const monitorAuthState = () => {
//     return new Promise((resolve, reject) => {
//       const unsubscribe = onAuthStateChanged(auth, user => {
//         unsubscribe(); // Stop listening after the first state change
//         if (user) {
//           resolve(user);
//         } else {
//           reject(new Error('No user is signed in'));
//         }
//       });
//     });
//   };

const logOut = async () => {
    await signOut(auth)
}

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

export {logInEmailPassword, registerNewAccountEmailPassword, monitorAuthState, logOut};