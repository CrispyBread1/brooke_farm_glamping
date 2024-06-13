import React from "react";
import { useState, useEffect } from "react";
import './calendarDay.css'
import { monitorAuthState } from "../Scripts/authenicationControls";


const CalendarDay = ({bookingsAmount, date, gridID}) => {

    // useEffect(() => {
    //     addCSSRule('#li-entry', ('grid-area:' + gridID));
        
    //   }, []);



    
    // const addCSSRule = (selector, rule) => { // Function to add a CSS rule to a stylesheet
    //     let listItem = document.querySelector(".li-entry");

    //     listItem.style.gridArea = rule

    // }

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