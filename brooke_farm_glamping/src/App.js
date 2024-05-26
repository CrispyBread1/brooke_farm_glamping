import './App.css';
import React, { useState } from 'react';
import HomePage from './Containers/homePage';
import BookingPage from './Containers/bookingPage';
import LogInPage from './Containers/logInPage';

function App({newBooking, logInAttempt}) {

  const [home, setHome] = useState(true)
  const [booking, setBooking] = useState(false)
  const [logIn, setLogIn] = useState(false)

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
      {logIn && <LogInPage logInAttempt={logInAttempt}/>}
    </div>
    </div>
  );

}

export default App;
