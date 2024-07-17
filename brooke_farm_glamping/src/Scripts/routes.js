import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from '../Containers/homePage';
import BookingPage from "../Containers/bookingPage";
import LogInPage from "../Containers/logInPage";
import NavBar from "../Containers/navBar";
import { useState } from "react";

export const Paths = () => {

    const [user, setUser] = useState(null)

    const userSignedIn = (userObj) => {
        setUser(userObj)
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

                <Route exact path='/logIn' element={<LogInPage user={user} userSignedIn={userSignedIn}/>}>
                    {/* <LogInPage/> */}
                </Route>

            </Routes>
        </Router>
    )
}