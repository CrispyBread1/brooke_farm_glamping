import React from "react";
import { useState, useEffect } from "react";
import './blankCalendarDay.css'
import { monitorAuthState } from "../Scripts/authenicationControls";


const BlankCalendarDay = ({ date, month }) => {

    // useEffect(() => {
    //     addCSSRule('#li-entry', ('grid-area:' + gridID));
        
    //   }, []);



    
    // const addCSSRule = (selector, rule) => { // Function to add a CSS rule to a stylesheet
    //     let listItem = document.querySelector(".li-entry");

    //     listItem.style.gridArea = rule

    // }

    return (
        <>
            <li className="blank-li-entry">
                BLANK
                Date: {`${date.getDate()}`} : {`${month.month}`}  
                {/* hello
                <br />
                Bookings: {bookingsAmount}s */}
                
            </li>
      
        </>
    )
}


export default BlankCalendarDay;