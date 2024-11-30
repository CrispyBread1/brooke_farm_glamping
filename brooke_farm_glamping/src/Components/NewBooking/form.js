import React from "react";
import { addBooking } from "../../Scripts/databaseControls/bookingControls";
import Booking from "../../Classes/booking";
import { useState, useEffect } from "react"
import Adults from "./Parts/adults";
import Children from "./Parts/children";
import Dogs from "./Parts/dogs";
import FirePits from "./Parts/firePits";
import Gazebo from "./Parts/gazego";
import AdditionalCars from "./Parts/additionalCars";
import NightsStaying from "./Parts/nightsStaying";
import CampingOptions from "./Parts/campingOptions";
import DateChosen from "./Parts/dateChosen";
import PriceGuide from "./Parts/priceGuide";
import ReasonForBooking from "./Parts/reasonForBooking";
import OverallCost from "./Parts/overallCost";

const BookingForm = ({selectedDate, months, nthNumber, user}) => {

    const [dateChosen, setDateChosen] = useState(selectedDate)

    const [nights, setNights] = useState(1)

    const [campingSpotsNeeded, setCampingSpotsNeeded] = useState(1)
    const [campingPitchChoice, setCampingPitchChoice] = useState(null)

    const [peopleAmount, setPeopleAmount] = useState(1)

    const [firePit, setFirePit] = useState(false)
    const [pricesArrayPerNightPerSpot, setPricesArrayPerNightPerSpot] = useState([])

    const [submittedWithoutCampsite, setSubmittedWithoutCampsite] = useState(false)
    const [submittedWithoutReason, setSubmittedWithoutReason] = useState(false)
    const [submittedWithoutDates, setSubmittedWithoutDates] = useState(false)
    

    const configureBookingReference = () => {
        return ('RF' + 
            campingPitchChoice.name[0] + 
            campingPitchChoice.name[(campingPitchChoice.name.length - 1)] + 
            new Date().getDay() + 
            user.fullName[0] + 
            user.fullName[(user.fullName.length - 1)] +
            (new Date().getDate())
        ).toUpperCase()
    }



     // Functions to control submitting the form and booking *------------- *------------- *-------------
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        const value = evt.target
        if (checkFilled(evt)) {
            addNewBooking(
                value.datesStaying.value, 
                value.children.value, 
                value.dogAmount.value, 
                value.gazeboAmount.value, 
                value.additionalCarAmount.value, 
                value.costOfStay.value, 
                value.reason.value
            )
        }
    }

    const checkFilled = (data) => {

        if (!campingPitchChoice) {
            setSubmittedWithoutCampsite(true)
        }
        if (!data.target.reason.value) {
            setSubmittedWithoutReason(true)
        }
        if (!data.target.datesStaying.value) {
            setSubmittedWithoutDates(true)
        }
        if (campingPitchChoice && data.target.reason.value && data.target.datesStaying.value) {
            return true
        } return false
    }
    
    const addNewBooking = async (datesStaying, childrenAmount, dogAmount, gazeboAmount, additionalCarAmount, costOfStay, reasonForBooking) => {
        var booking =   new Booking(
                'draft',
                user.id,
                user.fullName,
                configureBookingReference(),
                peopleAmount,
                campingPitchChoice,
                datesStaying,
                nights,
                childrenAmount,
                dogAmount,
                firePit,
                gazeboAmount,
                additionalCarAmount,
                costOfStay,
                true,
                reasonForBooking,
                new Date()
        )
        try {
            addBooking(booking)
            .then((res) => {
                // setBookingID(res)
                // addBookingToUser(res.id, userObj.id)
            })
        } catch (error) {
            console.error('Error adding booking:', error);
        }
    }


    return (
        <div id="booking-box">
            
            <form onSubmit={handleFormSubmit}>
            <h2 id="get-month"></h2>
            
                {user.admin && <DateChosen setDateChosen={setDateChosen} dateChosen={dateChosen} submittedWithoutDates={submittedWithoutDates} setSubmittedWithoutDates={setSubmittedWithoutDates}/>}

                <NightsStaying dateChosen={dateChosen} months={months} nthNumber={nthNumber} setNights={setNights} nights={nights}/>

                <Adults peopleAmount={peopleAmount} setPeopleAmount={setPeopleAmount} campingSpotsNeeded={campingSpotsNeeded} setCampingSpotsNeeded={setCampingSpotsNeeded}/>
                
                <CampingOptions dateChosen={dateChosen} nights={nights} campingSpotsNeeded={campingSpotsNeeded} setCampingPitchChoice={setCampingPitchChoice} submittedWithoutCampsite={submittedWithoutCampsite} setSubmittedWithoutCampsite={setSubmittedWithoutCampsite}/>

                <Children/>

                <Dogs/>

                <FirePits firePit={firePit} setFirePit={setFirePit}/>

                <Gazebo/>
                
                <AdditionalCars/>

                <ReasonForBooking submittedWithoutReason={submittedWithoutReason} setSubmittedWithoutReason={setSubmittedWithoutReason}/>

                <PriceGuide campingPitchChoice={campingPitchChoice} campingSpotsNeeded={campingSpotsNeeded} pricesArrayPerNightPerSpot={pricesArrayPerNightPerSpot}/>

                <OverallCost nights={nights} campingPitchChoice={campingPitchChoice} peopleAmount={peopleAmount} firePit={firePit} campingSpotsNeeded={campingSpotsNeeded} setPricesArrayPerNightPerSpot={setPricesArrayPerNightPerSpot}/>
     
            <button
            id="post-button"
            type="submit"
            style={{ width: "60px", height: "100px" }}
            >Submit
            </button>
            </form>
        </div>
    )

};

export default BookingForm