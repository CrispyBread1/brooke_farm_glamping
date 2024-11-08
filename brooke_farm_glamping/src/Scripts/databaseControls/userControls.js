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

const addUser = (user, UID) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
    const docRef = setDoc(doc(db, "users", UID), user);
    if (docRef) {
      resolve(docRef.id);
    } else {
      Promise.reject(new Error('No data available'));
    }
  }, (error) => {
      Promise.reject(error);
  }
)}

const retreiveUser = async (userID) => {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userID);
  const user = await getDoc(docRef);
  if (user.exists()) {
    return (user.data());
  } else {
    console.log("No such document!");
  } 
}

const addBookingToUser = (bookingID, userID) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
    const userRef = doc(db, "users", userID)
    const docRef = updateDoc(userRef, {
      'bookings': arrayUnion(bookingID)});
    if (docRef) {
      resolve(docRef.id);
    } else {
      Promise.reject(new Error('No data available'));
    }
  }, (error) => {
      Promise.reject(error);
    }
)}

const authenticateAdmin = async (userId) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
    const adminRef = getDocs(collection(db, 'admin'))
      if (adminRef) {
        // adminRef.forEach((element) => {if (element.data().userID === userId) resolve(true)})
        resolve(adminRef)
      } else {
        Promise.reject(new Error('User is not in Admin table'));
      }
    }, (error) => {
      Promise.reject(error);
    })
}


  export {addUser, retreiveUser, addBookingToUser, authenticateAdmin};