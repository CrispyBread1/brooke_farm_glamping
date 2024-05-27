import './App.css';
import React, { useEffect, useState } from 'react';
import HomePage from './Containers/homePage';
import BookingPage from './Containers/bookingPage';
import LogInPage from './Containers/logInPage';
import { monitorAuthState } from './Scripts/authenicationControls';

function App({newBooking, logInAttempt, registerNewAccountAttempt}) {

  const [home, setHome] = useState(true)
  const [booking, setBooking] = useState(false)
  const [logIn, setLogIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    monitorAuthState()
    .then((res) => setUser(res))
    .then((res) => console.log(user))

    
  }, [])

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

  // userLoggedIn();

  return (
    <div className= "Homepage">


    <div className="NavButtons">
            <div id="Home-Button"  onClick={changeHomePage} value="Home">Home</div>
            <div id="Book-Button" onClick={changeBookingPage} value="Book">Book</div>
            <div id="LogIn-Button" onClick={changeLogInPage} value="LogIn">Log in</div>
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
