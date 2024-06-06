import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

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

  const addBooking = (userId, userName, guests, space, date, nights, state) => {
    const db = getDatabase();
    const reference = ref(db, 'bookings/' + userId)
  
    set(reference, {
      Name: userName,
      AmountOfguests: guests,
      Facility: space,
      Date: date,
      Nights: nights,
      state: state

    })
  }

  const editBooking = () => {
    return
  }


const retrieveBooking = (month) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const bookingsRef = ref(db, 'bookings/');

    onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        resolve(data);
      } else {
        reject(new Error('No data available'));
      }
    }, (error) => {
      reject(error);
    });
  });
};

  const cancelBooking = () => {
    return
  }

  export {addBooking, editBooking, retrieveBooking, cancelBooking};