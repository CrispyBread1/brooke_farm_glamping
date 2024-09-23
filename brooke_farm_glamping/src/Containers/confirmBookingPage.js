import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";




const ConfirmBookingPage = ({user}) => {
    const location = useLocation()

    const [bookingInfo, setBookingInfo] = useState(location.state)
    
    
    // var booking = ()
    // useEffect(() => {
        
    //     console.log(booking)
    //     const queryParams = new URLSearchParams(location.search);
    //     const data = queryParams.get("data");
  
    // // Parse the JSON string back into an object
    //     setBookingInfo(data ? JSON.parse(decodeURIComponent(data)) : {})
  
    // }, [])

    

    return (
        <>
            <p>i am going to confirm your booking here slag</p>
            <ul> {bookingInfo && <li>{bookingInfo.adults} </li>}</ul>
        </>
    )
}


export default ConfirmBookingPage;