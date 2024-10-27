import BookingBox from "../../Components/BookingPage/bookingBox";
import React, { useEffect, useState }  from "react";
import './bookingContainer.css'
import { useNavigate } from "react-router-dom";


const BookingContainer = ({dateObject, months, nthNumber, campingFacilities, relayAmountOfNightsStaying}) => {

    const navigate = useNavigate();

    const [campingChoice, setCampinChoice] = useState(null)

    const [nights, setNights] = useState(1)
    const [datesStaying, setDateStaying] = useState(null) // Maybe? mihght just pass through from calender container
    
    const [peopleAmount, setPeopleAmount] = useState(1)
    const [childrenAmount, setChildrenAmount] = useState(0)

    const [dog, setDog] = useState(false)
    const [dogAmount, setDogAmount] = useState(0)

    const [firePit, setFirePit] = useState(false)
    const [firePitCost, setFirePitCost] = useState(10)

    const [gazebo, setGazebo] = useState(false)
    const [gazeboAmount, setGazeboAmount] = useState(0)

    const [additionalCar, setAdditionalCar] = useState(false)
    const [additionalCarAmount, setAdditionalCarAmount] = useState(0)

    const [campingPitchChoice, setCampingPitchChoice] = useState(null)
    const [multipleCampingSpots, setMultipleCampingSpots] = useState(false)
    const [campingSpotsNeeded, setCampingSpotsNeeded] = useState(1)

    const [pricesArrayPerNightPerSpot, setPricesArrayPerNightPerSpot] = useState([])
    const [costOfStay, setCostOfStay] = useState(0)

    const [triedToSubmitWithoutCampsite, setTriedToSubmitWithoutCampsite] = useState(false)



    useEffect(() => {
        createCampingOptions()
    
      }, [campingFacilities, nights, peopleAmount]);

    useEffect(() => {
        handleCostOfStayCalculation()
        configureAmountOfCampingPitchesPrice()

    }, [nights, campingPitchChoice, firePit, peopleAmount])  

    useEffect(() => {
        createDateStaying()
    
    }, [nights, dateObject]);

    // const clearBookingInformation = () => {
    //     // console.log('in clearBookingInformation function')
    //     setNights(1)
    //     // setAccomodation([])
    //     // setPitchesAmount([])
    //     // setDate('')
    //     setPeopleAmount(1)
    //     setChildrenAmount(0)
    //     setChildrenAmount(0)
    //     // setInfantsAmount(0)
    //     setDogAmount(0)
    // }

    // const relayAmountOfNightsStaying = 

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
            relayAmountOfNightsStaying(nights + 1)
            // setDateStaying(createDateNightArray())
        }
    }

    const removeNight = () => {
        if (nights > 1) {
            setNights(nights - 1)
            relayAmountOfNightsStaying(nights - 1)
            // setDateStaying(createDateNightArray())
        }
    }

    const createDateStaying = () => {
        if (dateObject) {
            var dateArray = []
            for (let i = 0; i <= nights; i++) {
                dateArray.push(new Date(dateObject.getFullYear(), dateObject.getMonth(), (dateObject.getDate()+ i)))
            }
            setDateStaying(dateArray)
        }
    }

    const checkDatesArray = () => {
        console.log(datesStaying)
        datesStaying.forEach((dateString) => {
            console.log(new Date(dateString));
        });
    }



     // Functions to control amount of  users wanting to stay *------------- *------------- *-------------
    const addGuest = () => {
        setPeopleAmount(peopleAmount + 1)
        
        if ( peopleAmount % 6 === 0) {
            
            setCampingSpotsNeeded(campingSpotsNeeded + 1)
            // console.log(campingSpotsNeeded)
            setMultipleCampingSpots(true)
        }
    }
    const removeGuest = () => {
        if (peopleAmount > 1) {
            if ((peopleAmount - 1) % 6 === 0) {
                
                setCampingSpotsNeeded(campingSpotsNeeded - 1)
                
            }
            if (campingSpotsNeeded === 1) {
                // console.log('inside this bit')
                setMultipleCampingSpots(false)
                // console.log(multipleCampingSpots)
            }
            setPeopleAmount(peopleAmount - 1)
        }
    }



     // Functions to control amount of  users wanting to stay *------------- *------------- *-------------
     const createCampingOptions = () => {
        const sitesArray = [];
        for (var j in campingFacilities) {
            if (campingFacilities[j]) {
                const campingOption = campingFacilities[j];
                sitesArray.push(
                    
                    <div key={`div-${j}`} >
                    <input
                        type="radio"
                        name="tent"
                        onClick={() => handleCampingOption(campingOption)}
                        id={j}
                        value={campingFacilities[j].name}
                        key={`input-${j}`}
                    /> 
                        {campingFacilities[j].name} -   
                        £{campingFacilities[j].price}  {multipleCampingSpots && `x ${campingSpotsNeeded} Required`} 
                    {/* This is where the name of the facisilites will come through for the input label */}
                    </div>

                );
            }
        }
        setCampinChoice(sitesArray);
    };

    const configurePriceDependingOnDays = (cost) => {
        return cost * nights
    }

     // Functions to control camping options *------------- *------------- *-------------
    const handleCampingOption = (tok1) => {
        setCampingPitchChoice(tok1)
        setTriedToSubmitWithoutCampsite(false)
    }



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
     const configureDogs = () => {
        if (dog) {
            setDog(false)
            setDogAmount(0)
        } else {
            setDog(true) 
            setDogAmount(1)
        }
    }

     const addDogs = () => {
        setDogAmount(dogAmount + 1)
    }
    const removeDogs = () => {
        if (dogAmount > 1) {
            setDogAmount(dogAmount - 1)
        }
    }



     // Functions to control if user wants a firepit *------------- *------------- *-------------
    const configureFirePit = () => {
        if (firePit) {
            setFirePit(false)
        } else setFirePit(true)
    }



     // Functions to control if user wants a to bring a gazebo *------------- *------------- *-------------
    const configureGazebo = () => {
        if (gazebo) {
            setGazebo(false)
            setGazeboAmount(0)
        } else {
            setGazebo(true)
            setGazeboAmount(1)
        }
    }

    const addGazebo = () => {
        if (gazeboAmount < 2) {
            setGazeboAmount(gazeboAmount + 1)
        }
    }

    const removeGazebo = () => {
        if (gazeboAmount > 1) {
            setGazeboAmount(gazeboAmount - 1)
        }
    }


   
     // Functions to control if user wants to have additional cars *------------- *------------- *-------------
    const configureAdditionalCar = () => {
        if (additionalCar) {
            setAdditionalCar(false)
            setAdditionalCarAmount(0)
        } else {
            setAdditionalCar(true)
            setAdditionalCarAmount(1)
        }
    }

    const addAdditionalCar = () => {
        if (additionalCarAmount < 2) {
            setAdditionalCarAmount(additionalCarAmount + 1)
        }
    }

    const removeAdditionalCar = () => {
        if (additionalCarAmount > 1) {
            setAdditionalCarAmount(additionalCarAmount - 1)
        }
    }



     // Functions to control cost of the stay *------------- *------------- *-------------
     const handleCostOfStayCalculation = () => {
        if (campingPitchChoice) {
            var priceOfNights = 0
            priceOfNights += configurePriceDependingOnDays(campingPitchChoice.price)
            if (firePit) {
                priceOfNights += configurePriceDependingOnDays(firePitCost)
            }
            priceOfNights *= campingSpotsNeeded

            setCostOfStay(priceOfNights)
        } 
    }

    const configureAmountOfCampingPitchesPrice = () => {
        var pricesArray = []
        if (campingPitchChoice) {
            for (let i = 0; i < campingSpotsNeeded; i++) {
                pricesArray.push(
                    <div key={i + "camping-choice-div"}>
                    <li key={i + "camping-choice"}> {campingPitchChoice.name} x {nights} Nights = £{configurePriceDependingOnDays(campingPitchChoice.price)} </li>
                    {firePit && <li key={i + "firepit"}>£10 per night, per pitch</li>}
                    </div >
                )
            }
        setPricesArrayPerNightPerSpot(pricesArray)
        return pricesArray
        }
    }



     // Functions to control submitting the form and booking *------------- *------------- *-------------
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        if(!datesStaying) {
            createDateStaying()
        }

        var booking = {
            'datesStaying': datesStaying, //mandatory
            'campingSite': campingPitchChoice, //mandatory
            'campingSiteAmount': campingSpotsNeeded, //mandatory
            'adults': peopleAmount, //mandatory
            'children': childrenAmount,
            'dogs': dogAmount,
            'firePit': firePit, 
            'gazebo': gazeboAmount,
            'additionCars': additionalCarAmount,
            'cost': costOfStay,
            'nights': nights
        }

        // fillBookingInformation(booking)
        if (campingPitchChoice) {
            moveToConfirmBooking(booking)
            setTriedToSubmitWithoutCampsite(false)
        } else setTriedToSubmitWithoutCampsite(true)
    
    }

    

    
    const moveToConfirmBooking = (booking) => {
        setTimeout(() => {
            navigate('/book/confirm-booking', {state: booking})
            }, 1000)
    } 
        



    return (
        <div id="booking-box">

            
            {/* <br></br> */}
            
            {/* <br></br> */}
            {/* <button onClick={checkDatesArray}>check dates array</button> */}
            
            <form onSubmit={handleFormSubmit}>
            <h2 id="get-month">{getMonth()}</h2>
            <h2 id="booking-date">{getDateandOrdinalNumber()}</h2>
                
                {/* Night amount user wants to stay *------------- *------------- *------------- */}
                <div id="nights-staying">
                <label>Amount of nights staying</label>
                <br></br>
                <button id="remove-night" onClick={removeNight} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
                <input
                className="nights"
                type="text"
                placeholder="number"
                value={nights}
                readOnly
                style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="add-night" onClick={addNight} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                </div>
                {/* <br></br> */}



                {/* Amount of users that want to stay *------------- *------------- *------------- */}
                {/* <div className="adults-config"> */}
                <div id="adults-staying">
                <label>Amount of adults staying</label>
                <br></br>
                <button id="remove-guest" onClick={removeGuest} style={{ width: "2vw", height: "2vw" } }type="button">-</button>
                <input
                className="adults"
                type="text"
                placeholder="number"
                value={peopleAmount}
                readOnly
                style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="add-guest" onClick={addGuest} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                </div>
                <br></br>
                



                {/* What camping space the user wants *------------- *------------- *------------- */}
                <div id="camping-option">
                <fieldset>
                <legend>Select camping option: </legend>
                {triedToSubmitWithoutCampsite && <label className="error-camping-choice"> Please make a camping pitch choice</label>}
                    {campingChoice}
                </fieldset>
                </div>


                {/* Amount of users' children that want to stay *------------- *------------- *------------- */}
                <div id="children-amount">
                <label>Amount of children staying</label>
                <br></br>
                <button id="remove-children" onClick={removeChildren} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
                <input
                className="children"
                type="text"
                placeholder="number"
                value={childrenAmount}
                readOnly
                style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="add-children" onClick={addChildren} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                </div>
                <br></br>



                {/* Amount of dogs that want to stay *------------- *------------- *------------- */}
                <div id="checkbox-dogs">
                <input 
                type="checkbox" 
                className="dog" 
                name="dog" 
                value="Dog"
                onClick={configureDogs} 
                style={{ width: "1.5vw", height: "1.5vw", textAlign: "center", fontSize: "2vw"  }}/>
                <label htmlFor="dog"> I would like to bring my Dog</label>

                {dog && <div id="dogs">
                <label>Amount of dogs</label>
                <br></br>
                <button id="remove-dogs" onClick={removeDogs} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
                <input
                className="dogs"
                type="text"
                placeholder="number"
                value={dogAmount}
                readOnly
                style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="add-dogs" onClick={addDogs} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                </div>}
                </div>
                <br></br>



                {/* checkbox to define if a user wants a firepit *------------- *------------- *-------------*/}
                <div id="checkbox-firepit">
                <input 
                type="checkbox" 
                className="firepit" 
                name="firepit" 
                value="Firepit" 
                onClick={configureFirePit}
                style={{ width: "1.5vw", height: "1.5vw", textAlign: "center", fontSize: "2vw"  }}/>
                <label htmlFor="firepit"> I would like a firepit</label>
                </div>
                <br></br>



                {/* If user wants to bring their own gazebos, max 2 *------------- *------------- *-------------*/}
                <div id="checkbox-gazebo">
                <input 
                type="checkbox" 
                className="gazebo" 
                name="gazebo" 
                value="Gazebo"
                onClick={configureGazebo} 
                style={{ width: "1.5vw", height: "1.5vw", textAlign: "center", fontSize: "2vw"  }}/>
                <label htmlFor="gazebo"> I would like to bring my own Gazebo</label>

                {gazebo && <div>
                <label>Amount of gazebos</label>
                <br></br>
                <button id="remove-Gazebo" onClick={removeGazebo} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
                <input
                className="nights"
                type="text"
                placeholder="number"
                value={gazeboAmount}
                readOnly
                style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="add-gazebo" onClick={addGazebo} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                <br></br> 
                </div>}
                </div>
                


                {/* if the user will have additional cars more than one *------------- *------------- *-------------*/}
                <div id="checkbox-car">
                <input 
                type="checkbox" 
                className="addition-car" 
                name="addition-car" 
                value="Addition-car"
                onClick={configureAdditionalCar}
                style={{ width: "1.5vw", height: "1.5vw", textAlign: "center", fontSize: "2vw"  }}/>
                <label htmlFor="addition-car"> Will there be more than one car?</label>
                
                {additionalCar && <div>
                <label>Amount of additonal Cars</label>
                <br></br>
                <button id="remove-AdditionalCar" onClick={removeAdditionalCar} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
                <input
                className="nights"
                type="text"
                placeholder="number"
                value={additionalCarAmount}
                readOnly
                style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="add-gazebo" onClick={addAdditionalCar} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                <br></br> 
                </div>}
                </div>



                {/* Sumarry box of prices *------------- *------------- *-------------*/}
                <div id="price-guide">
                    {
                        campingPitchChoice &&
                        (<>
                        <h3>Price guide:</h3>
                        <ul id="price-guide-list">
                            {campingSpotsNeeded > 1 && <b><li className="ui-label">{campingSpotsNeeded} Camping spots are needed for your party size</li></b>}  
                            {pricesArrayPerNightPerSpot}
                        </ul>
                        
                        </>
                        )
                    }
                </div>



                {/* Overall Cost of the stay *------------- *------------- *-------------*/}
                <div id="overall-cost-of-stay">
                    <h1>Price for stay: £{costOfStay} </h1>
                </div>



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