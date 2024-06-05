import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from '../Containers/homePage';
import BookingPage from "../Containers/bookingPage";
import LogInPage from "../Containers/logInPage";
import NavBar from "../Containers/navBar";

export const Paths = () => {
    return (
        <Router>

        <NavBar></NavBar>
            <Routes>


                <Route exact path='/' element={<HomePage/>}>
                    
                </Route>

                <Route exact path='/book' element={<BookingPage/>}>
                    {/* <BookingPage/> */}
                </Route>

                <Route exact path='/logIn' element={<LogInPage/>}>
                    {/* <LogInPage/> */}
                </Route>

            </Routes>
        </Router>
    )
}