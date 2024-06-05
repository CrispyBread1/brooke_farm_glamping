import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from '../Containers/homePage';
import BookingPage from "../Containers/bookingPage";
import LogInPage from "../Containers/logInPage";

export const Paths = () => {
    return (
        <Router>
            <Routes>

                <Route exact path='/' element={<HomePage/>}>
                    
                </Route>

                <Route path='/book' element={<BookingPage/>}>
                    {/* <BookingPage/> */}
                </Route>

                <Route path='/logIn' element={<LogInPage/>}>
                    {/* <LogInPage/> */}
                </Route>

            </Routes>
        </Router>
    )
}