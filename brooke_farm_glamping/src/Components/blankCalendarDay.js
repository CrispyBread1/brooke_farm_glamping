import React from "react";
import { useState, useEffect } from "react";
import './blankCalendarDay.css'
import { monitorAuthState } from "../Scripts/authenicationControls";


const BlankCalendarDay = ({ date, month, id}) => {

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
        }
      };
    


    return (
        <>
            <li className="blank-li-entry">
               
            {`${date.getDate()}`}{nthNumber(date.getDate())}
                {/* hello
                <br />
                Bookings: {bookingsAmount}s */}
                
            </li>
      
        </>
    )
}


export default BlankCalendarDay;