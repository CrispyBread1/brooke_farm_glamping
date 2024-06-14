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