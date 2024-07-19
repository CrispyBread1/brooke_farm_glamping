import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import HomePage from '../Containers/homePage';
import BookingPage from "../Containers/bookingPage";
import LogInPage from "../Containers/logInPage";
import NavBar from "../Containers/navBar";
import { useState } from "react";
import ConfirmBookingPage from "../Containers/confirmBookingPage";

export const Paths = () => {

    const [user, setUser] = useState(null)
    

    const userSignedIn = (userObj) => {
        setUser(userObj)
        
        
    }

    const userSignedOut = () => {
        setUser(null)
    }

    return (
        <Router>

        <NavBar></NavBar>
            <Routes>


                <Route exact path='/' element={<HomePage user={user}/>}>
                    
                </Route>

                <Route exact path='/book' element={<BookingPage user={user}/>}>
                    {/* <BookingPage/> */}
                </Route>

                <Route exact path='/login' element={<LogInPage user={user} userSignedIn={userSignedIn} userSignedOut={userSignedOut}/>}>
                    {/* <LogInPage/> */}
                </Route>

                <Route exact path="/book/confirm-booking" element={<ConfirmBookingPage user={user}/> }>

                </Route>

            </Routes>
        </Router>
    )
}