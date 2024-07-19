import React, { useEffect, useState }  from "react";
import CalendarContainer from './calendarContainer'
import BookingContainer from "./bookingContainer";
import './bookingPage.css'
import { addBooking, editBooking, retrieveBooking, cancelBooking, retrieveCampingFacilities} from '../Scripts/databaseControls.js';
import Booking from "../Classes/booking";

const BookingPage = ({user}) => {

    // useEffect(() => {
    //     const fillerDate = new Date()
    //     setDateObject(fillerDate)
    //     console.log('hello')
    // }, [])

  const [bookingBoxOpen, setBookingBoxOpen] = useState(false);
  const [bookings, setBookings] = useState('');

  const [campingFalilities, setCampingFalilities] = useState(null)

  const [dateObject, setDateObject] = useState(null)
  const [daysOfWeek, setDaysOfWeek] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  const [months, setMonths] = useState([{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:30}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]);
  

  useEffect(() => {
    fetchBookings(new Date().getMonth())
    fetchCampingFacilities()

  }, []);
    // useEffect(() => { // Renders when bookings have come through
    //     // fillDaysInMonth()
    //     console.log('useeffect')
    // }, [bookingBoxOpen])

  const fetchBookings = async (tok1) => {
    const month = new Date();
    try {
      const bookings = await retrieveBooking(tok1);
      setBookings(bookings);
          
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }};

  const fetchCampingFacilities = async () => {
    try {
      const camps = await retrieveCampingFacilities();
      setCampingFalilities(camps)
    } catch (error) {
      console.error('Error fetching campsites:', error);
    }
  }

  const newBooking = () => {
    const userId = Math.floor(Math.random() * 100);
    const guestName = 'dan';
    const guests = 2;
    const space = 'tent';
    const dateWork = new Date()
        // console.log((dateWork.getDay() + 1 ))
    const date = ((dateWork.getDate() + 4 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
        // const date2 = ((dateWork.getDay() + 2 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
        // const date3 = ((dateWork.getDay() + 3 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
        // const date4 = ((dateWork.getDay() + 4 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
        // const date = [date1, date2, date3, date4]
    const nights = 1
    const state = 'Approved'
    const notes = 'notes test'
    const dateBookingCreated = ((dateWork.getDate() + 1 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
        // addBooking(userId, guestName, guests, space, date.toString(), nights, state)
    const newBooking = new Booking(userId, guestName, guests, space, date, nights, state, notes, dateBookingCreated)
        // console.log(newBooking)
    addBooking(userId, newBooking)
   }

  const checkUserGotThrough = () => {
    console.log(user)
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

  const checkCampsGotRetreived = () => {
    console.log(campingFalilities)
  }


  return (
    <div>
        <p>Booking page</p>

        {/* <div id="Add-booking"  onClick={newBooking} value="addBooking">Add Booking</div> */}
        <div onClick={checkUserGotThrough}>User email: {`${user}`}</div>
        <button onClick={checkCampsGotRetreived}>check camps came through</button>

        <button id="hideBookingbox" onClick={closeBookingBox}>Hide booking info</button>

        <div id ="Calendar-booking-container">

            <div id="Calendar-container">
                <CalendarContainer openBookingBox={openBookingBox} daysOfWeek={daysOfWeek} months={months} bookings={bookings} nthNumber={nthNumber}/>
            </div>

        
            <div className='Booking-container'>
                <BookingContainer bookingBoxOpen={bookingBoxOpen} dateObject={dateObject} daysOfWeek={daysOfWeek} months={months} nthNumber={nthNumber}/>
            </div> 
        
        </div>

    </div>
 )
}

export default BookingPage