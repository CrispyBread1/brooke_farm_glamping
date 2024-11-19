import React from "react";
import UserBooking from "../../../Components/AccountPage/userBooking";
import { useEffect, useState } from "react";
import '../../AccountPage/userBookingContainer.css'
import SearchBar from "../../../Components/SearchBar/searchBar";




const AdminDisplayBookingsContainer = ({daysOfWeek, months, bookings, showDetails, nthNumber}) => {

    const [bookingsArray, setBookingsArray] = useState([])
    const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false)
    const [bookingForDetails, setBookingForDetails] = useState(null)
    const [search, setSearch] = useState(false)

    useEffect(() => {
        fillBookings()
    }, [bookings])

    useEffect(() => {
    }, [])

    const fillBookings = () => {
        var arrayOfBookings = []
        if (bookings) {
            for (var i = 0; i < bookings.length; i++) {
                arrayOfBookings.push(<UserBooking key={i} id={i} daysOfWeek={daysOfWeek} months={months} booking={bookings[i]} showDetails={showDetails} nthNumber={nthNumber}/>)
            }  
        }
        setBookingsArray(arrayOfBookings)
    }

    const updateSearchValue = (search) => {
        setSearch(search)
    }

    function searchBookings(results, searchVal) {
        let updatedResults = results;
            if (searchVal.length > 0) {
                updatedResults = [...results].filter(function(r) {
    
                if (r.guestName === null && r.reference === null) {
                    return (r.guestName.toLowerCase().includes(searchVal.toLowerCase()));
                }
                if (r.guestName === null) {
                    return (r.guestName.toLowerCase().includes(searchVal.toLowerCase()) ||
                        r.reference.toLowerCase().includes(searchVal.toLowerCase()));
                }
                if (r.reference === null) {
                    return (r.guestName.toLowerCase().includes(searchVal.toLowerCase()) ||
                        r.last_name.toLowerCase().includes(searchVal.toLowerCase()));
                }
                else {
                    return (r.guestName.toLowerCase().includes(searchVal.toLowerCase()) ||
                        r.guestName.toLowerCase().includes(searchVal.toLowerCase()) ||
                        r.reference.toLowerCase().includes(searchVal.toLowerCase()));
                }
                    })}
            else{
                updatedResults = results;
        }
        return updatedResults;
       };

   

    return (
        <>
            <h3>Admin Bookings:</h3>

            <div className="header">
                <SearchBar updateSearchValue={updateSearchValue}/>
            </div>

            {bookings && 
                <ul className="user--bookings">

                    {searchBookings(bookings, search).map(r => (<UserBooking key={r.reference} id={r.reference} daysOfWeek={daysOfWeek} months={months} booking={r} showDetails={showDetails} nthNumber={nthNumber} />))}
                   
                </ul>}

            {!bookings && <h2>There are currently no admin bookings</h2>}
            
        </>
    )
}


export default AdminDisplayBookingsContainer;