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
    const [yearNum, setYearNum] = useState(new Date().getFullYear());
    const [daysOfWeek, setDaysOfWeek] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])

    const months = [{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:30}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]
    // const daysOfWeek = 

    useEffect(() => {
        fetchBookings(monthNum)

      }, []);

    useEffect(() => { // Renders when bookings have come through
        fillDaysInMonth()
        
    }, [bookings])

    useEffect(() => { // Re renders when month is changed for next or previouse
        fillDaysInMonth()

    }, [monthNum])



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
        const dateWork = new Date()
        let days = []

        for (let i = 1; i <= months[monthNum].days; i++) {
            var date = ((i) + ':' + (monthNum + 1) + ':' + dateWork.getFullYear())
            var year = yearNum
            var month = monthNum
            var day = i
            var dateObject = new Date(year, month, day)
            var number = 0;

            if (daysOfWeek[dateObject.getDay()] !== 'Sunday' && dateObject.getDate() === 1) {
                days.push(fillInBlankDaysStart(year, month, dateObject))
            } 
            if (i <= dateWork.getDate() && monthNum === dateWork.getMonth() && yearNum ===dateWork.getFullYear()) {
                // console.log('i am here')
                days.push(<BlankCalendarDay key={i}  date={dateObject} />)
            }
            else if (dateObject >= dateWork) {
                days.push(<CalendarDay key={i} bookingsAmount={number} date={dateObject}/>)
            }
            
            
            for (var j in bookings){
                if (bookings[j].information.date === date) {
                    number ++
                }  
            }
    
           

            if (i  === months[monthNum].days && daysOfWeek[dateObject.getDay()] !== 'Saturday' ) {
                days.push(fillInBlankDaysEnd(year, month, dateObject))

            }
            
        }

        setDaysInMonth(days)
    }



    const fillInBlankDaysStart = (year, month, dateObjectStart) => {
        let blankDays = []
        let daysFromPrevMonth = (dateObjectStart.getDay())
        let prevMonth = (months[(monthNum - 1)])
        if (monthNum === 0) {
            prevMonth = months[monthNum]
        }

        console.log(months[(monthNum - 1)])
        let blankDates = (prevMonth.days - daysFromPrevMonth) + 1

        for (let i = 1; i <= daysFromPrevMonth; i++) {
            let blankDate = new Date(year, (month-1), blankDates)
            blankDates++
            blankDays.push(<BlankCalendarDay key={i}  date={blankDate} />)
        }
        return blankDays
    }

    const fillInBlankDaysEnd = (year, month, dateObjectEnd) => {
        let blankDays = []
        let daysFromPrevMonth = (dateObjectEnd.getDay())

        for (let i = 1; i <= (7 - (daysFromPrevMonth + 1)); i++) {
            let blankDate = new Date(year, (month + 1), i)
            blankDays.push(<BlankCalendarDay key={i}  date={blankDate} />)
        }
        return blankDays
    }



    const nextMonth = () => {
        // console.log('Year:' + yearNum + ' Month:' + monthNum)
        if (monthNum === 11) {
            setMonthNum(0)
            setYearNum(yearNum + 1)
            return
        } else {
            setMonthNum(monthNum + 1)
        }
        
    }

    const previousMonth = () => {
        if ((monthNum - 1) >= new Date().getMonth()) {
            setMonthNum(monthNum - 1)
            return
        }
    }

    const checkDate = () => {
        const date = new Date()
        console.log(date)
    }



    return (
        <div>
            <button onClick={nextMonth}>next month</button>
            <button onClick={previousMonth}>previous month</button>
        
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