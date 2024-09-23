import './App.css';
import React, { useEffect, useState} from 'react';
import HomePage from './Containers/homePage';
import BookingPage from './Containers/bookingPage';
import LogInPage from './Containers/logInPage';
import { addBooking, editBooking, retreiveBooking, cancelBooking} from './Scripts/databaseControls.js';
import { logInEmailPassword, registerNewAccountEmailPassword, logOut, monitorAuthState } from './Scripts/authenicationControls';
import headerImage from './JPGs/BrookFarmGlampinglogo.png'
import logInButton from './JPGs/LoginButton/LogIn.png'
import {Link, BrowserRouter, useLocation} from'react-router-dom'
import { Paths } from './Scripts/routes';
import NavBar from './Containers/navBar'



function App({}) {

  const [home, setHome] = useState(true)
  const [booking, setBooking] = useState(null)
  const [logIn, setLogIn] = useState(false)
  const [logInImage, setLogInImage] = useState(logInButton)
  const [user, setUser] = useState({})
  const [hovering, setHovering] = useState(false)
  const [bookingInformation, setBookingInformation] = useState(null)

  // const history = useHistory();

  

 

  
  
  const logInAttempt = async (email, password) => {
    try {
          const userCredentials = await logInEmailPassword(email, password)
          // setUser()
          UserIn(userCredentials)
      }
      catch(error) {
          return error.code
      }
  }
  
  const registerNewAccountAttempt = (email, password) => {
    return (registerNewAccountEmailPassword(email, password))
  }

  const logUserOut = () => {
    setUser({});
    logOut();
  }

  const UserIn = (user) => {
    setUser(user)
  }

  // const fillBookingInformation = (booking) => {
  //   // console.log(booking)
  //   if (!bookingInformation) {
  //       setBookingInformation(booking)
  //       const serializedObject = encodeURIComponent(JSON.stringify(bookingInformation));
  //       history.push(`/details?data=${serializedObject}`);
  //   }
// }

  return (
    <Paths/>
    
    
  );

}



export default App;
