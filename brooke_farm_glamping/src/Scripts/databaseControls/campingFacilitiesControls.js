import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAms2TxN-V_0N0q56ERISmsZnzv5RTdnmY",
  authDomain: "brooke-farm-glamping.firebaseapp.com",
  databaseURL: "https://brooke-farm-glamping-default-rtdb.firebaseio.com",
  projectId: "brooke-farm-glamping",
  storageBucket: "brooke-farm-glamping.appspot.com",
  messagingSenderId: "900497975699",
  appId: "1:900497975699:web:bb6906451214461bdc2066",
};

const app = initializeApp(firebaseConfig);

// Retrieve camping facilities
const retrieveCampingFacilities = async () => {
  try {
    const db = getFirestore(app);
    const campsiteSnapshot = await getDocs(collection(db, "pitches"));
    const facilities = [];

    if (campsiteSnapshot) {
      campsiteSnapshot.forEach((doc) => {
        facilities.push({ id: doc.id, data: doc.data() });
      });
    }
    return facilities;
  } catch (error) {
    throw new Error(error);
  }
};

// Update camping facilities
const updateFacilities = async (facility, facilityID) => {
  try {
    const db = getFirestore(app);
    const facilityRef = doc(db, "pitches", facilityID);
    await updateDoc(facilityRef, facility);
    return "Facility updated successfully";
  } catch (error) {
    throw new Error(error);
  }
};

// Add a new facility
const addNewFacility = async (facility) => {
  try {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "pitches"), facility);
    return docRef.id; // Return the document ID
  } catch (error) {
    throw new Error(error);
  }
};

// Add a blocked day to facilities
const addFacilitiesBlockedDay = async (blockedDay, facilityID) => {
  try {
    const db = getFirestore(app);
    const facilityRef = doc(db, "pitches", facilityID);
    await updateDoc(facilityRef, {
      blockedDays: arrayUnion(blockedDay),
    });
    return "Blocked day added successfully"
  } catch (error) {
    throw new Error(error);
  }
};

export {retrieveCampingFacilities, updateFacilities, addNewFacility, addFacilitiesBlockedDay };
