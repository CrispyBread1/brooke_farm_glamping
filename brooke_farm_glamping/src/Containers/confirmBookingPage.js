import React from "react";
import { useState, useEffect } from "react";
import { useLocation, redirect, useNavigate } from "react-router-dom";




const ConfirmBookingPage = ({user, months, daysOfWeek, nthNumber}) => {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        checkState()
    }, [])

    const checkState = () => {
        if (!location.state){
            navigate("/");
        }
    }

    const [bookingInfo, setBookingInfo] = useState(location.state)
    const [datesStaying, setDatesStaying] = useState(null)
    
    

    useEffect(() => {
        if (location.state) {
            manageDates()
        }

    }, [bookingInfo])

    const manageDates = () => {
        // console.log(bookingInfo.datesStaying)
        var arrivalDate = bookingInfo.datesStaying[0]
        var leavingDate = bookingInfo.datesStaying[(bookingInfo.datesStaying.length - 1)]
        // console.log(arrivalDate)
        setDatesStaying(months[arrivalDate.getMonth()].month + " " + arrivalDate.getDate() + nthNumber(arrivalDate.getDate()) + " - until - " + months[leavingDate.getMonth()].month + " " + leavingDate.getDate() + nthNumber(arrivalDate.getDate()))
    }

    // ar booking = {
    //     'datesStaying': datesStaying, //mandatory
    //     'campingSite': campingPitchChoice, //mandatory
    //     'campingSiteAmount': multipleCampingSpots, //mandatory
    //     'adults': peopleAmount, //mandatory
    //     'children': childrenAmount,
    //     'dogs': dogAmount,
    //     'firePit': firePit, 
    //     'gazebo': gazeboAmount,
    //     'additionCars': additionalCarAmount,
    //     'cost': costOfStay
    // }


    

    

    return (
        <>
            {bookingInfo && 
            <div>
            <h1>{datesStaying}</h1>
            <ul> 
                <li>People staying: {bookingInfo.adults} </li>
                <li>Camping pitch choice: {bookingInfo.campingSite.name} </li>
                {bookingInfo && <li>{bookingInfo.adults} </li>}
                {bookingInfo && <li>{bookingInfo.adults} </li>}
                
            </ul>
            </div>}
        </>
    )
}


export default ConfirmBookingPage;