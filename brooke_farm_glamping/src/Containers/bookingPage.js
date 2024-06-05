import React from "react";
import CalendarContainer from './calendarContainer'
import './bookingPage.css'

const BookingPage = ({newBooking, user}) => {

    // var userAc = ''

    // if (user) {
    //     userAc = user.user
    // }

    const addBooking = () => {
        newBooking()
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

        <div id="Add-booking"  onClick={addBooking} value="addBooking">Add Booking</div>
        <div onClick={checkUserGotThrough}>User email: {`${user}`}</div>

        <div id="Calendar-container">
            <CalendarContainer/>
        </div>

    </div>
 )
}

export default BookingPage