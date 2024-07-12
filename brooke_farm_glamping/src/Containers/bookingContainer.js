import BookingBox from "../Components/bookingBox";
import React, { useEffect, useState }  from "react";
import './bookingContainer.css'


const BookingContainer = ({bookingBoxOpen}) => {

    const [openBox, setOpenBox] = useState(bookingBoxOpen);

    useEffect(() => {

        if (openBox) {
             openBookingBox()
        }

    }, [openBox]);

    const openBookingBox = () => {

    }

    return (
        <div id="booking-box">
            <BookingBox/>
        </div>
    )
}

export default BookingContainer;