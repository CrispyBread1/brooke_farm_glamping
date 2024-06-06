import React from "react";
import { useState, useEffect } from "react";


const CalendarDay = ({bookingsAmount, date}) => {

    return (
        <>
            <li className="li-entry">
                Date: {`${date}`}  
                {/* hello */}
                Bookings: {bookingsAmount}s
            </li>
      <br />
        </>
    )
}


export default CalendarDay;