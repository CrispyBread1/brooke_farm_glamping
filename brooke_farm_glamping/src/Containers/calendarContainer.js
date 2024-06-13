import React, { useEffect, useState }  from "react";
import CalendarDay from "../Components/calendarDay";
import { retrieveBooking } from "../Scripts/databaseControls";
import './calendarContainer.css'
import BlankCalendarDay from "../Components/blankCalendarDay";
// import Booking from "../Classes/booking";


const CalendarContainer = () => {

    // const [date, setDate] = useState('');
    const [daysInMonth, setDaysInMonth] = useState([]);
    // const [bookingsInMonth, setBookingsInMonth] = useState('');
    const [bookings, setBookings] = useState('');
    const [monthNum, setMonthNum] = useState(new Date().getMonth());
    const [daysOfWeek, setDaysOfWeek] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])

    const months = [{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:31}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]
    // const daysOfWeek = 

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
        var setNumber = 0;

        for (let i = 1; i <= months[monthNum].days; i++) {

            var date = ((i) + ':' + (monthNum + 1) + ':' + dateWork.getFullYear())
            var year = dateWork.getFullYear()
            var month = monthNum
            var day = i
            var dateObject = new Date(year, month, day)
            var number = 0;

            if (daysOfWeek[dateObject.getDay()] != 'Sunday' && dateObject.getDate() == 1) {
                days.push(fillInBlankDaysStart(year, month, dateObject))
            } else if (i  == months[monthNum].days && daysOfWeek[dateObject.getDay()] != 'Saturday' ) {
                days.push(fillInBlankDaysEnd(year, month, dateObject))
                // console.log('yep')
            }

            // console.log(months[monthNum].days)
            // var gridID = (daysOfWeek[dateObject.getDay()] + ((i-1) + setNumber))
            // console.log((gridID + '  num:' + (i + setNumber)))
            // daysOfWeek[dateObject.getDay()]

            
            
            for (var j in bookings){
                if (bookings[j].information.date === date) {
                    number ++
                    // console.log(bookings)
                }  
            }
    
            days.push(<CalendarDay key={i} bookingsAmount={number} date={dateObject}/>)
            
        }

        setDaysInMonth(days)

    }

    const fillInBlankDaysStart = (year, month, dateObjectStart) => {
        var blankDays = []

        var daysFromPrevMonth = (dateObjectStart.getDay())
        var prevMonth = months[(monthNum - 1)]
        var blankDates = (prevMonth.days - daysFromPrevMonth) + 1

        for (let i = 1; i <= daysFromPrevMonth; i++) {

            var blankDate = new Date(year, (month-1), blankDates)

            blankDates++

            blankDays.push(<BlankCalendarDay key={i}  date={blankDate} />)
        }

        return blankDays
    }

    const fillInBlankDaysEnd = (year, month, dateObjectEnd) => {
        var blankDays = []

        var daysFromPrevMonth = (dateObjectEnd.getDay())
        var prevMonth = months[(monthNum + 1)]
        // var blankDates = (prevMonth.days + daysFromPrevMonth) + 1

        for (let i = 0; i <= daysFromPrevMonth; i++) {

            var blankDate = new Date(year, (month + 1), daysFromPrevMonth)
            daysFromPrevMonth++
            // blankDates++
            // console.log(i)
            blankDays.push(<BlankCalendarDay key={i}  date={blankDate} />)
        }

        return blankDays
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