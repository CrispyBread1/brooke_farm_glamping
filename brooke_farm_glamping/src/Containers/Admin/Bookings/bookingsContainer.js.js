import React from "react";
import { useEffect, useState } from "react";
import { retrieveActiveBookings } from "../../../Scripts/databaseControls/bookingControls";
import UserBookingsContainer from "../../../Containers/AccountPage/userBookingsContainer";



const AdminBookings = ({daysOfWeek, months, nthNumber}) => {

    const [activeBookings, setActiveBookings] = useState(null)
    const [bookingsList, setBookingsList] = useState(null)
    const [search, setSearch] = useState(false)

    useEffect(() => {
        fetchActiveBookings()
    
    }, []);

    const fetchActiveBookings = () => {
        retrieveActiveBookings()
        .then((res) => {
            setActiveBookings(res)
        })
    }

    const renderBookings = () => {
        if (search) {
            //Do something
        } else {
            // fillBookings()
        }
    }

   

    return (
        <>
            <h3>Bookings:</h3>
            
            <UserBookingsContainer daysOfWeek={daysOfWeek} months={months} bookings={activeBookings} nthNumber={nthNumber}/>
        </>
    )
}


export default AdminBookings;