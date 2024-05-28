import React from "react";

const BookingPage = ({newBooking, user}) => {

    // var userAc = ''

    // if (user) {
    //     userAc = user.user
    // }

    const addBooking = () => {
        newBooking()
    }

    const checkUserGotThrough = () => {
        console.log(user)
    }

    // const userEmail = () => {
    //     return <p>{`${user.user.email}`}</p>
    // }

    return (
    <div>
        <p>Booking page</p>

        <div id="Add-booking"  onClick={addBooking} value="addBooking">Add Booking</div>
        <div onClick={checkUserGotThrough}>User email: {`${user}`}</div>

    </div>
 )
}

export default BookingPage