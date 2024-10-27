import React, { useEffect } from "react";
import './blankCalendarDay.css';

const BlankCalendarDay = ({ date, id }) => {

    useEffect(() => {
        const classNameLi = createClassNameIdLi();

        // Define dynamic styles for the li (size and dark grey background)
        const stylesLi = `
            width: 100%;
            height: 4vw;
            font-size: 1.5vw;
            background-color: #595959; /* Dark grey */
            color: #fff; /* White text for contrast */
            border-radius: 5px;
            text-align: center;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        // Add the styles dynamically
        addCSSRule(`.${classNameLi}`, stylesLi);
    }, [id]);

    // Helper function to add CSS rule dynamically
    const addCSSRule = (selector, rules) => {
        const styleSheet = document.styleSheets[0];
        if (styleSheet.insertRule) {
            styleSheet.insertRule(`${selector} { ${rules} }`, styleSheet.cssRules.length);
        } else if (styleSheet.addRule) {
            styleSheet.addRule(selector, rules, styleSheet.cssRules.length);
        }
    };

    // Generate class name for the li element
    const createClassNameIdLi = () => {
        return `blank-li-entry-${id}`;
    };

    // Function to add "st", "nd", "rd", or "th" to date
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
            <li className={createClassNameIdLi()}>
                {`${date.getDate()}`}{nthNumber(date.getDate())}
            </li>
        </>
    );
};

export default BlankCalendarDay;
