import React from "react";
import './bookingBox.css'
import { useState } from "react";



const BookingBox = ({}) => {

    const [nights, setNights] = useState(1)
    const [accomodation, setAccomodation] = useState([])
    const [pitchesAmount, setPitchesAmount] = useState([])
    const [date, setDate] = useState('') // Maybe? mihght just pass through from calender container
    const [peopleAmount, setPeopleAmount] = useState(1)
    const [childrenAmount, setChildrenAmount] = useState(0)
    const [infantsAmount, setInfantsAmount] = useState(0)
    const [dogAmount, setDogAmount] = useState(0)

    return (
        <>
            <p>Hello sexy</p>
      
        </>
    )
}


export default BookingBox;