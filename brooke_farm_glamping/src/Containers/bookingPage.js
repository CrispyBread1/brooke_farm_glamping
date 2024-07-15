import React, { useEffect, useState }  from "react";
import CalendarContainer from './calendarContainer'
import BookingContainer from "./bookingContainer";
import './bookingPage.css'
import { addBooking, editBooking, retreiveBooking, cancelBooking} from '../Scripts/databaseControls.js';
import Booking from "../Classes/booking";

const BookingPage = ({user}) => {

    const [bookingBoxOpen, setBookingBoxOpen] = useState(false);
    const [dateObject, setDateObject] = useState({})

    // useEffect(() => { // Renders when bookings have come through
    //     // fillDaysInMonth()
    //     console.log('useeffect')
    // }, [bookingBoxOpen])

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
        // console.log(dateObject)
        setBookingBoxOpen(true);
        const sidebar = document.querySelector('.Booking-container');
        if (bookingBoxOpen) {
            sidebar.classList.remove('show');
        } else {
            sidebar.classList.add('show');
        }
        
    }

    const closeBookingBox = () => {
        setBookingBoxOpen(false)
        const sidebar = document.querySelector('.Booking-container');
        // console.log(dateObject.getDate())
        sidebar.classList.remove('show');
        
    }

    // const userEmail = () => {
    //     return <p>{`${user.user.email}`}</p>
    // }

    return (
    <div>
        <p>Booking page</p>

        <div id="Add-booking"  onClick={newBooking} value="addBooking">Add Booking</div>
        <div onClick={checkUserGotThrough}>User email: {`${user}`}</div>

        <button id="hideBookingbox" onClick={closeBookingBox}>Hide booking info</button>

        <div id ="Calendar-booking-container">

            <div id="Calendar-container">
                <CalendarContainer openBookingBox={openBookingBox}/>
            </div>

        
            <div className='Booking-container'>
                <BookingContainer bookingBoxOpen={bookingBoxOpen} dateObject={dateObject}/>
            </div> 
        
        </div>

    </div>
 )
}

export default BookingPage