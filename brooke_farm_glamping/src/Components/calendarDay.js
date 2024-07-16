import React from "react";
import { useState, useEffect } from "react";
import './calendarDay.css'
import { monitorAuthState } from "../Scripts/authenicationControls";
import BookingBox from "./bookingBox";
import Booking from "../Classes/booking";


const CalendarDay = ({bookingsAmount, date, openBookingBox, id}) => {

    useEffect(() => {
        const classNameLi = createClassNameIdLi();
        const stylesLi = `
            
            text-align: center;
            position: relative;
            
        `;

        addCSSRule(`.${classNameLi}`, stylesLi);
        // addCSSRule(`.${classNameBox}`, stylesBox);
    }, [id]);

    const addCSSRule = (selector, rules) => {
        const styleSheet = document.styleSheets[0];
        if (styleSheet.insertRule) {
            styleSheet.insertRule(`${selector} { ${rules} }`, styleSheet.cssRules.length);
        } else if (styleSheet.addRule) {
            styleSheet.addRule(selector, rules, styleSheet.cssRules.length);
        }
    }

    const createClassNameIdBox = () => {
        return "booking-box-" + id
    }

    const createClassNameIdLi = () => {
        // console.log('li-entry' + id)
        return "li-entry-" + id
    }

    const toggleBookingBox = () => {
        // console.log(id)
        openBookingBox(date)
    }





    return (
        <>
        
            <li className={createClassNameIdLi()}  >
            <button className='li-Button' onClick={toggleBookingBox}>
                {`${date.getDate()}`}  
                
                </button>
            </li>
        
            
        </>
    )
}


export default CalendarDay;