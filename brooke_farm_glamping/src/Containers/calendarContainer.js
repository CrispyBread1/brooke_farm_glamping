import React, { useEffect, useState }  from "react";
import CalendarDay from "../Components/calendarDay";


const CalendarContainer = () => {

    const [date, setDate] = useState('');
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [bookingsInMonth, setBookingsInMonth] = useState('');

    const months = [{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:31}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]


    useEffect(() => {
        setDate(new Date())
        fillDaysInMonth()
      }, []);

    const fillDaysInMonth = () => {
        // const month = date.getMonth();
        const day = [];


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
            <ul id="calendar-days">{showDaysOfMonth}</ul>
        </section>
    )
}



export default CalendarContainer;