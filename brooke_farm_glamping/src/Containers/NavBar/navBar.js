import './navBar.css';
import React from 'react';
import headerImage from '../../JPGs/BrookFarmGlampinglogo.png'
import logInButton from '../../JPGs/LoginButton/LogIn.png'
import logInButtonFire1 from '../../JPGs/LoginButton/LogInFire1.png'
import logInButtonFire2 from '../../JPGs/LoginButton/LogInFire2.png'
import logInButtonFire3 from '../../JPGs/LoginButton/LogInFire3.png'
import homeButton from '../../JPGs/HomeButton/home.png'
import bookButton from '../../JPGs/BookButton/book.png'
import userIcon from '../../JPGs/userbutton/Userbutton.png'
import accountImage from '../../JPGs/AccountButton/account.png'
import {Link} from'react-router-dom'



const NavBar = ({user, userLoggedOut}) => {

  const  logOutUser = () => {
    userLoggedOut()
    window.location.reload();
    // setUserObj(false)
  }


  return (
    <div className= "Homepage">
      <div className= "Header">
        <img id="header-Image" src={headerImage}></img>
      </div>
    {/* <Paths> */}
    <div className="NavButtons">
            <Link to="/">
            <div id="Home-Button"   value="Home">
              <img id="home-Image"  src={homeButton} alt="Home Button"/>
            </div>
            </Link>
            <Link to="/book">
            <div id="Book-Button"  value="Book">
              <img id="book-Image"  src={bookButton} alt="Book Button"/>
            </div>
            </Link>
            <div id="Profile-Icon-DropDown">
              <img id="profile-icon-image" src={userIcon} alt="User Icon"/>

              <div id="dropdown-content">
              { !user && <Link to="/login">
                <div id="LogIn-Button"   value="LogIn" >
                  <img id="logInFire1Image" className="logInFire1-images" src={logInButtonFire1} alt="Login Button"/>
                  <img id="logInFire2Image" className="logInFire2-images" src={logInButtonFire2} alt="Login Button"/>
                  <img id="logInFire3Image" className="logInFire3-images" src={logInButtonFire3} alt="Login Button"/>
                  <img className="logIn-images" src={logInButton}/>
                </div>
              </Link>}
                {user && <Link to="/account-page">
                  <div id="account-Button">
                    <img id="account-image" src={accountImage} alt="Account Button"/>
                  </div>
                </Link>}
              </div>
              {user && <h2 onClick={logOutUser}>Log out</h2>}

            </div>
            
              
            {/* <div id="LogOut-Button" onClick={logUserOut} value="LogOut">Log out</div> */}
            {/* <div id="is-user-logged-in" onClick={checkLoggedIn} value="is-user-logged-in">Logged in?</div> */}
    </div>
    {/* </Paths> */}
    <div className="Rendering pages">
      {/* {home && <HomePage />}
      {booking && <BookingPage  user={user}/>}
      {logIn && <LogInPage logInAttempt={logInAttempt} registerNewAccountAttempt={registerNewAccountAttempt}/>} */}
      
    </div>
    </div>
      
    )
}

export default NavBar;