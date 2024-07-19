import BookingBox from "../Components/bookingBox";
import React, { useEffect, useState }  from "react";
import './bookingContainer.css'
import { useNavigate } from "react-router-dom";


const BookingContainer = ({bookingBoxOpen, dateObject, daysOfWeek, months, nthNumber, campingFacilities}) => {

    const navigate = useNavigate();

    const [booking, setBooking] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(null)
    // const [dateSelected, setDateSelected] = useState(dateObject)
    const [campingChoice, setCampinChoice] = useState(null)

    const [nights, setNights] = useState(1)
    const [datesStaying, setDateStaying] = useState(null) // Maybe? mihght just pass through from calender container
    
    const [accomodation, setAccomodation] = useState([])
    const [pitchesAmount, setPitchesAmount] = useState([])
    
    const [peopleAmount, setPeopleAmount] = useState(1)
    const [childrenAmount, setChildrenAmount] = useState(0)
    const [dogAmount, setDogAmount] = useState(0)

    useEffect(() => {
        createCampingOptions()
        // fetchBookings(new Date().getMonth())
        // fetchCampingFacilities()
    
      }, [campingFacilities]);

    useEffect(() => {
        createDateNightArray()
        // console.log(nights)
    
    }, [nights, dateObject]);

    const clearBookingInformation = () => {
        // console.log('in clearBookingInformation function')
        setNights(1)
        setAccomodation([])
        setPitchesAmount([])
        // setDate('')
        setPeopleAmount(1)
        setChildrenAmount(0)
        setChildrenAmount(0)
        // setInfantsAmount(0)
        setDogAmount(0)
    }

    const getDateandOrdinalNumber = () => {
        var stayingEndDate = 0


        if (dateObject && nights === 1 ) {
            // setCurrentMonth(months[dateObject.getMonth()])
            return dateObject.getDate() + nthNumber(dateObject.getDate())
        } 

        // If over one night but still in the same month as first day        *------------- *------------- 
        else if (dateObject && nights > 1 && months[dateObject.getMonth()].days >= (dateObject.getDate() + nights)) {
            stayingEndDate = dateObject.getDate() + nights
            return (
                dateObject.getDate() + nthNumber(dateObject.getDate()) + 
                ' - ' + 
                stayingEndDate + nthNumber(stayingEndDate)
                )

        // If over one night but the amount of nights bleeds over into the next month            *------------- *-------------
        } else if (dateObject && nights > 1 && months[dateObject.getMonth()].days < (dateObject.getDate() + nights)) {
            stayingEndDate = (dateObject.getDate() + nights) - months[dateObject.getMonth()].days
            
            if (!months[dateObject.getMonth() + 1]){
                return dateObject.getDate() + nthNumber(dateObject.getDate()) + 
                ' - ' + 
                stayingEndDate + nthNumber(stayingEndDate) +
                ' of ' +
                months[0].month
            }
            return (
                dateObject.getDate() + nthNumber(dateObject.getDate()) + 
                ' - ' + 
                stayingEndDate + nthNumber(stayingEndDate) +
                ' of ' +
                months[dateObject.getMonth() + 1].month
                )
        }
    }

    const getMonth = () => {
        if (dateObject) {
            return months[dateObject.getMonth()].month
        }
        
    }


    // Functions to control amount of nights users wanting to stay *------------- *------------- *-------------
    const addNight = () => {
        // var nightsArray = []
        if (nights < 24) {
            setNights(nights + 1)
            // setDateStaying(createDateNightArray())
        }
    }

    const removeNight = () => {
        if (nights > 1) {
            setNights(nights - 1)
            // setDateStaying(createDateNightArray())
        }
    }

    const createDateNightArray = () => {
        var nightsArray = []
        if (dateObject){
        var chosenFirstNight = dateObject.getDate()
        var chosenFirstMonth = dateObject.getMonth()
        var chosenFirstYear = dateObject.getYear()
        
        for (var i = 0; i < nights; i++) {
            // If night bleeds over the next month 
            if(months[dateObject.getMonth()].days < (dateObject.getDate() + i) && !((chosenFirstMonth + 1) >= 12)) {
                nightsArray.push(((chosenFirstNight + i) - months[dateObject.getMonth()].days) + ":" + (chosenFirstMonth + 2) + ':' + (chosenFirstYear))
            } 
            // If night bleeds over the next month and the next year
            else if(months[dateObject.getMonth()].days < (dateObject.getDate() + i) && (chosenFirstMonth + 1) >= 12) {
                nightsArray.push(((chosenFirstNight + i) - months[dateObject.getMonth()].days) + ":" + ((chosenFirstMonth + 1) - chosenFirstMonth) + ':' + (chosenFirstYear + 1))
            }
            // If nights doesn't bleed over to any month or year
            else (
            nightsArray.push((chosenFirstNight + i) + ":" + (chosenFirstMonth + 1) + ':' + (chosenFirstYear))
            )
        }
        setDateStaying(nightsArray)
    }
    }

    const checkDatesArray = () => {
        console.log(datesStaying)
    }



     // Functions to control amount of  users wanting to stay *------------- *------------- *-------------
    const addGuest = () => {
        setPeopleAmount(peopleAmount + 1)
    }
    const removeGuest = () => {
        if (peopleAmount > 1) {
            setPeopleAmount(peopleAmount - 1)
        }
    }



     // Functions to control amount of  users wanting to stay *------------- *------------- *-------------
     const createCampingOptions = () => {
        const sitesArray = [];
        for (var j in campingFacilities) {
            if (campingFacilities[j]) {
                sitesArray.push(
                    <label htmlFor={j} 
                    key={`label-${j}`}></label>,

                    <input
                        type="radio"
                        name="tent"
                        id={j}
                        value={campingFacilities[j].name}
                        key={`input-${j}`}
                    />,

                    <span key={`text-${j}`} id={j}> {campingFacilities[j].name} </span>,

                    <br key={`break-${j}`}></br>
                );
            }
        }
        setCampinChoice(sitesArray);
    };



     // Functions to control amount of  users' children wanting to stay *------------- *------------- *-------------
     const addChildren = () => {
        setChildrenAmount(childrenAmount + 1)
    }
    const removeChildren = () => {
        if (childrenAmount > 0) {
            setChildrenAmount(childrenAmount - 1)
        }
    }



     // Functions to control amount of  users' children wanting to stay *------------- *------------- *-------------
     const addDogs = () => {
        setDogAmount(dogAmount + 1)
    }
    const removeDogs = () => {
        if (dogAmount > 0) {
            setDogAmount(dogAmount - 1)
        }
    }



     // Functions to control submitting the form and booking *------------- *------------- *-------------
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        moveToConfirmBooking();
        // console.log('submitted')
        if(!datesStaying) {
            createDateNightArray()
            // console.log(datesStaying)
        }
    
    }

    
    const moveToConfirmBooking = () => {
        setTimeout(() => {
            navigate('/book/confirm-booking')
            }, 1000)
    } 
        



    return (
        <div id="booking-box">

            <h1>{getDateandOrdinalNumber()}</h1>
            <h2>{getMonth()}</h2>
            <button onClick={checkDatesArray}>check dates array</button>
            
            <form onSubmit={handleFormSubmit}>

                {/* Night amount user wants to stay *------------- *------------- *------------- */}
                <label>Amount of nights staying</label>
                <br></br>
                <button id="add-night" onClick={addNight} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                <input
                className="nights"
                type="text"
                placeholder="number"
                value={nights}
                readOnly
                style={{ width: "4vw", height: "4vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="remove-night" onClick={removeNight} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
                <br></br>



                {/* Amount of users that want to stay *------------- *------------- *------------- */}
                <label>Amount of adults staying</label>
                <br></br>
                <button id="add-guest" onClick={addGuest} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                <input
                className="adults"
                type="text"
                placeholder="number"
                value={peopleAmount}
                readOnly
                style={{ width: "4vw", height: "4vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="remove-guest" onClick={removeGuest} style={{ width: "2vw", height: "2vw" } }type="button">-</button>
                <br></br>



                {/* What camping space the user wants *------------- *------------- *------------- */}
                <fieldset>
                <legend>Select camping option: </legend>
                    {campingChoice}
                </fieldset>



                {/* Amount of users' children that want to stay *------------- *------------- *------------- */}
                <label>Amount of children staying</label>
                <br></br>
                <button id="add-children" onClick={addChildren} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                <input
                className="children"
                type="text"
                placeholder="number"
                value={childrenAmount}
                readOnly
                style={{ width: "4vw", height: "4vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="remove-children" onClick={removeChildren} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
                <br></br>



                {/* Amount of dogs that want to stay *------------- *------------- *------------- */}
                <label>Amount of dogs staying</label>
                <br></br>
                <button id="add-dogs" onClick={addDogs} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                <input
                className="dogs"
                type="text"
                placeholder="number"
                value={dogAmount}
                readOnly
                style={{ width: "4vw", height: "4vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="remove-dogs" onClick={removeDogs} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
                <br></br>



                {/* checkbox to define if a user wants a firepit *------------- *------------- *-------------*/}



                {/* If user wants to bring their own gazebos, max 2 *------------- *------------- *-------------*/}



                {/* if the user will have additional cars more than one *------------- *------------- *-------------*/}

            <button
            id="post-button"
            type="submit"
            style={{ width: "60px", height: "100px" }}
            >Submit
            </button>
            </form>
        </div>
    )
}

export default BookingContainer;