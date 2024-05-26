import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
    }
    catch(error) {
        console.log(error)
        return (error)
    }
};

export {logInEmailPassword};