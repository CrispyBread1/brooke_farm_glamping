import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retrieveUser } from "../../Scripts/databaseControls/userControls";
import { addBooking, editBooking, cancelBooking, retrieveUserBooking } from "../../Scripts/databaseControls/bookingControls";
import { useNavigate } from "react-router-dom";
import UserBookingsContainer from "./userBookingsContainer";
import BookingDetails from "../../Components/AccountPage/bookingDetails";

const AccountContainer = ({userLoggedOut, daysOfWeek, months, nthNumber}) => {

    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = () => {
        const auth = getAuth();
          onAuthStateChanged(auth, (doc) => {
            if (doc) {
                retrieveUser(doc.uid)
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

    const [user, setUser] = useState({})
    const [bookings, setBookings] = useState(null)
    const [bookingsHTMLArray, setBookingsHTMLArray] = useState(null)

    const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false)
    const [bookingForDetails, setBookingForDetails] = useState(null)

    

    const fetchUserBookings = (bookingIDs) => {
        retrieveUserBooking(bookingIDs)
        .then((res) => {
            setBookings(res.sort((a, b) => b.dateBookingCreated - a.dateBookingCreated))
            
        })
    }



    const showDetails = (booking) => {
        // setBookingForDetails(booking)
        // setBookingDetailsOpen(true);
        // if (!bookingDetailsOpen) {
        //     const sidebar = document.querySelector('.details-container');
        // if (bookingDetailsOpen) {
        //     sidebar.classList.remove('show');
        // } else {
        //     sidebar.classList.add('show');
        // }}
    }


    return (
        <div>
            <h2>{user.fullName}'s' Account page</h2>
            <div>
                <UserBookingsContainer daysOfWeek={daysOfWeek} months={months} bookings={bookings} nthNumber={nthNumber}/>
            </div>
        </div>
    )
}

export default AccountContainer