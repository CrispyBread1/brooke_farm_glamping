import React from "react";
import { useState, useEffect } from "react";
import './calendarDay.css'
import { monitorAuthState } from "../Scripts/authenicationControls";


const CalendarDay = ({bookingsAmount, date}) => {

    const test = () => {
        console.log('test')
    }

    return (
        <>
        <button onClick={test}>
            <li className="li-entry" >
                
                Date: {`${date.getDate()}`}  
                {/* hello */}
                <br />
                Bookings: {bookingsAmount}s
                
            </li>
        </button>
        </>
    )
}


export default CalendarDay;