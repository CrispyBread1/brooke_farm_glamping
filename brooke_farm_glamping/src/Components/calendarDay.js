import React, { useState, useEffect } from "react";
import './calendarDay.css';
import BookingBox from "./bookingBox";
import Booking from "../Classes/booking";

const CalendarDay = ({ bookingsAmount, date, openBookingBox, id }) => {

    const [selected, setSelected] = useState(false)
    const [colour, setColour] = useState('#fff')
    // const [uniqueID, setUniqueID] = useState(null)

    useEffect(() => {
        const classNameLi = createClassNameIdLi();
        const classNameButton = createClassNameIdButton();

        // Define dynamic styles for the li
        const stylesLi = `
            text-align: center;
            position: relative;
            background-color: #fff;
            width: 100%;
            height: 4vw;
            font-size: 1.5vw;
            border-radius: 5px;
            box-sizing: border-box;
        `;

        // Define dynamic styles for the button
        const stylesButton = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            font-size: 1.5vw;
            background-color: transparent;
            cursor: pointer;
            color: #333;
            border: 1px solid #ccc;
            text-align: center;
            background-color: ${colour};
            transition: background-color 0.3s, transform 0.3s;
        `;

        // Add the styles dynamically
        addCSSRule(`.${classNameLi}`, stylesLi);
        addCSSRule(`.${classNameButton}`, stylesButton);
    }, [id, selected]);

    // Helper function to add CSS rule dynamically
    const addCSSRule = (selector, rules) => {
        const styleSheet = document.styleSheets[0];
        if (styleSheet.insertRule) {
            styleSheet.insertRule(`${selector} { ${rules} }`, styleSheet.cssRules.length);
        } else if (styleSheet.addRule) {
            styleSheet.addRule(selector, rules, styleSheet.cssRules.length);
        }
    };

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

    // Generate class name for the li element
    const createClassNameIdLi = () => {
        // if ()
        return `li-entry-${id}`;
    };

    // Generate class name for the button element
    const createClassNameIdButton = () => {
        return `li-button-${id}`;
    };

    const dayIsSelected = () => {
        toggleBookingBox()
        setSelected(true)
        setColour('#006600')
    }

    const toggleBookingBox = () => {
        openBookingBox(date);
    };

    return (
        <li className={createClassNameIdLi()}>
            <button className={createClassNameIdButton()} onClick={dayIsSelected}>
                {`${date.getDate()}`}{nthNumber(date.getDate())}
            </button>
        </li>
    );
};

export default CalendarDay;
