import { useEffect, useState } from "react";
import React from 'react';

const NightsStaying = ({dateChosen, months, nthNumber, nights, setNights}) => {
    
    const [datesStaying, setDateStaying] = useState("") // Maybe? might just pass through from calender container

    useEffect(() => {
        createDateStaying()

    }, [nights, dateChosen])

    const getMonth = () => {
        if (dateChosen) {
            return months[dateChosen.getMonth()].month
        }
    }

    const addNight = () => {
        if (nights < 24) {
            setNights(nights + 1)

        }
    }

    const removeNight = () => {
        if (nights > 1) {
            setNights(nights - 1)
        }
    }

    const createDateStaying = () => {
        if (dateChosen) {
            var dateArray = []
            for (let i = 0; i < nights; i++) {
                dateArray.push(new Date(dateChosen.getFullYear(), dateChosen.getMonth(), (dateChosen.getDate()+ i)))
            }
            setDateStaying(dateArray)
        } 
        // console.log(datesStaying)
    }

    const getDateandOrdinalNumber = () => {
        var stayingEndDate = 0

        if (dateChosen && nights === 1 ) {
            // setCurrentMonth(months[dateChosen.getMonth()])
            return dateChosen.getDate() + nthNumber(dateChosen.getDate())
        } 

        // If over one night but still in the same month as first day        *------------- *------------- 
        else if (dateChosen && nights > 1 && months[dateChosen.getMonth()].days >= (dateChosen.getDate() + nights)) {
            stayingEndDate = dateChosen.getDate() + nights
            return (
                dateChosen.getDate() + nthNumber(dateChosen.getDate()) + 
                ' - ' + 
                stayingEndDate + nthNumber(stayingEndDate)
                )

        // If over one night but the amount of nights bleeds over into the next month            *------------- *-------------
        } else if (dateChosen && nights > 1 && months[dateChosen.getMonth()].days < (dateChosen.getDate() + nights)) {
            stayingEndDate = (dateChosen.getDate() + nights) - months[dateChosen.getMonth()].days
            
            if (!months[dateChosen.getMonth() + 1]){
                return dateChosen.getDate() + nthNumber(dateChosen.getDate()) + 
                ' - ' + 
                stayingEndDate + nthNumber(stayingEndDate) +
                ' of ' +
                months[0].month
            }
            return (
                dateChosen.getDate() + nthNumber(dateChosen.getDate()) + 
                ' - ' + 
                stayingEndDate + nthNumber(stayingEndDate) +
                ' of ' +
                months[dateChosen.getMonth() + 1].month
                )
        }
    }

    return (
      
        <div id="nights-staying">

            <h2 id="booking-date">{getMonth()} {getDateandOrdinalNumber()}</h2>

            <label>Amount of nights staying</label>
            <br></br>
            <button id="remove-night" onClick={removeNight} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
            <input
            className="nights"
            name="nights"
            type="text"
            placeholder="number"
            value={nights}
            readOnly
            style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
            />
            <button id="add-night" onClick={addNight} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
            
            <input 
            type="hidden"
            name="datesStaying"
            value={datesStaying}
            />
            
        </div>
                
        
    )

};

export default NightsStaying