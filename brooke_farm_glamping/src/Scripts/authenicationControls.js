import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes, onAuthStateChanged, signOut, updateProfile} from "firebase/auth";
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

const logInEmailPassword = async (logInEmail, logInPassword) => {
    return signInWithEmailAndPassword(auth, logInEmail, logInPassword)
}

const registerNewAccountEmailPassword = async (registerEmail, registerPassword) => {
    return createUserWithEmailAndPassword(auth, registerEmail, registerPassword)        
}

const addNamePhoneToUser = async (user, fullName, phone) => {
    return updateProfile(user, {
        displayName: fullName,
        phone: phone
    })
}

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if(user) {
            var userAccount = user
            return userAccount
        }
        else {
            console.log("Logged out bro")
        }
    })
}


const logOut = async () => {
    
    await signOut(auth)
}


export {logInEmailPassword, registerNewAccountEmailPassword, monitorAuthState, logOut, addNamePhoneToUser};