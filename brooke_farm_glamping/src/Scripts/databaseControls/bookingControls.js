import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, query, where, updateDoc } from "firebase/firestore";

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
    (async () => {
      try {
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "bookings"), booking.toFirestore());
        if (docRef) {
          resolve(docRef);
        } else {
          reject(new Error("No data available"));
        }
      } catch (error) {
        reject(error);
      }
    })(); 
  });
};

const retrieveBooking  = async (bookingID) => {
  try {
    const db = getFirestore(app);
    const docRef = doc(db, "bookings", bookingID);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      return docSnap.data()
    }
  } catch(error) {
  console.log(error)
  }
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
      }
    }
    return bookings
  } catch(error) {
    console.log(error)
}}

const retrieveActiveBookings = async () => {
  try {
    var bookings = []
    const db = getFirestore(app);
    const docRef = collection(db, "bookings");
    const queryRef = query(docRef, where("active", "==", true));
    const querySnapshot = await getDocs(queryRef)
    if(querySnapshot) {
      querySnapshot.forEach((doc) => {
        bookings.push({id: doc.id, data: doc.data()})
      })
      return bookings
    }
  } catch(error) {
    return error
}}

const checkInBooking = (bookingReference) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const db = getFirestore(app);
        const bookingRef = doc(db, "bookings", bookingReference);
        const docRef = await updateDoc(bookingRef, {
          checkedIn: true,
          checkedInTime: new Date(),
        });

        if (docRef) {
          resolve(docRef);
        } else {
          reject(new Error("Failed to update booking"));
        }
      } catch (error) {
        reject(error);
      }
    })(); 
  });
};



export {addBooking, retrieveUserBooking, retrieveActiveBookings, checkInBooking, retrieveBooking};