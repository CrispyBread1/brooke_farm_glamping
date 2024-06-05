import React, { useEffect, useState }  from "react";
import CalendarContainer from './calendarContainer'
import './bookingPage.css'
import { addBooking, editBooking, retreiveBooking, cancelBooking} from '../Scripts/databaseControls.js';

const BookingPage = ({ user}) => {

    

    const newBooking = () => {
        const userId = Math.floor(Math.random() * 100);
        const guestName = 'dan';
        const guests = 2;
        const space = 'tent';
        const date = new Date()
        const nights = 1
        const state = 'Approved'
        addBooking(userId, guestName, guests, space, date.toString(), nights, state)
    }

    const checkUserGotThrough = () => {
        console.log(user)
    }

    // const userEmail = () => {
    //     return <p>{`${user.user.email}`}</p>
    // }

    return (
    <div>
        <p>Booking page</p>

        <div id="Add-booking"  onClick={newBooking} value="addBooking">Add Booking</div>
        <div onClick={checkUserGotThrough}>User email: {`${user}`}</div>

        <div id="Calendar-container">
            <CalendarContainer/>
        </div>

    </div>
 )
}

export default BookingPage