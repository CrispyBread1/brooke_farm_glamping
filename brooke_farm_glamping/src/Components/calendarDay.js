import React from "react";
import { useState, useEffect } from "react";
import './calendarDay.css'
import { monitorAuthState } from "../Scripts/authenicationControls";
import BookingBox from "./bookingBox";
import Booking from "../Classes/booking";


const CalendarDay = ({bookingsAmount, date}) => {

    



    return (
        <>
        <button onClick={toggleBookingBox}>
            <li className="li-entry" >
                
                Date: {`${date.getDate()}`}  
                {/* hello */}
                <br />
                Bookings: {bookingsAmount}s
                
            </li>
        </button>
            <div className="booking-box">
            
            </div>
        </>
    )
}


export default CalendarDay;