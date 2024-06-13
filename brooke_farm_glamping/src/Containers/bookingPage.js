import React, { useEffect, useState }  from "react";
import CalendarContainer from './calendarContainer'
import './bookingPage.css'
import { addBooking, editBooking, retreiveBooking, cancelBooking} from '../Scripts/databaseControls.js';
import Booking from "../Classes/booking";

const BookingPage = ({ user}) => {

    

    const newBooking = () => {
        const userId = Math.floor(Math.random() * 100);
        const guestName = 'dan';
        const guests = 2;
        const space = 'tent';
        const dateWork = new Date()
        // console.log((dateWork.getDay() + 1 ))
        const date = ((dateWork.getDay() + 1 ) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
        const nights = 1
        const state = 'Approved'
        const notes = 'notes test'
        // addBooking(userId, guestName, guests, space, date.toString(), nights, state)
        const newBooking = new Booking(userId, guestName, guests, space, date, nights, state, notes)
        // console.log(newBooking)
        addBooking(userId, newBooking)
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