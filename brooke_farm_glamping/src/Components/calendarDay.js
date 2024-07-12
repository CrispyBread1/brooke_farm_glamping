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
            padding: 20px;
            text-align: center;
            position: relative;
            width: auto;
            height: auto;
        `;
        const classNameBox = createClassNameIdBox();
        const stylesBox = `
        position: absolute;

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
        console.log(id)
        openBookingBox()
    }





    return (
        <>
        <button onClick={toggleBookingBox}>
            <li className={createClassNameIdLi()} >
                
                {`${date.getDate()}`}  
                {/* hello */}
                <br />
                {/* Bookings: {bookingsAmount}s */}
                {/* <div className={createClassNameIdBox()}> */}
                    {/* <BookingBox></BookingBox> */}
                {/* </div> */}
            </li>
        </button>
            
        </>
    )
}


export default CalendarDay;