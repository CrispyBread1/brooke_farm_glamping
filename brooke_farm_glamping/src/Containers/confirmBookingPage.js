import React from "react";
import { useState, useEffect } from "react";
import { useLocation, redirect, useNavigate } from "react-router-dom";




const ConfirmBookingPage = ({}) => {

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
        
        manageDates()

    }, [bookingInfo])

    const manageDates = () => {
        // console.log(bookingInfo.datesStaying)
        var arrivalDate = bookingInfo.datesStaying[0]
        console.log(arrivalDate)
        // setDatesStaying(arrivalDate.getDate() + bookingInfo.datesStaying[bookingInfo.datesStaying.length].getDate())
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
            <p>i am going to confirm your booking here slag</p>
            <h1>{datesStaying}</h1>
            {bookingInfo && <ul> 
                <li>People staying: {bookingInfo.adults} </li>
                <li>Camping pitch choice: {bookingInfo.campingSite.name} </li>
                {bookingInfo && <li>{bookingInfo.adults} </li>}
                {bookingInfo && <li>{bookingInfo.adults} </li>}
                
            </ul>}
        </>
    )
}


export default ConfirmBookingPage;