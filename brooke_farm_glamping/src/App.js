import './App.css';
import React, { useEffect, useState} from 'react';
import { logOut } from './Scripts/authenticationControls.js';
import { Paths } from './Scripts/routes';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retrieveUser } from './Scripts/databaseControls/userControls.js';



function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  
  const months = [{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:30}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]
  
  const daysOfWeek =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  useEffect(() => {
    checkAuth()

  }, [loggedIn])

  const checkAuth = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (doc) => {
      if (doc) {
        retrieveUser(doc.uid)
        .then((res) => (setUser(res)))
      } else {
        console.log("Logged out")
      }
    })
  }

  const userLoggedIn = () => {
    setLoggedIn(true)
  }

  const userLoggedOut = () => {
    setLoggedIn(false)
    logOut()
  }


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

  return (
    <Paths daysOfWeek={daysOfWeek} months={months} nthNumber={nthNumber} userLoggedIn={userLoggedIn} user={user} userLoggedOut={userLoggedOut}/>
    
    
  );

}



export default App;
