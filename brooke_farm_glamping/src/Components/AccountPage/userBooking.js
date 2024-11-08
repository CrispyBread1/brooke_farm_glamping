import React, { useEffect, useState } from "react";
import './userBooking.css'



const UserBooking = ({daysOfWeek, months, booking, nthNumber}) => {

    const [dateStaying, setDateStaying] = useState(null)
    const [showBooking, setShowBooking] = useState(false)
    const [detailsState, setDetailsState] = useState('Details')

    useEffect(() => {
        configureTitle()
    }, [])

    const configureTitle = () => {
        let firstNight = (booking.date[0].toDate())
        let lastNight = (booking.date[(booking.date.length - 1)].toDate())
        setDateStaying(months[firstNight.getMonth()].month + ': ' + firstNight.getDate() + nthNumber(firstNight.getDate()) + ' - ' + months[lastNight.getMonth()].month + ': ' +  lastNight.getDate() + nthNumber(lastNight.getDate()) + ' / ' + firstNight.getFullYear()) 
    }

    const configureDateBookingCreated = () => {
        var bookingCreated = booking.dateBookingCreated.toDate()
        return (
            bookingCreated.getDate() + '/' + bookingCreated.getMonth() + '/' + bookingCreated.getFullYear()
        )
    }

    const generateDetails = () => {
        if (showBooking) {
            setShowBooking(false)
            setDetailsState('Details')
        } else {
            setShowBooking(true)
            setDetailsState('X')
        }
    }    

    // campingSite, children, dogs, firePit, gazebo, additionalCars, dateCreated, cost, email, state

    return (
       
        <li className="user--bookings--li">
            <div className="user--bookings--li--ref">
                Ref: {booking.reference}
            </div>
            <div className="user--bookings--li--dateStaying">
                {dateStaying}
            </div>
            {!showBooking && <div className="user--bookings--li--campingFacility">
                {booking.space.name}
            </div>}

            {showBooking && <div className="user--bookings--li--state">
                Booking state: {booking.state}
            </div>}
            {showBooking && <div className="user--bookings--li--campingSite">
                Camping Site: {booking.space.name}
            </div>}
            {showBooking && <div className="user--bookings--li--children">
                Children: {booking.children}
            </div>}
            {showBooking && <div className="user--bookings--li--dogs">
                Dogs: {booking.dogs}
            </div>}
            {showBooking && <div className="user--bookings--li--firePit">
                Firepit: {booking.firePit}
            </div>}
            {showBooking && <div className="user--bookings--li--gazebo">
                Gazebos: {booking.gazebo}
            </div>}
            {showBooking && <div className="user--bookings--li--additionalCars">
                Car allowance: {booking.additionalCars}
            </div>}
            {showBooking && <div className="user--bookings--li--dateCreated">
                Date booking was created: {configureDateBookingCreated()}
            </div>}
            {showBooking && <div className="user--bookings--li--cost">
                Cost: {booking.cost}
            </div>}



            <div className="user--bookings--li--details" onClick={generateDetails}>
                {detailsState}
            </div>
        </li>
        
    )
}


export default UserBooking;