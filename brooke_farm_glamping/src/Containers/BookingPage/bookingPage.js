import React, { useEffect, useState }  from "react";
import CalendarContainer from "./calendarContainer.js"
import './bookingPage.css'
import { retrieveCampingFacilities } from "../../Scripts/databaseControls/campingFacilitiesControls";
import BookingForm from "../../Components/NewBooking/form.js";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retrieveUser } from "../../Scripts/databaseControls/userControls.js";

const BookingPage = ({months, daysOfWeek, nthNumber}) => {

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

  const [bookingBoxOpen, setBookingBoxOpen] = useState(false);
  const [bookings, setBookings] = useState('');

  const [campingFacilities, setCampingFacilities] = useState(null)

  const [dateObject, setDateObject] = useState(null)
  
  
  const [amountOfNightsStaying, setAmountOfNightsStaying] = useState(null)

  useEffect(() => {
    fetchCampingFacilities()
    fetchBookings()

  }, []);

  const fetchBookings = async () => {
    // const month = new Date();
    try {
      setBookings(bookings);
          
    } catch (error) {
      console.error('Error fetching bookings:', error);
  }};

  const fetchCampingFacilities = async () => {
    try {
      const camps = await retrieveCampingFacilities();
      const arr = []
      camps.forEach((doc) => {
        arr.push(doc.data())
      });
      setCampingFacilities(arr)
    } catch (error) {
      console.error('Error fetching campsites:', error);
    }
  }

  const checkUserGotThrough = () => {
  }

  const openBookingBox = (date) => {
    setDateObject(date);
    setBookingBoxOpen(true);
    if (!bookingBoxOpen) {
      const sidebar = document.querySelector('.Booking-container');
    if (bookingBoxOpen) {
      sidebar.classList.remove('show');
    } else {
      sidebar.classList.add('show');
  }}}

  const closeBookingBox = () => {
    setBookingBoxOpen(false)
    const sidebar = document.querySelector('.Booking-container');
    sidebar.classList.remove('show');   
    }

  

  const checkCampsGotRetreived = () => {
    console.log(campingFacilities)
  }

  const relayAmountOfNightsStaying = (tok1) => {
    setAmountOfNightsStaying(tok1)
}


  return (
    <div className="Booking-page">
        <p>Booking page</p>

        {/* <div id="Add-booking"  onClick={newBooking} value="addBooking">Add Booking</div> */}
        <div onClick={checkUserGotThrough}>User email: {}</div>
        <button onClick={checkCampsGotRetreived}>check camps came through</button>

        <button id="hideBookingbox" onClick={closeBookingBox}>Hide booking info</button>

        <div id ="Calendar-booking-container">
        <div id="controls-and-calendar">

            <div id="Calendar-container">
                <CalendarContainer openBookingBox={openBookingBox} daysOfWeek={daysOfWeek} months={months} bookings={bookings} nthNumber={nthNumber} relayAmountOfNightsStaying={relayAmountOfNightsStaying} amountOfNightsStaying={amountOfNightsStaying}/>
            </div>

        </div>

        
            <div className='Booking-container'>
                <BookingForm dateObject={dateObject} months={months} nthNumber={nthNumber} user={user} />
            </div> 
        
        </div>

    </div>
 )
}

export default BookingPage