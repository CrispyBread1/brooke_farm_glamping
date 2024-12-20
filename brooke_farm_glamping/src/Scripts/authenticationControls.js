import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

const logInEmailPassword = async (logInEmail, logInPassword) => {
    const auth = getAuth(firebaseConfig);
    return signInWithEmailAndPassword(auth, logInEmail, logInPassword)
}

const registerNewAccountEmailPassword = async (registerEmail, registerPassword) => {
    const auth = getAuth(firebaseConfig);
    return createUserWithEmailAndPassword(auth, registerEmail, registerPassword)        
}

const logOut = async () => {
    const auth = getAuth(firebaseConfig);
    await signOut(auth)
}


export {logInEmailPassword, registerNewAccountEmailPassword,  logOut};