import React from "react";
import { useState, useEffect } from "react";
import './calendarDay.css'
import { monitorAuthState } from "../Scripts/authenicationControls";
import BookingBox from "./bookingBox";
import Booking from "../Classes/booking";


const CalendarDay = ({bookingsAmount, date, id}) => {

    useEffect(() => {
        const className = createClassNameId();
        const styles = `
            padding: 20px;
            text-align: center;
        `;
        addCSSRule(`.${className}`, styles);
    }, [id]);

    const addCSSRule = (selector, rules) => {
        const styleSheet = document.styleSheets[0];
        if (styleSheet.insertRule) {
            styleSheet.insertRule(`${selector} { ${rules} }`, styleSheet.cssRules.length);
        } else if (styleSheet.addRule) {
            styleSheet.addRule(selector, rules, styleSheet.cssRules.length);
        }
    }



    const createClassNameId = () => {
        // console.log('li-entry' + id)
        return "li-entry-" + id
    }

    const toggleBookingBox = () => {
        console.log(id)
    }





    return (
        <>
        <button onClick={toggleBookingBox}>
            <li className={createClassNameId()} >
                
                Date: {`${date.getDate()}`}  
                {/* hello */}
                <br />
                Bookings: {bookingsAmount}s
                
            </li>
        </button>
            {/* <div className="booking-box">
            
            </div> */}
        </>
    )
}


export default CalendarDay;