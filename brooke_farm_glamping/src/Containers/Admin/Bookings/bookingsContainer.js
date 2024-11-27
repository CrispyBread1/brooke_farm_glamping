import React from "react";
import { useEffect, useState } from "react";
import { retrieveActiveBookings } from "../../../Scripts/databaseControls/bookingControls";
import AdminDisplayBookingsContainer from "./displayBookingsContainer";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retrieveUser } from "../../../Scripts/databaseControls/userControls";
import NewBooking from "../../../Components/Admin/Bookings/newBooking";
import BookingForm from "../../../Components/NewBooking/form";



const AdminBookingsContainer = ({daysOfWeek, months, nthNumber}) => {

    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = () => {
        const auth = getAuth()
          onAuthStateChanged(auth, (doc) => {
            if (doc) {
                retrieveUser(doc.uid)
                .then((res) => {
                setUser(res)
            })
          } else {
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
    const [activeBookings, setActiveBookings] = useState(null)
    const [addNewBooking, setAddNewBooking] = useState(false)
    

    useEffect(() => {
        fetchActiveBookings()
    }, [user]);

    const fetchActiveBookings = () => {
        retrieveActiveBookings()
        .then((res) => {
            setActiveBookings(res)
            // console.log(res)
        })
    }

    const setNewBooking = () => {
        if (addNewBooking) {
            setAddNewBooking(false)
        } else setAddNewBooking(true)
    }

    

   

    return (
        <>
            <h3>Bookings:</h3>

            {!addNewBooking && <button className="add-New-Booking" onClick={setNewBooking} style={{ width: "9rem", height: "1.5rem" }} type="button">Add new Booking</button>}            
            {addNewBooking && <button className="cancel-New-Booking" onClick={setNewBooking} style={{ width: "9rem", height: "1.5rem" }} type="button">Cancel</button>}
            
            {!addNewBooking && <AdminDisplayBookingsContainer daysOfWeek={daysOfWeek} months={months} bookings={activeBookings} nthNumber={nthNumber} user={user}/>}

            {addNewBooking && <BookingForm months={months} nthNumber={nthNumber} user={user} /> }

        </>
    )
}


export default AdminBookingsContainer;