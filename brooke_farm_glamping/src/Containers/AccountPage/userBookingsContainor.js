import React from "react";
import UserBooking from "../../Components/AccountPage/userBooking";
import { useEffect, useState } from "react";



const UserBookingsContainer = ({daysOfWeek, months, bookings}) => {

    const [bookingsArray, setBookingsArray] = useState([])

    useEffect(() => {
        fillBookings()
    }, [bookings])

    const fillBookings = () => {
        // console.log(bookings)
        var arrayOfBookings = []
        if (bookings) {
            for (var i = 0; i < bookings.length; i++) {
                console.log(bookings[i])
                arrayOfBookings.push(<UserBooking key={i} id={i} daysOfWeek={daysOfWeek} months={months} booking={bookings[i]}/>)
            }  
        }
        setBookingsArray(arrayOfBookings)
    }
    // days.push(<BlankCalendarDay key={i}  date={dateObject} month={months[monthNum]} id={i}/>)

    return (
        <>
            <h3>Bookings:</h3>

            {bookings && 
                <ul id="bookings">
                    {bookingsArray}
                </ul>}

            {!bookings && <h2>There are currently no bookings</h2>}
        </>
    )
}


export default UserBookingsContainer;