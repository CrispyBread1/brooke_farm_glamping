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
    const [priceGuide, setPriceGuide] = useState([])

    const [datesStaying, setDatesStaying] = useState(null)
    
    useEffect(() => {
        if (bookingInfo) {
            manageDates()
            configureAmountOfCampingPitchesPrice()
        }

    }, [bookingInfo])

    const configureAmountOfCampingPitchesPrice = () => {
        var pricesArray = []
            for (let i = 0; i < bookingInfo.campingSiteAmount; i++) {
                pricesArray.push(
                    <div key={i + "camping-choice-div"}>
                    <li key={i + "camping-choice"}> {bookingInfo.campingSite.name} x {bookingInfo.nights} Nights = £{configurePriceDependingOnDays(bookingInfo.campingSite.price)} </li>
                    {bookingInfo.firePit && <li key={i + "firepit"}>£10 per night, per pitch</li>}
                    </div >
                )
            }
        setPriceGuide(pricesArray)
    }
    const configurePriceDependingOnDays = (cost) => {
        return cost * bookingInfo.nights
    }

    const manageDates = () => {
        var arrivalDate = bookingInfo.datesStaying[0]
        var leavingDate = bookingInfo.datesStaying[(bookingInfo.datesStaying.length - 1)]
        setDatesStaying(months[arrivalDate.getMonth()].month + " " + arrivalDate.getDate() + nthNumber(arrivalDate.getDate()) + " - until - " + months[leavingDate.getMonth()].month + " " + leavingDate.getDate() + nthNumber(arrivalDate.getDate()))
    }

    // ar booking = {
    //     'datesStaying': datesStaying, //mandatory --
    //     'campingSite': campingPitchChoice, //mandatory --
    //     'campingSiteAmount': multipleCampingSpots, //mandatory --
    //     'adults': peopleAmount, //mandatory --
    //     'children': childrenAmount, -- 
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
                {bookingInfo.campingSiteAmount > 1 && <li>Camping pitches needed: {bookingInfo.campingSiteAmount} </li>}
                {bookingInfo.children > 0 && <li>Kids: {bookingInfo.children} </li>}
                {bookingInfo.dogs > 0 && <li>Dogs: {bookingInfo.dogs} </li>}
                {bookingInfo.firePit && <li>Firepit: Selected </li>}
                {bookingInfo.gazebo > 0 && <li>Gazebo(s): {bookingInfo.gazebo} </li>}
                {bookingInfo.additionCars > 0 && <li>Additional Cars: {bookingInfo.additionCars} </li>}
                {priceGuide}
                <li>Cost of Stay: £{bookingInfo.cost} </li>
                
            </ul>
            </div>}


            <button>Continue to payment</button>
        </>
    )
}


export default ConfirmBookingPage;