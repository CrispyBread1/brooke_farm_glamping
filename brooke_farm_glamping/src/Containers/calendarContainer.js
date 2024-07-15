import React, { useEffect, useState }  from "react";
import CalendarDay from "../Components/calendarDay";
import { retrieveBooking } from "../Scripts/databaseControls";
import './calendarContainer.css'
import BlankCalendarDay from "../Components/blankCalendarDay";
// import Booking from "../Classes/booking";


const CalendarContainer = ({openBookingBox, daysOfWeek, months}) => {


    const [daysInMonth, setDaysInMonth] = useState([]);
    const [bookings, setBookings] = useState('');
    const [monthNum, setMonthNum] = useState(new Date().getMonth());
    const [yearNum, setYearNum] = useState(new Date().getFullYear());

    
    const [loadBookingBox, setLoadBookingBox] = useState(false)

    useEffect(() => {
        fetchBookings(monthNum)

      }, []);

    useEffect(() => { // Renders when bookings have come through
        fillDaysInMonth()
        
    }, [bookings])

    useEffect(() => { // Re renders when month is changed for next or previouse
        fillDaysInMonth()

    }, [monthNum])


    

    // const toggleBookingBox = () => {
        // console.log('test')
        // setLoadBookingBox(true)

        // let bookingBox = document.querySelector(".booking-box");
    //   if(background.className !== "Background"){
        // background.className = "Background"
        // bookingBox.classList.toggle("visible")
    //   } else {background.classList.toggle("zoomleft")
        // console.log(background.className)
    //   }
    // }


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
            var number = getBookingForDay(date);

            if (daysOfWeek[dateObject.getDay()] !== 'Sunday' && dateObject.getDate() === 1) {
                days.push(fillInBlankDaysStart(year, month, dateObject))
            } 
            if (i <= dateWork.getDate() && monthNum === dateWork.getMonth() && yearNum ===dateWork.getFullYear()) {
                days.push(<BlankCalendarDay key={i}  date={dateObject} month={months[monthNum]} id={i}/>)
            }
            else if (dateObject >= dateWork) {
                days.push(<CalendarDay key={i} bookingsAmount={number} date={dateObject} openBookingBox={openBookingBox} id={i}/>)
            }
            if (i  === months[monthNum].days && daysOfWeek[dateObject.getDay()] !== 'Saturday' ) {
                days.push(fillInBlankDaysEnd(year, month, dateObject))

            }
            
        }

        setDaysInMonth(days)
    }

    const getBookingForDay = (date) => {

        var int = 0

        for (var j in bookings){
            if (bookings[j].information.date === date) {
                int ++
            }  
        }

        return int
    }

    const fillInBlankDaysStart = (year, month, dateObjectStart) => {
        let blankDays = []
        let daysFromPrevMonth = (dateObjectStart.getDay())

        let prevMonth = (months[(monthNum - 1)])
        if (monthNum === 0) {
            prevMonth = months[monthNum]
        }

        let blankDates = (prevMonth.days - daysFromPrevMonth) + 1

        for (let i = 1; i <= daysFromPrevMonth; i++) {
            let blankDate = new Date(year, (month-1), blankDates)
            blankDates++
            blankDays.push(<BlankCalendarDay key={i}  date={blankDate} month={prevMonth} id={i}/>)
        }
        return blankDays
    }

    const fillInBlankDaysEnd = (year, month, dateObjectEnd) => {
        let blankDays = []
        let daysFromPrevMonth = (dateObjectEnd.getDay())

        let monthToPass = months[(monthNum + 1)]

        if (!months[(monthNum + 1)]) {
            monthToPass = months[0]
        }

        for (let i = 1; i <= (7 - (daysFromPrevMonth + 1)); i++) {
            let blankDate = new Date(year, (month + 1), i)
            blankDays.push(<BlankCalendarDay key={i}  date={blankDate} month={monthToPass} id={i}/>)
        }
        return blankDays
    }



    const nextMonth = () => {
        if (monthNum === 11) {
            setMonthNum(0)
            setYearNum(yearNum + 1)
            return
        } else {
            setMonthNum(monthNum + 1)
        }
        
    }

    const previousMonth = () => {
        let monthNow = new Date(yearNum, monthNum, 0)
        let nowDate = new Date()

        if (monthNow >= nowDate) {
            if((monthNum - 1) < 0) {
                setMonthNum(11)
                setYearNum(yearNum - 1)
                return
            } else {
                setMonthNum(monthNum -1)
                return
            }
        }
    }

    const checkDate = () => {
        const date = new Date()
        console.log(date)
    }



    return (
        <div >
            <button id="nextMonthButton" onClick={nextMonth}>next month</button>
            <button id="previousMonthButton" onClick={previousMonth}>previous</button>
        <div id="calendar">
        <section >
            <h1 onClick={checkDate}>Date {months[monthNum].month}</h1>
            <ul id="calendar-days">
                <b><li>Sunday</li></b>
                <b> <li>Monday</li></b>
                <b> <li>Tuesday</li></b>
                <b><li>Wednesday</li></b>
                <b> <li>Thursday</li></b>
                <b> <li>Friday</li></b>
                <b> <li>Saturday</li></b>
                {daysInMonth}
            </ul>
            
        </section>
        </div>
        </div>
    )
}



export default CalendarContainer;