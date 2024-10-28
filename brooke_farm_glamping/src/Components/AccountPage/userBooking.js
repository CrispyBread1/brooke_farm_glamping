import React, { useEffect, useState } from "react";



const UserBooking = ({daysOfWeek, months, booking}) => {

    const [dateStaying, setDateStaying] = useState(null)

    useEffect(() => {
        configureTitle()
    }, [])

    const configureTitle = () => {
        setDateStaying(months[(booking.date[0].toDate()).getMonth()].month + ' - ' + months[(booking.date[(booking.date.length - 1)].toDate()).getMonth()].month)
       
    }

    return (
        <li>
            {dateStaying}
        </li>
    )
}


export default UserBooking;