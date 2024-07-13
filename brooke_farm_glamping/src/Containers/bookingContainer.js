import BookingBox from "../Components/bookingBox";
import React, { useEffect, useState }  from "react";
import './bookingContainer.css'


const BookingContainer = ({bookingBoxOpen}) => {

    const [booking, setBooking] = useState(bookingBoxOpen)

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
        console.log(booking)
    }, [])

    const clearBookingInformation = () => {
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

    const handleNightsChange = (evt) => {
        setNights(evt.target.value);
    }

    const handleAdultsChange = (evt) => {
        setPeopleAmount(evt.target.value)
    }

    return (
        <div id="booking-box">
            {/* <BookingBox/> */}
            <form onSubmit={handleFormSubmit}>
                <input
                type="number"
                placeholder="number"
                value={nights}
                onChange={handleNightsChange}
                />
                <input
                className="adults"
                type="number"
                value={peopleAmount}
                onChange={handleAdultsChange}
                />
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