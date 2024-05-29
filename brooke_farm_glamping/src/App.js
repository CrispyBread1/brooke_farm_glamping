import './App.css';
import React, { useEffect, useState } from 'react';
import HomePage from './Containers/homePage';
import BookingPage from './Containers/bookingPage';
import LogInPage from './Containers/logInPage';
import { addBooking, editBooking, retreiveBooking, cancelBooking} from './Scripts/databaseControls.js';
import { logInEmailPassword, registerNewAccountEmailPassword, logOut, monitorAuthState } from './Scripts/authenicationControls';
import logInButton from './JPGs/LoginButton/LogIn.png'
import logInButtonFire1 from './JPGs/LoginButton/LogInFire1.png'
import logInButtonFire2 from './JPGs/LoginButton/LogInFire2.png'
import logInButtonFire3 from './JPGs/LoginButton/LogInFire3.png'


function App({}) {

  const [home, setHome] = useState(true)
  const [booking, setBooking] = useState(false)
  const [logIn, setLogIn] = useState(false)
  const [logInImage, setLogInImage] = useState(logInButton)
  const [user, setUser] = useState({})
  

  const checkLoggedIn = () => {
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
          setUser(userCredentials)
      }
      catch(error) {
          return error.code
      }
  }
  
  const registerNewAccountAttempt = (email, password) => {
    return (registerNewAccountEmailPassword(email, password))
  }

  const logUserOut = () => {
    setUser({})
    logOut();
  }

  const changeLogInImage = () => {
    var logInFireImage = [logInButtonFire1, logInButtonFire2, logInButtonFire3]
    var x = Math.floor(Math.random() * logInFireImage.length)
    var i = 1
    console.log("234")
    while (i > 0) {
      // console.log('lol')
      setTimeout(function() {setLogInImage(logInFireImage[x])}, 100);
      i++
    }
    

    
  }

  const resetLogInImage = () => {
    setLogInImage(logInButton)
  }

  // userLoggedIn();

  return (
    <div className= "Homepage">


    <div className="NavButtons">
            <div id="Home-Button"  onClick={changeHomePage} value="Home">Home</div>
            <div id="Book-Button" onClick={changeBookingPage} value="Book">Book</div>
            <div id="LogIn-Button" onClick={changeLogInPage} value="LogIn" >
              <img className="logIn-images" onMouseOver={changeLogInImage} onMouseLeave={resetLogInImage} src={logInImage}/>
              {/* <img className="logInFire1-images"src={logInButtonFire1}/>
              <img className="logInFire2-images"src={logInButtonFire2}/>
              <img className="logInFire3-images"src={logInButtonFire3}/> */}
              </div>
            <div id="LogOut-Button" onClick={logUserOut} value="LogOut">Log out</div>
            <div id="is-user-logged-in" onClick={checkLoggedIn} value="is-user-logged-in">Logged in?</div>
    </div>

    <div className="Rendering pages">
      {home && <HomePage />}
      {booking && <BookingPage newBooking={newBooking} user={user}/>}
      {logIn && <LogInPage logInAttempt={logInAttempt} registerNewAccountAttempt={registerNewAccountAttempt}/>}
    </div>
    </div>
  );

}



export default App;
