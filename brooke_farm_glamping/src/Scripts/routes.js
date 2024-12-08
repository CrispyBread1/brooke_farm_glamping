import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from '../Containers/HopePage/homePage';
import BookingPage from "../Containers/BookingPage/bookingPage";
import LogInPage from "../Containers/LoginPage/logInPage";
import NavBar from "../Containers/NavBar/navBar";
import ConfirmBookingPage from "../Containers/ConfirmBookingPage/confirmBookingPage";
import AccountContainer from "../Containers/AccountPage/accountContainer";
import AdminFacilities from "../Containers/Admin/Facilities/facilitiesContainer";
import AdminBookingsContainer from "../Containers/Admin/Bookings/bookingsContainer";
import React from 'react';

export const Paths = ({months, daysOfWeek, nthNumber, user, userLoggedIn, userLoggedOut}) => {

    
    return (
        <Router>

        <NavBar user={user} userLoggedOut={userLoggedOut}/>
            <Routes>


                <Route exact path='/' element={<HomePage />}>
                </Route>

                <Route exact path='/book' element={<BookingPage months={months} daysOfWeek={daysOfWeek} nthNumber={nthNumber}/>}>
                </Route>

                <Route exact path='/login' element={<LogInPage userLoggedIn={userLoggedIn}/>}>
                </Route>

                <Route exact path="/book/confirm-booking" element={<ConfirmBookingPage months={months} daysOfWeek={daysOfWeek} nthNumber={nthNumber} userLoggedOut={userLoggedOut}/> }>
                </Route>

                <Route exact path="/account-page" element={<AccountContainer userLoggedOut={userLoggedOut} daysOfWeek={daysOfWeek} months={months} nthNumber={nthNumber}/> }>
                </Route>

                <Route exact path="/admin">
                    <Route path="bookings" element={<AdminBookingsContainer daysOfWeek={daysOfWeek} months={months} nthNumber={nthNumber}/> }></Route>
                    
                    <Route exact path="facilities" element={<AdminFacilities /> }></Route>
                </Route>

            </Routes>
        </Router>
    )
}