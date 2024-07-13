import BookingBox from "../Components/bookingBox";
import React, { useEffect, useState }  from "react";
import './bookingContainer.css'


const BookingContainer = ({bookingBoxOpen}) => {

    const [booking, setBooking] = useState(false)

    const [nights, setNights] = useState(1)
    const [accomodation, setAccomodation] = useState([])
    const [pitchesAmount, setPitchesAmount] = useState([])
    const [date, setDate] = useState('') // Maybe? mihght just pass through from calender container
    const [peopleAmount, setPeopleAmount] = useState(1)
    const [childrenAmount, setChildrenAmount] = useState(0)
    const [infantsAmount, setInfantsAmount] = useState(0)
    const [dogAmount, setDogAmount] = useState(0)

    useEffect(() => { // Renders when bookings have come through
        if (!booking) {
            clearBookingInformation()
        }
        // console.log(booking)
    }, [booking])

    const clearBookingInformation = () => {
        // console.log('in clearBookingInformation function')
        setNights(1)
        setAccomodation([])
        setPitchesAmount([])
        setDate('')
        setPeopleAmount(1)
        setChildrenAmount(0)
        setChildrenAmount(0)
        setInfantsAmount(0)
        setDogAmount(0)
    }

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        return;
    }

    // Functions to control amount of nights users wanting to stay *------------- *-------------
    const addNight = () => {
        setNights(nights + 1)
    }
    const removeNight = () => {
        if (nights > 1) {
            setNights(nights - 1)
        }
    }

     // Functions to control amount of  users wanting to stay *------------- *-------------
     const addGuest = () => {
        setPeopleAmount(peopleAmount + 1)
    }
    const removeGuest = () => {
        if (peopleAmount > 1) {
            setPeopleAmount(peopleAmount - 1)
        }
    }

    const handleNightsChange = (evt) => {
        var value = evt.target.value
        if (Number.isInteger(value)) {
            setNights(evt.target.value);
        } else {
            console.log(Number.isInteger(value))
        }
        
    }

    const handleAdultsChange = (evt) => {
        setPeopleAmount(evt.target.value)
    }




    return (
        <div id="booking-box">
            
            <form onSubmit={handleFormSubmit}>

                {/* Night amount user wants to stay *------------- *------------- */}
                <button id="add-night" onClick={addNight}>+</button>
                <input
                type="text"
                placeholder="number"
                value={nights}
                onChange={handleNightsChange}
                readonly
                />
                <button id="remove-night" onClick={removeNight}>-</button>
                <br></br>

                {/* Amount of users that want to stay *------------- *------------- */}
                <button id="add-guest" onClick={addGuest}>+</button>
                <input
                className="adults"
                type="number"
                value={peopleAmount}
                onChange={handleAdultsChange}
                readonly
                />
                <button id="remove-guest" onClick={removeGuest}>-</button>

            <button
            id="post-button"
            type="submit"
            style={{ width: "60px", height: "100px" }}
            >Submit
            </button>
            </form>
        </div>
    )
}

export default BookingContainer;