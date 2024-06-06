import React from "react";


const CalendarDay = ({fetchedBookings, date}) => {

    
    
    const amountOfBookings = () => {

        var number = 0;

        for (var j in fetchedBookings){
        // console.log(j)
            if (fetchedBookings[j].information.date == date) {
                number ++
            }  
        }
        return number
    }


    return (
        <>
            <li className="li-entry">
                Date: {`${date}`}  
                {/* hello */}
                Bookings: {amountOfBookings}s
            </li>
      <br />
        </>
    )
}


export default CalendarDay;