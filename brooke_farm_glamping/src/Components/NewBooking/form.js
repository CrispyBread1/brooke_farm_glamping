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

const BookingForm = ({months, nthNumber, user}) => {

    const [dateChosen, setDateChosen] = useState(null)

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
        
        if (!evt.target.campingPitchChoice) {
            setSubmittedWithoutCampsite(true)
        }
        if (!evt.target.reasonForBooking) {
            setSubmittedWithoutReason(true)
        }
        if (!evt.target.datesStaying.value) {
            setSubmittedWithoutDates(true)
            // console.log("nothere")
        }
        
        // console.log(evt.target.datesStaying.value.split(','))

        // if(!datesStaying) {
        //     createDateStaying()
        // }


        // fillBookingInformation(booking)

        //     if (reasonForBooking) {
        //         setSubmittedWithoutReason(false)
        //         addNewBooking()
        //     } else setSubmittedWithoutReason(true)
              
        // } else  setSubmittedWithoutCampsite(true)
    }  

    const checkCampsite = (data) => {

    }
    
    const addNewBooking = async () => {
        var booking =   new Booking(
                'draft',
                user.id,
                user.fullName,
                configureBookingReference(),
                peopleAmount,
                campingPitchChoice,
                // datesStaying,
                nights,
                // childrenAmount,
                // dogAmount,
                firePit,
                // gazeboAmount,
                // additionalCarAmount,
                // costOfStay,
                true,
                // reasonForBooking,
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
            
                <DateChosen setDateChosen={setDateChosen} dateChosen={dateChosen} submittedWithoutDates={submittedWithoutDates} setSubmittedWithoutDates={setSubmittedWithoutDates}/>

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