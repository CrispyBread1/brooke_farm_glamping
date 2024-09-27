import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set, onValue, collection, getDocs, getFirestore } from "firebase/database";
import { getFirestore, collection, getDocs, onValue } from "firebase/firestore";

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

  const addBooking = (userId, booking) => {
  //   const db = getFirestore(app);
  //   const reference = ref(db, 'bookings/' + userId)
  
  //   set(reference, {
  //     information: booking
  //     // dateOf: date

  //   })
  }

  const editBooking = () => {
    return
  }


const retrieveBooking = (month) => {
//   return new Promise((resolve, reject) => {
//     const db = getDatabase();
//     const bookingsRef = ref(db, 'bookings/');

//     onValue(bookingsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         resolve(data);
//       } else {
//         reject(new Error('No data available'));
//       }
//     }, (error) => {
//       reject(error);
//     });
//   });
};

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

  const cancelBooking = () => {
    return
  }

  export {addBooking, editBooking, retrieveBooking, cancelBooking, retrieveCampingFacilities};