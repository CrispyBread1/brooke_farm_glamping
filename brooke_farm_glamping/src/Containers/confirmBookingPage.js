import React from "react";
import { useState, useEffect, useLocation } from "react";




const ConfirmBookingPage = ({user, booking}) => {

    const [bookingInfo, setBookingInfo] = useState(booking)
    const location = useLocation();
    
    useEffect(() => {
        
        console.log(booking)
        const queryParams = new URLSearchParams(location.search);
        const data = queryParams.get("data");
  
    // Parse the JSON string back into an object
        setBookingInfo(data ? JSON.parse(decodeURIComponent(data)) : {})
  
    }, [])

    

    return (
        <>
            <p>i am going to confirm your booking here slag</p>
            <ul> {booking && <li>{bookingInfo} </li>}</ul>
        </>
    )
}


export default ConfirmBookingPage;