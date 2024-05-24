import './App.css';
import React, { useState } from 'react';
import HomePage from './Containers/homePage';
import BookingPage from './Containers/bookingPage';

function App() {

  const [home, setHome] = useState(true)
  const [booking, setBooking] = useState(false)

  const changeHomePage = () => {
    setHome(true);
      setBooking(false);
  }

  const changeBookingPage = () => {
      setHome(false);
      setBooking(true);
  }


  return (
    <div className= "Homepage">


    <div className="NavButtons">
            <div id="Home-Button"  onClick={changeHomePage} value="Home">Home</div>
            <div id="Book-Button" onClick={changeBookingPage} value="Book">Book</div>
    </div>

    <div className="Rendering pages">
      {home && <HomePage />}
      {booking && <BookingPage />}
    </div>
    </div>
  );

}

export default App;
