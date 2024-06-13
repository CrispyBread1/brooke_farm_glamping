import React, { useEffect, useState }  from "react";
import CalendarDay from "../Components/calendarDay";
import { retrieveBooking } from "../Scripts/databaseControls";
import './calendarContainer.css'
// import Booking from "../Classes/booking";


const CalendarContainer = () => {

    // const [date, setDate] = useState('');
    const [daysInMonth, setDaysInMonth] = useState([]);
    // const [bookingsInMonth, setBookingsInMonth] = useState('');
    const [bookings, setBookings] = useState('');
    const [monthNum, setMonthNum] = useState(new Date().getMonth());

    const months = [{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:31}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    useEffect(() => {
        fetchBookings(monthNum)
        // setMonthNum()
      }, []);

    useEffect(() => {
        fillDaysInMonth()
        // console.log(monthNum)
    }, [bookings])



    const fetchBookings = async (tok1) => {
        const month = new Date();
        try {
          const bookings = await retrieveBooking(tok1);
          setBookings(bookings);
          
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
    };

    const fillDaysInMonth = () => {
        // const month = new Date().getMonth();
        const dateWork = new Date()
        var days = []
        // console.log(bookings)
        for (let i = 1; i <= months[monthNum].days; i++) {
            
            var date = ((i) + ':' + (monthNum + 1) + ':' + dateWork.getFullYear())
            var year = dateWork.getFullYear()
            var month = monthNum
            var day = i
            var dateObject = new Date(year, month, day)
            console.log(dateObject)
            // var bookingsForDay = 0
            // var day = {}
            // day.day = i + 1
            // day.bookings = bookingsForDay
            var number = 0;
            
            for (var j in bookings){
                if (bookings[j].information.date === date) {
                    number ++
                    // console.log(bookings)
                }  
            }
    
            days.push(<CalendarDay key={i} bookingsAmount={number} date={dateObject} />)
            
        }

        setDaysInMonth(days)

    }

    const nextMonth = () => {
        setMonthNum(monthNum + 1)
        fillDaysInMonth()
        // consol
    }

    const checkDate = () => {
        const date = new Date()
        console.log(date)
    }



    return (
        <div>
            <button onClick={nextMonth}>next month</button>
        
        <section>
            <h1 onClick={checkDate}>Date</h1>
            <ul id="calendar-days">
                {daysInMonth}
            </ul>
            
        </section>
        </div>
    )
}



export default CalendarContainer;