import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

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

  const addUser = async (user, UID) => {
    const db = getFirestore(app);
    const docRef = doc(db, "users", UID);
  
    try {
      await setDoc(docRef, user);
      return UID;
    } catch (error) {
      throw new Error(`Failed to add user: ${error.message}`);
    }
  };
  

const retrieveUser = async (userID) => {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userID);
  const user = await getDoc(docRef);
  if (user.exists()) {
    return (user.data());
  } else {
    console.log("No such document!");
  } 
}

const addBookingToUser = async (bookingID, userID) => {
  const db = getFirestore(app);
  const userRef = doc(db, "users", userID);

  try {
    await updateDoc(userRef, { bookings: arrayUnion(bookingID) });
    return userID;
  } catch (error) {
    throw new Error(error);
  }
};

  export {addUser, retrieveUser, addBookingToUser};