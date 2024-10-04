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
  // const [user, setUser] = useState(null)
  const [hovering, setHovering] = useState(false)
  const [bookingInformation, setBookingInformation] = useState(null)

  // const history = useHistory();

  const [daysOfWeek, setDaysOfWeek] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  const [months, setMonths] = useState([{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:30}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]);

 
//  useEffect(()=> {
//   console.log(user)
//  }, [user])
  
  
  // const logInAttempt = async (email, password) => {
  //   try {
  //         const userCredentials = await logInEmailPassword(email, password)
  //         // setUser()
  //         UserIn(userCredentials)
  //     }
  //     catch(error) {
  //         return error.code
  //     }
  // }
  
  const registerNewAccountAttempt = (email, password) => {
    return (registerNewAccountEmailPassword(email, password))
  }

  // const logUserOut = () => {
  //   setUser({});
  //   logOut();
  // // }

  // const UserIn = (user) => {
  //   setUser(user)
  // }

    // Handles the ordinal numbers for the date *------------- *-------------
    const nthNumber = (number) => {
      if (number > 3 && number < 21) return "th";
      switch (number % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
    }};

  // const fillBookingInformation = (booking) => {
  //   // console.log(booking)
  //   if (!bookingInformation) {
  //       setBookingInformation(booking)
  //       const serializedObject = encodeURIComponent(JSON.stringify(bookingInformation));
  //       history.push(`/details?data=${serializedObject}`);
  //   }
// }

  return (
    <Paths daysOfWeek={daysOfWeek} months={months} nthNumber={nthNumber}/>
    
    
  );

}



export default App;
