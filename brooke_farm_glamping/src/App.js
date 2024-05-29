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
  const [hovering, setHovering] = useState(false)
  

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

  const hoveringLogIn = () => {
    setHovering(true)
    animateLogIn()
  }

  const animateLogIn = () => {
    // setHovering(true)
    // var animationFinsihed = true
    // if (animationFinsihed) {
      
    // }
    console.log('entering box')
    // console.log('inside animate log in')
    // let id = null;
    // let frameAmount = 250
    // clearInterval(id);
    // id = setInterval(frame, 250);
    // function frame() {
    //   if (hovering) {
    //     clearInterval(id);
    //     resetLogInImage()
    //     // animationFinsihed = false;
    //     // setHovering(false)
    //     // setLogInImage(logInButton)
    //     return;
    //     } else {
    //       // changeLogInImage()
    //       var logInFireImage = [logInButtonFire1, logInButtonFire2, logInButtonFire3]
    //       var x = Math.floor(Math.random() * logInFireImage.length)
    //       setTimeout(function() {setLogInImage(logInFireImage[x])}, 100);
    //       if(!hovering) {
    //         resetLogInImage()
    //         // console.log('bad bad')
    //       }
    //       // console.log('bfkfk')
    //       // console.log('hello')
    //         // posY+= 0.18; 
    //         // posX+= 1;
    //         // frog.style.top = posY + 'vw'; 
    //         // frog.style.left = posX + 'vw'; 
    //       }
    // }
  }

  const resetLogInImage = () => {
    setLogInImage(logInButton)
    setHovering(false)
    console.log('leaving box')
  }

  // userLoggedIn();

  return (
    <div className= "Homepage">


    <div className="NavButtons">
            <div id="Home-Button"  onClick={changeHomePage} value="Home">Home</div>
            <div id="Book-Button" onClick={changeBookingPage} value="Book">Book</div>
            <div id="LogIn-Button" onClick={changeLogInPage} value="LogIn" >
              <img className="logIn-images" onMouseOver={hoveringLogIn} onMouseLeave={resetLogInImage} src={logInImage}/>
              <img className="logInFire1-images"src={logInButtonFire1}/>
              <img className="logInFire2-images"src={logInButtonFire2}/>
              <img className="logInFire3-images"src={logInButtonFire3}/>
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
