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

  let intervalId;
  

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
    // setHovering(true)
    // if (intervalId) {
    //   console.log("Task is already running");
    //   return;
    // }
    // console.log("Starting the repeating task");
  
    // intervalId = setInterval(() => {
    //   // console.log("Task is running");
    //   animateLogIn()
    // }, 1000); 
    // animateLogIn()
  }

  const animateLogIn = () => {
    // var logInFireImage = [logInButtonFire1, logInButtonFire2, logInButtonFire3]
    // var x = Math.floor(Math.random() * logInFireImage.length)
    // setLogInImage(logInFireImage[x])
  }
  //   setHovering(true)
  //   var animationFinsihed = true
  //   if (animationFinsihed) {
      
  //   }
  //   console.log('entering box')
  //   let id = null;
  //   var timer = 0
  //   clearInterval(id);
  //   id = setInterval(frame, 300);
  //   function frame() {
  //     if (timer >= 100) {
  //       clearInterval(id);
  //       // resetLogInImage()
  //       console.log('ended')
  //       } else {
          
  //         // console.log(timer)
  //         var logInFireImage = [logInButtonFire1, logInButtonFire2, logInButtonFire3]
  //         var x = Math.floor(Math.random() * logInFireImage.length)
  //         setTimeout(function() {
  //           timer++
  //           setLogInImage(logInFireImage[x])
  //         }, 100);
  //         // setLogInImage(logInFireImage[x])
          

  //         }
  //   }
  // }
  // document.getElementById('logIn-images').addEventListener('mouseenter', function(){
  //   this.classList.add('logInFire2-images-hover');
  //   setTimeout(() => {
  //     this.classList.remove('logInFire2-images-hover')
  //   }, 3000);
  // })

  const resetLogInImage = () => {
    // setLogInImage(logInButton)
    // // timer = 100
    // setHovering(false)
    // console.log('leaving box')
    // if (intervalId) {
    //   clearInterval(intervalId);
    //   intervalId = null;
    //   console.log("Stopped the repeating task");
    // } else {
    //   console.log("No task is running");
    // }
    
  }

  // const handleMouseOver = (elementId, hoverClass) => {
  //   setHovering(true);
  //   const element = document.getElementById(elementId);
  //   element.classList.add(hoverClass);
  // };

  // const handleMouseLeave = (elementId, hoverClass) => {
  //   // setHovering(false);
  //   const element = document.getElementById(elementId);
  //   element.classList.remove(hoverClass);
  //   resetLogInImage();
  //   setLogInImage(logInButton)
  // };


  // userLoggedIn();

  return (
    <div className= "Homepage">


    <div className="NavButtons">
            <div id="Home-Button"  onClick={changeHomePage} value="Home">Home</div>
            <div id="Book-Button" onClick={changeBookingPage} value="Book">Book</div>
            <div id="LogIn-Button" onClick={changeLogInPage} value="LogIn" >
              

              <img
                id="logInFire1Image"
                className="logInFire1-images"
                src={logInButtonFire1}
                // onMouseOver={() => handleMouseOver('logInFire1image', 'hover')}
                // onMouseLeave={() => handleMouseLeave('logInFire1Image', 'hover')}
                alt="fire image"
              />
              <img
                id="logInFire2Image"
                className="logInFire2-images"
                src={logInButtonFire2}
                // onMouseOver={() => handleMouseOver('logInFire2Image', 'hover')}
                // onMouseLeave={() => handleMouseLeave('logInFire2Image', 'hover')}
                alt="fire image"
              />
              <img
                id="logInFire3Image"
                className="logInFire3-images"
                src={logInButtonFire3}
                // onMouseOver={() => handleMouseOver('logInFire3Image', 'hover')}
                // onMouseLeave={() => handleMouseLeave('logInFire3Image', 'hover')}
                // alt="fire image"
              />
              <img className="logIn-images" onMouseOver={hoveringLogIn} onMouseLeave={resetLogInImage} src={logInImage}/>
            </div>
              {/* <img className="logInFire1-images"src={logInButtonFire1}/> */}
              {/* <img className="logInFire2-images"src={logInButtonFire2}/>
              <img className="logInFire3-images"src={logInButtonFire3}/> */}
              
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
