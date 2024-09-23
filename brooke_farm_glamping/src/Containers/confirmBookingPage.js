import React from "react";
import { useState, useEffect } from "react";
import { useLocation, redirect, useNavigate } from "react-router-dom";




const ConfirmBookingPage = ({user}) => {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // console.log(location.state)
        checkState()
        // loader()
    }, [])
    
    const checkState = () => {
        if (!location.state){
            navigate("/");
        }
    }

    

    const [bookingInfo, setBookingInfo] = useState(location.state)

    

    return (
        <>
            <p>i am going to confirm your booking here slag</p>
            <ul> {bookingInfo && <li>{bookingInfo.adults} </li>}</ul>
        </>
    )
}


export default ConfirmBookingPage;