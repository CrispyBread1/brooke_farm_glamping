import React from "react";
import { useState, useEffect } from "react";
import './calendarDay.css'


const CalendarDay = ({bookingsAmount, date}) => {

    return (
        <>
            <li className="li-entry">
                Date: {`${date}`}  
                {/* hello */}
                <br />
                Bookings: {bookingsAmount}s
            </li>
      
        </>
    )
}


export default CalendarDay;