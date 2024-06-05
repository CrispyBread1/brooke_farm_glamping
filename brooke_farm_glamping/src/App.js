import './App.css';
import React, { useEffect, useState } from 'react';
import HomePage from './Containers/homePage';
import BookingPage from './Containers/bookingPage';
import LogInPage from './Containers/logInPage';
import { addBooking, editBooking, retreiveBooking, cancelBooking} from './Scripts/databaseControls.js';
import { logInEmailPassword, registerNewAccountEmailPassword, logOut, monitorAuthState } from './Scripts/authenicationControls';
import headerImage from './JPGs/BrookFarmGlampinglogo.png'
import logInButton from './JPGs/LoginButton/LogIn.png'
import logInButtonFire1 from './JPGs/LoginButton/LogInFire1.png'
import logInButtonFire2 from './JPGs/LoginButton/LogInFire2.png'
import logInButtonFire3 from './JPGs/LoginButton/LogInFire3.png'
import homeButton from './JPGs/HomeButton/home.png'
import bookButton from './JPGs/BookButton/book.png'
import userIcon from './JPGs/userbutton/Userbutton.png'
import accountImage from './JPGs/AccountButton/account.png'
import {Link, BrowserRouter} from'react-router-dom'
import { Paths } from './Scripts/routes';



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
    <BrowserRouter>
    <div className= "Homepage">
      <div className= "Header">
        <img id="header-Image" src={headerImage}></img>
      </div>

    <div className="NavButtons">
            <div id="Home-Button"  onClick={changeHomePage} value="Home">
              <img id="home-Image"  src={homeButton} />
            </div>
            <Link to="/book">
            <div id="Book-Button" onClick={changeBookingPage} value="Book">
              <img id="book-Image"  src={bookButton} />
            </div>
            </Link>
            <div id="Profile-Icon-DropDown">
              <img id="profile-icon-image" src={userIcon}/>

              <div id="dropdown-content">
                <div id="LogIn-Button"  onClick={changeLogInPage} value="LogIn" >
                  <img id="logInFire1Image" className="logInFire1-images" src={logInButtonFire1} />
                  <img id="logInFire2Image" className="logInFire2-images" src={logInButtonFire2} />
                  <img id="logInFire3Image" className="logInFire3-images" src={logInButtonFire3} />
                  <img className="logIn-images" src={logInButton}/>
                </div>
                <div id="account-Button">
                  <img id="account-image" src={accountImage}/>
                </div>
              </div>

            </div>
            
              
            {/* <div id="LogOut-Button" onClick={logUserOut} value="LogOut">Log out</div> */}
            {/* <div id="is-user-logged-in" onClick={checkLoggedIn} value="is-user-logged-in">Logged in?</div> */}
    </div>

    <div className="Rendering pages">
      {/* {home && <HomePage />}
      {booking && <BookingPage  user={user}/>}
      {logIn && <LogInPage logInAttempt={logInAttempt} registerNewAccountAttempt={registerNewAccountAttempt}/>} */}
      {/* <Paths/> */}
    </div>
    </div>

    </BrowserRouter>
  );

}



export default App;
