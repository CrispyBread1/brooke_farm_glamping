import { useState } from "react";

const DateChosen = ({dateChosen, setDateChosen}) => {

    const [date, setDate] = useState(new Date())
    const [bDay, setBDay] = useState(date.getDate())
    const [bMonth, setBMonth] = useState(date.getMonth())
    const [bYear, setBYear] = useState(date.getFullYear())

    

    const handleFDayChange = (evt) => {
        var value = evt.target.value
        if (value.length <= 2 && value <= 31) {
            setBDay(value)
        }
    }
    const handleFMonthChange = (evt) => {
        var value = evt.target.value
        if (value.length <= 2 && value <= 12) {
            setBMonth(value)
        }
    }
    const handleFYearChange = (evt) => {
        var value = evt.target.value
        if (value.length <= 4 && value >= date.getFullYear()) {
            setBYear(value)
        }
    }

    const configureChosenDate = () => {
        setDateChosen(new Date(bYear, bMonth, bDay))
    }
    
    

    return (
      
        <div>
            {!dateChosen && <label>Date of Stay</label>}
            {!dateChosen && <input type="number" id="bDay" name="bDay" value={bDay} onChange={handleFDayChange} style={{ width: "3rem", height: "" }} placeholder="Day"/>}
            {!dateChosen && <input type="number" id="bMonth" name="bMonth" value={bMonth} onChange={handleFMonthChange} style={{ width: "3rem", height: "" }} placeholder="Month"/>}
            {!dateChosen && <input type="number" id="bYear" name="bYear" value={bYear} onChange={handleFYearChange} style={{ width: "3rem", height: "" }} placeholder="Year"/>}
            {!dateChosen && <button id="set-Date" onClick={configureChosenDate} style={{ width: "8vw", height: "2vw" }} type="button">Set Date</button>}
        </div>   
        
    )

};

export default DateChosen