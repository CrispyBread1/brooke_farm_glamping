import React from "react";

const BookingPage = ({newBooking}) => {

 
    const addBooking = () => {
        newBooking()
    }

    return (
    <div>
        <p>Booking page</p>

        <div id="Add-booking"  onClick={addBooking} value="addBooking">Add Booking</div>

    </div>
 )
}

export default BookingPage