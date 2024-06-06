import React, { useEffect, useState }  from "react";
import CalendarDay from "../Components/calendarDay";
import { retrieveBooking } from "../Scripts/databaseControls";
// import Booking from "../Classes/booking";


const CalendarContainer = () => {

    const [date, setDate] = useState('');
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [bookingsInMonth, setBookingsInMonth] = useState('');

    const months = [{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:31}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]


    useEffect(() => {
        // setDate(new Date())
        fetchBookings()
        // .then((res) => {console.log(res)})
        // console.log(bookingsInMonth)
      }, []);

      const fetchBookings = async () => {
        const month = new Date();
        try {
          const bookings = await retrieveBooking(month.getMonth());
          fillDaysInMonth(bookings);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          // return handleError(error);
          // return error.code;
        }
      };

    const fillDaysInMonth = (bookings) => {
        const month = new Date().getMonth();
        console.log(months[month].days)
        // console.log(bookings[33].)
        for (var i; i>= months[month].days; i++) {
            // console.log(month)
            var bookingsForDay = 0
            var day = {}
            day.day = i + 1
            day.day.bookings = bookingsForDay
            for (var j; j>= bookings.length(); j++){

                if (bookings[j].date.getDay() == i) {
                    bookingsForDay ++
                }
               
                
            }
            setDaysInMonth([...daysInMonth,  day]);
            console.log(daysInMonth)
        }
        
        // console.log(daysInMonth)

    }

    const checkDate = () => {
        const date = new Date()
        console.log(date)
    }

    const showDaysOfMonth = 
        // return
            // for (let i = 0; i >= daysInMonth; i++) {
            //     console.log(i);
            //     days.push(<CalendarDay date={date} months={months}></CalendarDay>)
            // }
        
            daysInMonth.map((day) => (
            <CalendarDay day={day}></CalendarDay>
          ));
        
        // return dates;
    


    return (
        <section>
            <h1 onClick={checkDate}>Date</h1>
            <ul id="calendar-days">{bookingsInMonth}</ul>
        </section>
    )
}



export default CalendarContainer;