import React from "react";
import { useState, useEffect } from "react";
import './calendarDay.css'


const CalendarDay = ({bookingsAmount, date}) => {

    useEffect(() => {
        addCSSRule('#li-entry', ('grid-area:' + dayOfMonth()));
      }, []);

    const dayOfMonth = () => {
        var dayOfWeek = date.getDay()
        // console.log(dayOfWeek)
    }

    // Function to add a CSS rule to a stylesheet
    const addCSSRule = (selector, rule) => {
    // Find the first stylesheet
    let styleSheet = document.querySelector(".li-entry");

    // Add the CSS rule to the stylesheet
    if (styleSheet.insertRule) {
        styleSheet.insertRule(`${selector} { ${rule} }`, styleSheet.cssRules.length);
    } else if (styleSheet.addRule) {
        styleSheet.addRule(selector, rule, -1);
    }
    }

// Add the CSS rule for #item1


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