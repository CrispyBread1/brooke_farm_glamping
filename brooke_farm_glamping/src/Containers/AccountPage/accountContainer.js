import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retreiveUser } from "../../Scripts/databaseControls/userControls";
import { addBooking, editBooking, cancelBooking, retrieveUserBooking } from "../../Scripts/databaseControls/bookingControls";
import { useNavigate } from "react-router-dom";
import UserBookingsContainer from "./userBookingsContainor";

const AccountContainer = ({userLoggedOut, daysOfWeek, months}) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [bookings, setBookings] = useState(null)
    const [bookingsHTMLArray, setBookingsHTMLArray] = useState(null)

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        // configurePreviouseBookings()
        // console.log(bookings)
    }, [bookings])

    const checkAuth = () => {
        const auth = getAuth();
          onAuthStateChanged(auth, (doc) => {
            if (doc) {
              retreiveUser(doc.uid)
              .then((res) => {
                setUser(res)
                // console.log(res.bookings)
                fetchUserBookings(res.bookings)
            })
              
          } else {
            userLoggedOut()
            toLogIn()
          }
        });
    }

    const toLogIn = () => {
        setTimeout(() => {
            navigate('/login')
            }, 1000)
    }

    const fetchUserBookings = (bookingIDs) => {
        retrieveUserBooking(bookingIDs)
        .then((res) => {
            setBookings(res.sort((a, b) => b.dateBookingCreated - a.dateBookingCreated))
            
        })
    }

    // const configurePreviouseBookings = () => {
    //     var bookingsArray = []

    //         for (let i = 0; i < bookings.length; i++) {
    //             pricesArray.push(
    //                 <div key={i + "booking"}>
    //                 <li key={i + "camping-choice"}> {bookingInfo.campingSite.name} x {bookingInfo.nights} Nights = £{configurePriceDependingOnDays(bookingInfo.campingSite.price)} </li>
    //                 {bookingInfo.firePit && <li key={i + "firepit"}>£10 per night, per pitch</li>}
    //                 </div >
    //             )
    //         }
    //     setPriceGuide(pricesArray)
    // }


    return (
        <div>
            <h2>{user.fullName}'s' Account page</h2>
        <div>
            <UserBookingsContainer daysOfWeek={daysOfWeek} months={months} bookings={bookings}/>
        </div>
        </div>
    )
}

export default AccountContainer