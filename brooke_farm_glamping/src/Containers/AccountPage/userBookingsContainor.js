import React from "react";
import UserBooking from "../../Components/AccountPage/userBooking";
import { useEffect, useState } from "react";
import './userBookingContainor.css'



const UserBookingsContainer = ({daysOfWeek, months, bookings}) => {

    const [bookingsArray, setBookingsArray] = useState([])

    useEffect(() => {
        fillBookings()
    }, [bookings])

    const fillBookings = () => {
        var arrayOfBookings = []
        if (bookings) {
            for (var i = 0; i < bookings.length; i++) {
                arrayOfBookings.push(<UserBooking key={i} id={i} daysOfWeek={daysOfWeek} months={months} booking={bookings[i]}/>)
            }  
        }
        setBookingsArray(arrayOfBookings)
    }

    return (
        <>
            <h3>Bookings:</h3>

            {bookings && 
                <ul className="user--bookings">
                    {bookingsArray}
                </ul>}

            {!bookings && <h2>There are currently no bookings</h2>}
        </>
    )
}


export default UserBookingsContainer;