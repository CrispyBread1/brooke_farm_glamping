import './App.css';
import React, { useEffect, useState } from 'react';
import HomePage from './Containers/homePage';
import BookingPage from './Containers/bookingPage';
import LogInPage from './Containers/logInPage';
import { addBooking, editBooking, retreiveBooking, cancelBooking} from './Scripts/databaseControls.js';
import { logInEmailPassword, registerNewAccountEmailPassword, logOut, monitorAuthState } from './Scripts/authenicationControls';
import headerImage from './JPGs/BrookFarmGlampinglogo.png'
import logInButton from './JPGs/LoginButton/LogIn.png'
import {Link, BrowserRouter} from'react-router-dom'
import { Paths } from './Scripts/routes';
import NavBar from './Containers/navBar'



function App({}) {

  const [home, setHome] = useState(true)
  const [booking, setBooking] = useState(false)
  const [logIn, setLogIn] = useState(false)
  const [logInImage, setLogInImage] = useState(logInButton)
  const [user, setUser] = useState({})
  const [hovering, setHovering] = useState(false)

  let intervalId;
  

  // const checkLoggedIn = () => {
  //   console.log(user)
  // }

  const changeHomePage = () => {
    setHome(true);
    setBooking(false);
    setLogIn(false);
  }

  const changeBookingPage = () => {
    setHome(false);
    setBooking(true);
    setLogIn(false);
  }

  const changeLogInPage = () => {
    setHome(false);
    setBooking(false);
    setLogIn(true);
  }

  
  
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

  return (
    <Paths/>
    
    
  );

}



export default App;
