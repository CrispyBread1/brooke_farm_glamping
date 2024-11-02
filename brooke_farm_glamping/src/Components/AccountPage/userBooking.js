import React, { useEffect, useState } from "react";
import './userBooking.css'



const UserBooking = ({daysOfWeek, months, booking, showDetails}) => {

    const [dateStaying, setDateStaying] = useState(null)

    useEffect(() => {
        configureTitle()
    }, [])

    const configureTitle = () => {
        let firstNight = (booking.date[0].toDate())
        let lastNight = (booking.date[(booking.date.length - 1)].toDate())
        setDateStaying(months[firstNight.getMonth()].month + ': ' + firstNight.getDate() + ' - ' + months[lastNight.getMonth()].month + ': ' +  lastNight.getDate()) 
    }

    const generateDetails = () => {
        showDetails(booking)
    }    

    return (
       
        <li className="user--bookings--li">
            <div className="user--bookings--li--ref">
                Ref: {booking.reference}
            </div>
            <div className="user--bookings--li--dateStaying">
                {dateStaying}
            </div>
            <div className="user--bookings--li--campingFacility">
                {booking.space.name}
            </div>
            {/* <div className="user--bookings--li--state">
                {booking.state}
            </div> */}
            <div className="user--bookings--li--details" onClick={generateDetails}>
                Details
            </div>
        </li>
        
    )
}


export default UserBooking;