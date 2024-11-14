import React from "react";
import { useEffect, useState } from "react";
import { retrieveActiveBookings } from "../../../Scripts/databaseControls/bookingControls";



const AdminBookings = ({}) => {

    const [activeBookings, setActiveBookings] = useState(null)
    // const [facilitiesForms, setFacilitiesForms] = useState(null)
    // const [addingNewFacility, setAddingNewFacility] = useState(false)

    useEffect(() => {
        fetchActiveBookings()
    
    }, []);

    const fetchActiveBookings = () => {
        retrieveActiveBookings()
        .then((res) => {
            // setActiveBookings(res.sort((a, b) => b.dateBookingCreated - a.dateBookingCreated))
            setActiveBookings(res)
        })
    }

    const showBooking = () => {
        console.log(activeBookings)
    }
   

    return (
        <>
            <h3>Bookings:</h3>
            
            <button id="showBookings" className="showbookings" style={{ width: "", height: "" }} onClick={showBooking}>
                    show bbokings
                </button>
        </>
    )
}


export default AdminBookings;