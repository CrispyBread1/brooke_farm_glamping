import './App.css';
import React, { useEffect, useState } from 'react';
import HomePage from './Containers/homePage';
import BookingPage from './Containers/bookingPage';
import LogInPage from './Containers/logInPage';
import { monitorAuthState } from './Scripts/authenicationControls';
import {addBooking, editBooking, retreiveBooking, cancelBooking} from './Scripts/databaseControls.js';
import { logInEmailPassword, registerNewAccountEmailPassword, logOut } from './Scripts/authenicationControls';

function App({}) {

  const [home, setHome] = useState(true)
  const [booking, setBooking] = useState(false)
  const [logIn, setLogIn] = useState(false)
  const [user, setUser] = useState({})

  // useEffect(() => {
    // userLogIn()
    // setUser(monitorAuthState())
    // monitorAuthState()
    // .then((res) => {userLogIn(res)})
    // .then((res) => console.log(user.email))
    // console.log(user)

    // Promise.resolve(monitorAuthState()).then((v) => {
    //   console.log(v); // 42
    // });

  // }, [home])

  const checkLoggedIn = () => {
    // setUser(tok1)
    // monitorAuthState()
    // .then((res) => {userLogIn(res)})
    console.log(user)
  }

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

  const newBooking = () => {
    addBooking('222', 'ashley', '26');
  }
  
  const logInAttempt = async (email, password) => {
    try {
          const userCredentials = await logInEmailPassword(email, password)
          // console.log(userCredentials)
          setUser(userCredentials)
      }
      catch(error) {
          // console.log(error)
          // return handleError(error)
          return error.code
          
      }
    // return (
    //   logInEmailPassword(email, password)
    //   .then((res) => {
    //     if (res) {
    //       return res
    //       // monitorAuthState()
    //       // .then((res) => setUser(res))
    //       // .then((res) => console.log(res))
    //     // } else return res
    //     }
    //   })
      
    //   )
  }
  
  const registerNewAccountAttempt = (email, password) => {
    return (registerNewAccountEmailPassword(email, password))
  }

  const logUserOut = () => {
    setUser()
    logOut();
  }

  // userLoggedIn();

  return (
    <div className= "Homepage">


    <div className="NavButtons">
            <div id="Home-Button"  onClick={changeHomePage} value="Home">Home</div>
            <div id="Book-Button" onClick={changeBookingPage} value="Book">Book</div>
            <div id="LogIn-Button" onClick={changeLogInPage} value="LogIn">Log in</div>
            <div id="LogOut-Button" onClick={logUserOut} value="LogOut">Log out</div>
            <div id="is-user-logged-in" onClick={checkLoggedIn} value="is-user-logged-in">Logged in?</div>
    </div>

    <div className="Rendering pages">
      {home && <HomePage />}
      {booking && <BookingPage newBooking={newBooking}/>}
      {logIn && <LogInPage logInAttempt={logInAttempt} registerNewAccountAttempt={registerNewAccountAttempt}/>}
    </div>
    </div>
  );

}



export default App;
