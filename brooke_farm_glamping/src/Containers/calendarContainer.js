import React, { useEffect, useState }  from "react";
import CalendarDay from "../Components/calendarDay";
import { retrieveBooking } from "../Scripts/databaseControls";
// import Booking from "../Classes/booking";


const CalendarContainer = () => {

    const [date, setDate] = useState('');
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [bookingsInMonth, setBookingsInMonth] = useState('');
    const [bookings, setBookings] = useState('');

    const months = [{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:31}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]


    useEffect(() => {
        fetchBookings()
        fillDaysInMonth()

      }, []);

      const fetchBookings = async () => {
        const month = new Date();
        try {
          const bookings = await retrieveBooking(month.getMonth());
          setBookings(bookings);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };

    const fillDaysInMonth = () => {
        const month = new Date().getMonth();
        const dateWork = new Date()
        var days = []

        for (let i = 0; i <= months[month].days; i++) {
            
            var date = ((i + 1) + ':' + (dateWork.getMonth() + 1) + ':' + dateWork.getFullYear())
            var bookingsForDay = 0
            var day = {}
            day.day = i + 1
            day.bookings = bookingsForDay
            var number = 0;
            
            for (var j in bookings){
                if (bookings[j].information.date === date) {
                    number ++
                }  
            }
    
            days.push(<CalendarDay key={i} bookingsAmount={number} date={date} />)
            
        }

        setDaysInMonth(days)

    }

    const checkDate = () => {
        const date = new Date()
        console.log(date)
    }



    return (
        <section>
            <h1 onClick={checkDate}>Date</h1>
            <ul id="calendar-days">
                {daysInMonth}
            </ul>
            
        </section>
    )
}



export default CalendarContainer;