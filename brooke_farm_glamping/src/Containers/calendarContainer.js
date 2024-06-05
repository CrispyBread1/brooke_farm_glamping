import React from "react";
import CalendarDay from "../Components/calendarDay";


const CalendarContainer = () => {

    const [diaryEntries, setDiaryEntries] = useState([]);

    const months = [{month:"January", days:31}, {month:"February", days:28}, {month:"March", days:31}, {month:"April", days:30}, {month:"May", days:31}, {month:"June", days:30}, {month:"July", days:31}, {month:"August", days:31}, {month:"September", days:31}, {month:"October", days:31}, {month:"November", days:30}, {month:"December", days:31}]


    useEffect(() => {
        getDiaryEntries().then((res) => setDiaryEntries(res));
      }, []);

    const checkDate = () => {
        const date = new Date()
        console.log(months[(date.getMonth())].days)
    }

    const showDaysOfMonth = () => {
        const date = new Date()
        const daysInMonth = months[(date.getMonth())].days
        var days = []
        for (let i = 0; i >= daysInMonth; i++) {
            console.log(i);
            days.push(<CalendarDay date={date} months={months}></CalendarDay>)
        }
        return days;
    };


    return (
        <section>
            <h1>Date</h1>
            <ul id="calendar-days"onClick={checkDate}>{showDaysOfMonth}</ul>
        </section>
    )
}



export default CalendarContainer;