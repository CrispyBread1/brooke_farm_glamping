import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, getDoc, query, where, updateDoc, arrayUnion, firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAms2TxN-V_0N0q56ERISmsZnzv5RTdnmY",
    authDomain: "brooke-farm-glamping.firebaseapp.com",
    databaseURL: "https://brooke-farm-glamping-default-rtdb.firebaseio.com",
    projectId: "brooke-farm-glamping",
    storageBucket: "brooke-farm-glamping.appspot.com",
    messagingSenderId: "900497975699",
    appId: "1:900497975699:web:bb6906451214461bdc2066"
  };
  
  const app = initializeApp(firebaseConfig);

const retrieveCampingFacilities = () => {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
    const campsiteRef = getDocs(collection(db, 'pitches'))
      if (campsiteRef) {
        resolve(campsiteRef);
      } else {
        Promise.reject(new Error('No data available'));
      }
    }, (error) => {
      Promise.reject(error);
    }
)}

  export {retrieveCampingFacilities};