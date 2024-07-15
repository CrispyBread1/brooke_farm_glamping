import BookingBox from "../Components/bookingBox";
import React, { useEffect, useState }  from "react";
import './bookingContainer.css'


const BookingContainer = ({bookingBoxOpen, dateObject, daysOfWeek, months}) => {

    const [booking, setBooking] = useState(false)
    const [dateSelected, setDateSelected] = useState(dateObject)

    const [nights, setNights] = useState(1)
    const [accomodation, setAccomodation] = useState([])
    const [pitchesAmount, setPitchesAmount] = useState([])
    const [date, setDate] = useState('') // Maybe? mihght just pass through from calender container
    const [peopleAmount, setPeopleAmount] = useState(1)
    const [childrenAmount, setChildrenAmount] = useState(0)
    // const [infantsAmount, setInfantsAmount] = useState(0)
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
        // setInfantsAmount(0)
        setDogAmount(0)
    }

    const getDateandOrdinalNumber = () => {
        // console.log(dateObject)
        if (dateSelected) {
            return dateObject.getDate() + nthNumber(dateObject.getDate())
            // console.log('true')
        } else return 'false'
    }

    

    // Handles the ordinal numbers for the date *------------- *-------------
    const nthNumber = (number) => {
        if (number > 3 && number < 21) return "th";
        switch (number % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };

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

     // Functions to control amount of  users' children wanting to stay *------------- *-------------
     const addChildren = () => {
        setChildrenAmount(childrenAmount + 1)
    }
    const removeChildren = () => {
        if (childrenAmount > 0) {
            setChildrenAmount(childrenAmount - 1)
        }
    }

     // Functions to control amount of  users' children wanting to stay *------------- *-------------
     const addDogs = () => {
        setDogAmount(dogAmount + 1)
    }
    const removeDogs = () => {
        if (dogAmount > 0) {
            setDogAmount(dogAmount - 1)
        }
    }

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        return;
    }

    




    return (
        <div id="booking-box">

            <h1>Date: {getDateandOrdinalNumber()}</h1>
            
            <form onSubmit={handleFormSubmit}>

                {/* Night amount user wants to stay *------------- *------------- */}
                <label for="html">Amount of nights staying</label>
                <br></br>
                <button id="add-night" onClick={addNight} style={{ width: "2vw", height: "2vw" }}>+</button>
                <input
                className="nights"
                type="text"
                placeholder="number"
                value={nights}
                readOnly
                style={{ width: "4vw", height: "4vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="remove-night" onClick={removeNight} style={{ width: "2vw", height: "2vw" }}>-</button>
                <br></br>

                {/* Amount of users that want to stay *------------- *------------- */}
                <label for="html">Amount of adults staying</label>
                <br></br>
                <button id="add-guest" onClick={addGuest} style={{ width: "2vw", height: "2vw" }}>+</button>
                <input
                className="adults"
                type="text"
                placeholder="number"
                value={peopleAmount}
                readOnly
                style={{ width: "4vw", height: "4vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="remove-guest" onClick={removeGuest} style={{ width: "2vw", height: "2vw" }}>-</button>
                <br></br>

                {/* Amount of users' children that want to stay *------------- *------------- */}
                <label for="html">Amount of children staying</label>
                <br></br>
                <button id="add-children" onClick={addChildren} style={{ width: "2vw", height: "2vw" }}>+</button>
                <input
                className="children"
                type="text"
                placeholder="number"
                value={childrenAmount}
                readOnly
                style={{ width: "4vw", height: "4vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="remove-children" onClick={removeChildren} style={{ width: "2vw", height: "2vw" }}>-</button>
                <br></br>

                {/* Amount of dogs that want to stay *------------- *------------- */}
                <label for="html">Amount of dogs staying</label>
                <br></br>
                <button id="add-dogs" onClick={addDogs} style={{ width: "2vw", height: "2vw" }}>+</button>
                <input
                className="dogs"
                type="text"
                placeholder="number"
                value={dogAmount}
                readOnly
                style={{ width: "4vw", height: "4vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="remove-dogs" onClick={removeDogs} style={{ width: "2vw", height: "2vw" }}>-</button>
                <br></br>

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