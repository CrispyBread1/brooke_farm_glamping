import React from "react";
import UserBooking from "../../../Components/AccountPage/userBooking";
import { useEffect, useState } from "react";
import '../../AccountPage/userBookingContainer.css'




const AdminDisplayBookingsContainer = ({daysOfWeek, months, bookings, showDetails, nthNumber}) => {

    const [bookingsArray, setBookingsArray] = useState([])
    const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false)
    const [bookingForDetails, setBookingForDetails] = useState(null)

    useEffect(() => {
        fillBookings()
    }, [bookings])

    

    useEffect(() => {
        // console.log(bookings)
    }, [])

    const fillBookings = () => {
        var arrayOfBookings = []
        if (bookings) {
            for (var i = 0; i < bookings.length; i++) {
                arrayOfBookings.push(<UserBooking key={i} id={i} daysOfWeek={daysOfWeek} months={months} booking={bookings[i]} showDetails={showDetails} nthNumber={nthNumber}/>)
            }  
        }
        setBookingsArray(arrayOfBookings)
    }

   

    return (
        <>
            <h3>Admin Bookings:</h3>

            {bookings && 
                <ul className="user--bookings">
                    {bookingsArray}
                </ul>}

            {!bookings && <h2>There are currently no admin bookings</h2>}
            
        </>
    )
}


export default AdminDisplayBookingsContainer;