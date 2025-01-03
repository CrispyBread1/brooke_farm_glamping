import { useEffect, useState } from "react";
import React from 'react';

const DateChosen = ({dateChosen, setDateChosen, submittedWithoutDates, setSubmittedWithoutDates}) => {

    const [date, setDate] = useState(null)
    const [bDay, setBDay] = useState(0)
    const [bMonth, setBMonth] = useState(0)
    const [bYear, setBYear] = useState(0)

    useEffect(() => {
        const now = new Date();
        setDate(now);
        setBDay(now.getDate());
        setBMonth(now.getMonth());
        setBYear(now.getFullYear());
    }, [])

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
        setSubmittedWithoutDates(false)
    }
    
    

    return (
      
        <div>
            {!dateChosen && <label>Date of Stay</label>}
            {submittedWithoutDates && <label className="error-camping-choice"> Please select a date</label>}
            {!dateChosen && <input type="number" id="bDay" name="bDay" value={bDay} onChange={handleFDayChange} style={{ width: "3rem", height: "" }} placeholder="Day"/>}
            {!dateChosen && <input type="number" id="bMonth" name="bMonth" value={bMonth} onChange={handleFMonthChange} style={{ width: "3rem", height: "" }} placeholder="Month"/>}
            {!dateChosen && <input type="number" id="bYear" name="bYear" value={bYear} onChange={handleFYearChange} style={{ width: "3rem", height: "" }} placeholder="Year"/>}
            {!dateChosen && <button id="set-Date" onClick={configureChosenDate} style={{ width: "8vw", height: "2vw" }} type="button">Set Date</button>}
            
            
        
        </div>   
        
    )

};

export default DateChosen