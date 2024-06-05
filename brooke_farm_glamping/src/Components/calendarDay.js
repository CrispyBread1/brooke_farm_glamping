import React from "react";


const CalendarDay = ({day}) => {
    return (
        <>
            <li className="li-entry">
            {`${day}`}s
            </li>
      <br />
        </>
    )
}


export default CalendarDay;