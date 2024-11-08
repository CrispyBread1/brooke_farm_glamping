import './App.css';
import React, { useEffect, useState} from 'react';
import HomePage from './Containers/HopePage/homePage.js';
import BookingPage from './Containers/BookingPage/bookingPage.js';
import LogInPage from './Containers/LoginPage/logInPage.js';
import { addBooking, editBooking, retreiveBooking, cancelBooking, authenticateAdmin} from './Scripts/databaseControls/userControls.js';
import { logInEmailPassword, registerNewAccountEmailPassword, logOut, monitorAuthState } from './Scripts/authenicationControls';
import headerImage from './JPGs/BrookFarmGlampinglogo.png'
import logInButton from './JPGs/LoginButton/LogIn.png'
import {Link, BrowserRouter, useLocation} from'react-router-dom'
import { Paths } from './Scripts/routes';
import NavBar from './Containers/NavBar/navBar.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retreiveUser } from './Scripts/databaseControls/userControls.js';



function App({}) {

  const [home, setHome] = useState(true)
  const [booking, setBooking] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [logInImage, setLogInImage] = useState(logInButton)
  const [admin, setAdmin] = useState(false)
  const [adminTableCheck, setAdminTableCheck] = useState(false)

  const [daysOfWeek, setDaysOfWeek] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  const [months, setMonths] = useState([{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:30}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]);
  

  useEffect(() => {
    checkAuth()

  }, [loggedIn])

  useEffect(() => {
    if (user && user.admin) {
      checkAdmin(user.id)
    }
    
  }, [user])

  const checkAuth = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (doc) => {
      if (doc) {
        retreiveUser(doc.uid)
        .then((res) => (setUser(res)))
      } else {
        console.log("Logged out")
      }
    })
  }

  const checkAdmin = async (id) => {
    try {
      const adminIDs = await authenticateAdmin(id);
      adminIDs.forEach((doc) => {
        if (doc.data().userID === id) {setAdminTableCheck(true)}
        })
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  }

  const userLoggedIn = () => {
    setLoggedIn(true)
  }

  const userLoggedOut = () => {
    setLoggedIn(false)
    logOut()
  }


  // Handles the ordinal numbers for the date *------------- *-------------
  const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
  }};

  return (
    <Paths daysOfWeek={daysOfWeek} months={months} nthNumber={nthNumber} userLoggedIn={userLoggedIn} user={user} userLoggedOut={userLoggedOut}/>
    
    
  );

}



export default App;
