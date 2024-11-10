import React from "react";
import { useState, useEffect } from "react";
import { useLocation, redirect, useNavigate } from "react-router-dom";
import Booking from "../../Classes/booking";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retrieveUser, addBookingToUser } from "../../Scripts/databaseControls/userControls";
import { addBooking, editBooking, cancelBooking, retrieveUserBooking } from "../../Scripts/databaseControls/bookingControls";



const ConfirmBookingPage = ({months, daysOfWeek, nthNumber, userLoggedOut}) => {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        checkState()
        checkAuth()
    }, [])

    const checkState = () => {
        if (!location.state){
            navigate("/");
        }
    }

    const checkAuth = () => {
        const auth = getAuth();
          onAuthStateChanged(auth, (doc) => {
            if (doc) {
            retrieveUser(doc.uid)
              .then((res) => setUserObj(res))
            //   console.log(user)
          } else {
            userLoggedOut()
            toLogIn()
          }
        });
    }

    const toLogIn = () => {
            navigate('/login')
    }

    const [bookingInfo, setBookingInfo] = useState(location.state)
    const [priceGuide, setPriceGuide] = useState([])
    const [userObj, setUserObj] = useState({})
    const [bookingID, setBookingID] = useState(null)

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



    const configureBookingReference = () => {
        return ('RF' + 
            bookingInfo.campingSite.name[0] + 
            bookingInfo.campingSite.name[(bookingInfo.campingSite.name.length - 1)] + 
            new Date().getDay() + 
            userObj.fullName[0] + 
            userObj.fullName[(userObj.fullName.length - 1)] +
            new Date().getDate()
        ).toUpperCase()
    }


    const addNewBooking = async () => {
        var booking =   new Booking(
                'draft',
                userObj.id,
                userObj.fullName,
                configureBookingReference(),
                bookingInfo.adults,
                bookingInfo.campingSite,
                bookingInfo.datesStaying,
                bookingInfo.nights,
                bookingInfo.children,
                bookingInfo.dogs,
                bookingInfo.firePit,
                bookingInfo.gazebo,
                bookingInfo.additionCars,
                bookingInfo.cost,
                'No notes',
                new Date()
        )
        try {
            addBooking(booking)
            .then((res) => {
                setBookingID(res)
                addBookingToUser(res.id, userObj.id)
            })
        } catch (error) {
            console.error('Error adding booking:', error);
          }
    }

    

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

                <div id="price-guide">
                    <>
                        <h3>Price guide:</h3>
                        <ul id="price-guide-list">
                            {bookingInfo.campingSiteAmount > 1 && <b><li className="ui-label">{bookingInfo.campingSiteAmount} Camping spots are needed for your party size</li></b>}  
                            {priceGuide}
                        </ul>
                    </>
                </div>

                <br></br>
                <h1><li>Cost of Stay: £{bookingInfo.cost} </li></h1>
                
            </ul>
            </div>}


            <button onClick={addNewBooking}>Continue to payment</button>
        </>
    )
}


export default ConfirmBookingPage;