import React, { useEffect, useState } from "react";
import './userBooking.css'
import { checkInBooking, retrieveBooking } from "../../Scripts/databaseControls/bookingControls";



const UserBooking = ({months, bookingID, booking, nthNumber, user}) => {

    const [userBooking, setUserBooking] = useState(booking)
    const [dateStaying, setDateStaying] = useState(null)
    const [showBooking, setShowBooking] = useState(false)
    const [detailsState, setDetailsState] = useState('Details')
    const [firstNight, setFirstNight] = useState(null)
    const [lastNight, setLastNight] = useState(null)

    useEffect(() => {
        configureNights()
    }, [])

    useEffect(() => {
        configureTitle()
    }, [firstNight, lastNight])

    const configureNights = () => {
        if (Array.isArray(userBooking.date)) {
            setFirstNight(userBooking.date[0].toDate())
            setLastNight(userBooking.date[(userBooking.date.length - 1)].toDate())
        } else {
            const dateObj = new Date(userBooking.date)
            setFirstNight(dateObj)
            setLastNight(new Date(dateObj.getFullYear(), dateObj.getMonth(), (dateObj.getDate() + 1)))
        }
        // console.log(userBooking.date.length)
        // let firstNight = (userBooking.date[0].toDate())
        // let lastNight = (userBooking.date[(userBooking.date.length - 1)].toDate())
        // console.log("firstNight: " + firstNight)
        // console.log("lastNight: " + lastNight)
    }

    const configureTitle = () => {
        if (firstNight && lastNight) {
            setDateStaying(months[firstNight.getMonth()].month + ': ' + firstNight.getDate() + nthNumber(firstNight.getDate()) + ' - ' + months[lastNight.getMonth()].month + ': ' +  lastNight.getDate() + nthNumber(lastNight.getDate()) + ' / ' + firstNight.getFullYear()) 
        }
    }

    const configureDateBookingCreated = () => {
        var bookingCreated = userBooking.dateBookingCreated.toDate()
        return (
            bookingCreated.getDate() + '/' + bookingCreated.getMonth() + '/' + bookingCreated.getFullYear()
        )
    }

    const configureCars = () => {
        return (
            userBooking.additionCars + 1
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
    
    const checkInUser = () => {
        if (user.admin) {
            checkInBooking(bookingID)
            .then(() => {
                retrieveBooking(bookingID)
                .then((res) => {
                    setUserBooking(res)
                })
            })
        }
    }


    return (
       
        <li className="user--bookings--li">
            <div className="user--bookings--li--ref">
                Ref: {userBooking.reference}
            </div>
            <div className="user--bookings--li--dateStaying">
                {dateStaying}
            </div>
            {!showBooking && <div className="user--bookings--li--campingFacility">
                {userBooking.space.name}
            </div>}

            {showBooking && <div className="user--bookings--li--state">
                userBooking state: {userBooking.state}
            </div>}
            {showBooking && <div className="user--bookings--li--campingSite">
                Camping Site: {userBooking.space.name}
            </div>}
            {showBooking && userBooking.children > 0 && <div className="user--bookings--li--children">
                Children: {userBooking.children}
            </div>}
            {showBooking && userBooking.dogs > 0 && <div className="user--bookings--li--dogs">
                Dogs: {userBooking.dogs}
            </div>}
            {showBooking && userBooking.firePit && <div className="user--bookings--li--firePit">
                Firepit: {userBooking.firePit}
            </div>}
            {showBooking && userBooking.gazebo > 0 && <div className="user--bookings--li--gazebo">
                Gazebos: {userBooking.gazebo}
            </div>}
            {showBooking && <div className="user--bookings--li--additionalCars">
                Car allowance: {configureCars()}
            </div>}
            {showBooking && <div className="user--bookings--li--dateCreated">
                userBooking created: {configureDateBookingCreated()}
            </div>}
            {showBooking && <div className="user--bookings--li--cost">
                Cost: {userBooking.cost}
            </div>}



            <div className="user--bookings--li--details" onClick={generateDetails}>
                {detailsState}
            </div>

            {!userBooking.checkedIn && user.admin && <div className="user--bookings--li--admin--check-in">
                <button className="admin-check-in" onClick={checkInUser} style={{ width: "9rem", height: "1.5rem" }} type="button">Check In</button>
            </div>}
            {userBooking.checkedIn && user.admin && <div className="user--bookings--li--admin--check-in--true">
                Checked In
            </div>}
        </li>
        
    )
}


export default UserBooking;