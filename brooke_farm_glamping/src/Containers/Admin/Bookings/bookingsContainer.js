import React from "react";
import { useEffect, useState } from "react";
import { retrieveActiveBookings } from "../../../Scripts/databaseControls/bookingControls";
import AdminDisplayBookingsContainer from "./displayBookingsContainer";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retrieveUser } from "../../../Scripts/databaseControls/userControls";



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
    // const [bookingsList, setBookingsList] = useState(null)
    const [search, setSearch] = useState(false)

    useEffect(() => {
        fetchActiveBookings()
        console.log(activeBookings)
    }, [user]);

    const fetchActiveBookings = () => {
        retrieveActiveBookings()
        .then((res) => {
            setActiveBookings(res)
            // console.log(res)
        })
    }

    const renderBookings = () => {
        if (search) {
            //Do something
        } else {
            // fillBookings()
        }
    }

   

    return (
        <>
            <h3>Bookings:</h3>
            
            {<AdminDisplayBookingsContainer daysOfWeek={daysOfWeek} months={months} bookings={activeBookings} nthNumber={nthNumber}/>}
        </>
    )
}


export default AdminBookingsContainer;