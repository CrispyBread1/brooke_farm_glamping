import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import HomePage from '../Containers/homePage';
import BookingPage from "../Containers/bookingPage";
import LogInPage from "../Containers/logInPage";
import NavBar from "../Containers/navBar";
import { useEffect, useState } from "react";
import ConfirmBookingPage from "../Containers/confirmBookingPage";
import AccountContainer from "../Containers/accountContainer";

export const Paths = ({months, daysOfWeek, nthNumber, user, userLoggedIn, userLoggedOut}) => {

    
    return (
        <Router>

        <NavBar user={user} userLoggedOut={userLoggedOut}/>
            <Routes>


                <Route exact path='/' element={<HomePage />}>
                    
                </Route>

                <Route exact path='/book' element={<BookingPage months={months} daysOfWeek={daysOfWeek} nthNumber={nthNumber}/>}>
                    {/* <BookingPage/> */}
                </Route>

                <Route exact path='/login' element={<LogInPage userLoggedIn={userLoggedIn}/>}>
                    {/* <LogInPage/> */}
                </Route>

                <Route exact path="/book/confirm-booking" element={<ConfirmBookingPage months={months} daysOfWeek={daysOfWeek} nthNumber={nthNumber} userLoggedOut={userLoggedOut}/> }>

                </Route>

                <Route exact path="/account-page" element={<AccountContainer userLoggedOut={userLoggedOut}/> }>

                </Route>

            </Routes>
        </Router>
    )
}