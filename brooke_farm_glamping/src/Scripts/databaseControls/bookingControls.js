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


const addBooking = (booking) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
    const docRef = addDoc(collection(db, "bookings"), booking.toFirestore())
    if (docRef) {
      resolve(docRef);
    } else {
      Promise.reject(new Error('No data available'));
    }
  }, (error) => {
      Promise.reject(error);
  }
)}

const editBooking = () => {
  return
}

const retrieveUserBooking = async (bookingIDs) => {
  try {
    const db = getFirestore(app);
    var bookings = []
    for (var i = 0; i < bookingIDs.length; i ++) {
      const docRef = doc(db, "bookings", bookingIDs[i]);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        bookings.push(docSnap.data())
      } else {
    }
    }
    return bookings
  } catch(error) {
    console.log(error)
}}

const cancelBooking = () => {
  return
}

const retrieveActiveBookings = async () => {
  try {
    var bookings = []
    const db = getFirestore(app);
    const docRef = collection(db, "bookings");
    const queryRef = query(docRef, where("active", "==", true));
    const querySnapshot = await getDocs(queryRef)
    if(querySnapshot) {
      querySnapshot.forEach((doc) => {
        bookings.push(doc.data())
      })
      return bookings
    } else {
    
    }
  } catch(error) {
    console.log(error)
}}

  export {addBooking, editBooking, cancelBooking, retrieveUserBooking, retrieveActiveBookings};