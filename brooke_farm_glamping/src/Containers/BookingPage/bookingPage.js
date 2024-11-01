import React, { useEffect, useState }  from "react";
import CalendarContainer from "./calendarContainer.js"
import BookingContainer from "./bookingContainer.js"
import './bookingPage.css'
import { addBooking, editBooking, cancelBooking, retrieveCampingFacilities} from '../../Scripts/databaseControls/userControls.js';
import Booking from "../../Classes/booking.js";

const BookingPage = ({ months, daysOfWeek, nthNumber}) => {

  const [bookingBoxOpen, setBookingBoxOpen] = useState(false);
  const [bookings, setBookings] = useState('');

  const [campingFacilities, setCampingFacilities] = useState(null)

  const [dateObject, setDateObject] = useState(null)
  
  
  const [amountOfNightsStaying, setAmountOfNightsStaying] = useState(null)

  useEffect(() => {
    // fetchBookings(new Date().getMonth())
    fetchCampingFacilities()

  }, []);

  const fetchBookings = async (tok1) => {
    const month = new Date();
    try {
      // const bookings = await retrieveBooking(tok1);
      setBookings(bookings);
          
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }};

  const fetchCampingFacilities = async () => {
    try {
      const camps = await retrieveCampingFacilities();
      const arr = []
      camps.forEach((doc) => {
        arr.push(doc.data())
      });
      setCampingFacilities(arr)
    } catch (error) {
      console.error('Error fetching campsites:', error);
    }
  }

  // const newBooking = () => {
  //   const userId = Math.floor(Math.random() * 100);
  //   const guestName = 'dan';
  //   const guests = 2;
  //   const space = 'tent';
  //   const dateWork = new Date()
  //       // console.log((dateWork.getDay() + 1 ))
  //   const date = ((dateWork.getDate() + 4 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
  //       // const date2 = ((dateWork.getDay() + 2 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
  //       // const date3 = ((dateWork.getDay() + 3 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
  //       // const date4 = ((dateWork.getDay() + 4 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
  //       // const date = [date1, date2, date3, date4]
  //   const nights = 1
  //   const state = 'Approved'
  //   const notes = 'notes test'
  //   const dateBookingCreated = ((dateWork.getDate() + 1 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
  //       // addBooking(userId, guestName, guests, space, date.toString(), nights, state)
  //   const newBooking = new Booking(userId, guestName, guests, space, date, nights, state, notes, dateBookingCreated)
  //       // console.log(newBooking)
  //       addToDatabase(userId, newBooking)
  //  }

  const checkUserGotThrough = () => {
    // console.log(user)
  }

  const openBookingBox = (date) => {
    setDateObject(date);
    setBookingBoxOpen(true);
    if (!bookingBoxOpen) {
      const sidebar = document.querySelector('.Booking-container');
    if (bookingBoxOpen) {
      sidebar.classList.remove('show');
    } else {
      sidebar.classList.add('show');
    }}}

  const closeBookingBox = () => {
    setBookingBoxOpen(false)
    const sidebar = document.querySelector('.Booking-container');
        // console.log(dateObject.getDate())
    sidebar.classList.remove('show');   
    }

  

  const checkCampsGotRetreived = () => {
    // for (var j in campingFalilities) {
    //   console.log(campingFalilities[j].name)
    // }
    console.log(campingFacilities)
  }

  const relayAmountOfNightsStaying = (tok1) => {
    setAmountOfNightsStaying(tok1)
}


  return (
    <div className="Booking-page">
        <p>Booking page</p>

        {/* <div id="Add-booking"  onClick={newBooking} value="addBooking">Add Booking</div> */}
        <div onClick={checkUserGotThrough}>User email: {}</div>
        <button onClick={checkCampsGotRetreived}>check camps came through</button>

        <button id="hideBookingbox" onClick={closeBookingBox}>Hide booking info</button>

        <div id ="Calendar-booking-container">
        <div id="controls-and-calendar">

            <div id="Calendar-container">
                <CalendarContainer openBookingBox={openBookingBox} daysOfWeek={daysOfWeek} months={months} bookings={bookings} nthNumber={nthNumber} relayAmountOfNightsStaying={relayAmountOfNightsStaying} amountOfNightsStaying={amountOfNightsStaying}/>
            </div>

        </div>

        
            <div className='Booking-container'>
                <BookingContainer dateObject={dateObject} months={months} nthNumber={nthNumber} campingFacilities={campingFacilities} relayAmountOfNightsStaying={relayAmountOfNightsStaying}/>
            </div> 
        
        </div>

    </div>
 )
}

export default BookingPage