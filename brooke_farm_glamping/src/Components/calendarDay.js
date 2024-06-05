import React from "react";


const CalendarDay = ({date, months}) => {
    return (
        <>
            <li className="li-entry">
            {`${date}`} with {`${months}`}s
            </li>
      <br />
        </>
    )
}


export default CalendarDay;