import React, { useEffect, useState } from "react";



const UserBooking = ({daysOfWeek, months, booking}) => {

    const [dateStaying, setDateStaying] = useState(null)

    useEffect(() => {
        configureTitle()
    }, [])

    const configureTitle = () => {
        let firstNight = (booking.date[0].toDate())
        let lastNight = (booking.date[(booking.date.length - 1)].toDate())

        setDateStaying(months[firstNight.getMonth()].month + ': ' + firstNight.getDate() + ' - ' + months[lastNight.getMonth()].month + ': ' +  lastNight.getDate())
           
       
    }

    return (
        <div className="user--Booking">
            <li>
                {dateStaying}
            </li>
        </div>
    )
}


export default UserBooking;