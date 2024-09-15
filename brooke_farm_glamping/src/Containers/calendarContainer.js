import React, { useEffect, useState }  from "react";
import CalendarDay from "../Components/calendarDay";

import './calendarContainer.css'
import BlankCalendarDay from "../Components/blankCalendarDay";
// import Booking from "../Classes/booking";


const CalendarContainer = ({openBookingBox, daysOfWeek, months, bookings, nthNumber, amountOfNightsStaying}) => {


    const [daysInMonth, setDaysInMonth] = useState([]);
    
    const [monthNum, setMonthNum] = useState(new Date().getMonth());
    const [yearNum, setYearNum] = useState(new Date().getFullYear());

    
    const [daySelectedID, setDaySelectedID] = useState(null)
    const [daySelectedDate, setDaySelectedDate] = useState(null)
    // const [extraNights, setExtraNights] = useState(null)
    

    

    useEffect(() => { // Renders when bookings have come through
        fillDaysInMonth()
        // setExtraNights(amountOfNightsStaying)
        
    }, [bookings, monthNum, daySelectedID, amountOfNightsStaying])



    const configureDaySelected = (dayID, datDate) => {
        setDaySelectedID(dayID)
        setDaySelectedDate(datDate)
    }

    


    const fillDaysInMonth = () => {
        const dateWork = new Date()
        let days = []
        var nightsChosen = amountOfNightsStaying
        for (let i = 1; i <= months[monthNum].days; i++) {
            var date = ((i) + ':' + (monthNum + 1) + ':' + dateWork.getFullYear()) // the date the loop is working on in thius itteration
            var year = yearNum
            var month = monthNum
            var day = i
            var dateObject = new Date(year, month, day) // date the loop is looking at in a date object
            var number = getBookingForDay(date);
            
            

            if (daysOfWeek[dateObject.getDay()] !== 'Sunday' && dateObject.getDate() === 1) {
                days.push(fillInBlankDaysStart(year, month, dateObject))
            } 
            if (i <= dateWork.getDate() && monthNum === dateWork.getMonth() && yearNum ===dateWork.getFullYear()) {
                days.push(<BlankCalendarDay key={i}  
                    date={dateObject} 
                    month={months[monthNum]} 
                    id={i}/>)
            }
            else if (dateObject >= dateWork) {
                var strictID = (i + months[dateObject.getMonth()].month + dateObject.getFullYear())
                
                
                if (strictID ===daySelectedID) { // If the day is clicked it should change the colour
                    days.push(<CalendarDay key={i} 
                        bookingsAmount={number} 
                        date={dateObject} 
                        openBookingBox={openBookingBox} 
                        id={strictID} 
                        configureDaySelected={configureDaySelected} 
                        colour='#006600'
                        />)

                } // this checks that 
                else if (daySelectedDate <= dateObject && nightsChosen > 0 && daySelectedDate.getMonth() === dateObject.getMonth() && daySelectedDate.getFullYear() === dateObject.getFullYear()) {
                    nightsChosen -= 1
                    days.push(<CalendarDay key={i} 
                        bookingsAmount={number} 
                        date={dateObject} 
                        openBookingBox={openBookingBox} 
                        id={strictID} 
                        configureDaySelected={configureDaySelected} 
                        colour='#ff00ff'
                        />)
                }
                else { // otherwise all the colours stay the same
                days.push(<CalendarDay key={i} 
                    bookingsAmount={number} 
                    date={dateObject} 
                    openBookingBox={openBookingBox} 
                    id={strictID} 
                    configureDaySelected={configureDaySelected} 
                    colour='#fff'
                    />)
            }
                
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
            blankDays.push(<BlankCalendarDay key={i}  
                date={blankDate} 
                month={prevMonth} 
                id={i}/>)
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
            blankDays.push(<BlankCalendarDay key={i}  
                date={blankDate} month={monthToPass} 
                id={i}/>)
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
            {/* <h1>{amountOfNightsStaying}</h1> */}
        <div id="calendar">
        <section id="calendarSection" >
            <h1 onClick={checkDate}>Date {months[monthNum].month}</h1>
            <ul id="calendar-days">
                <b className='column-titles'><li >Sunday</li></b>
                <b className='column-titles'> <li >Monday</li></b>
                <b className='column-titles'> <li >Tuesday</li></b>
                <b className='column-titles'><li >Wednesday</li></b>
                <b className='column-titles'> <li >Thursday</li></b>
                <b className='column-titles'> <li>Friday</li></b>
                <b className='column-titles'> <li>Saturday</li></b>
                {daysInMonth}
            </ul>
            
        </section>
        </div>
        </div>
    )
}



export default CalendarContainer;