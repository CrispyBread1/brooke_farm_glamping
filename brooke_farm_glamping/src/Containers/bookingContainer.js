import BookingBox from "../Components/bookingBox";
import React, { useEffect, useState }  from "react";
import './bookingContainer.css'
import { useNavigate } from "react-router-dom";


const BookingContainer = ({dateObject, months, nthNumber, campingFacilities, fillBookingInformation}) => {

    const navigate = useNavigate();

    const [campingChoice, setCampinChoice] = useState(null)

    const [nights, setNights] = useState(1)
    const [datesStaying, setDateStaying] = useState(null) // Maybe? mihght just pass through from calender container
    
    const [peopleAmount, setPeopleAmount] = useState(1)
    const [childrenAmount, setChildrenAmount] = useState(0)

    const [dog, setDog] = useState(false)
    const [dogAmount, setDogAmount] = useState(1)

    const [firePit, setFirePit] = useState(false)
    const [firePitCost, setFirePitCost] = useState(10)

    const [gazebo, setGazebo] = useState(false)
    const [gazeboAmount, setGazeboAmount] = useState(0)

    const [additionalCar, setAdditionalCar] = useState(false)
    const [additionalCarAmount, setAdditionalCarAmount] = useState(0)

    const [campingPitchChoice, setCampingPitchChoice] = useState(null)
    // const [campingPrice, setCampingPrice] = useState(null)

    const [costOfStay, setCostOfStay] = useState(0)



    useEffect(() => {
        createCampingOptions()
    
      }, [campingFacilities, nights]);

    useEffect(() => {
        handleCostOfStayCalculation()

    }, [nights, campingPitchChoice])  

    useEffect(() => {
        createDateNightISOSStringArray()
    
    }, [nights, dateObject]);

    const clearBookingInformation = () => {
        // console.log('in clearBookingInformation function')
        setNights(1)
        // setAccomodation([])
        // setPitchesAmount([])
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

    const createDateNightISOSStringArray = () => {
        var nightsArray = []
        if (dateObject){
        var chosenFirstNight = dateObject.getDate()
        var chosenFirstMonth = dateObject.getMonth()
        var chosenFirstYear = dateObject.getFullYear()
        // console.log(new Date().getFullYear())
        for (var i = 0; i < nights; i++) {

            // If night bleeds over the next month 
            if(months[dateObject.getMonth()].days < (dateObject.getDate() + i) && !((chosenFirstMonth + 1) >= 12)) {
                // new Date sorted by new Date(Year, Month, Day)
                var nightStaying = new Date(chosenFirstYear, (chosenFirstMonth + 1), ((chosenFirstNight + i) - months[dateObject.getMonth()].days))
                nightsArray.push(nightStaying.toISOString())
            } 

            // If night bleeds over the next month and the next year
            else if(months[dateObject.getMonth()].days < (dateObject.getDate() + i) && (chosenFirstMonth + 1) >= 12) {
                // new Date sorted by new Date(Year, Month, Day)
                var nightStaying = new Date((chosenFirstYear + 1), ((chosenFirstMonth) - chosenFirstMonth), ((chosenFirstNight + i) - months[dateObject.getMonth()].days))
                nightsArray.push(nightStaying.toISOString())
            }

            // If nights doesn't bleed over to any month or year
            else {
                // new Date sorted by new Date(Year, Month, Day)
                var nightStaying = new Date(chosenFirstYear,(chosenFirstMonth), (chosenFirstNight + i));
                nightsArray.push(nightStaying.toISOString())

            }
        }
        setDateStaying(nightsArray)
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
                        {campingFacilities[j].name} -   £{configurePriceDependingOnDays(campingFacilities[j].price)}
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
        // console.log(tok1)
        // handleCostOfStayCalculation(tok1.price)
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
        // var priceOfNights = 0
        if (campingPitchChoice) {
            var priceOfNights = 0
            priceOfNights += configurePriceDependingOnDays(campingPitchChoice.price)
            if (firePit) {
                priceOfNights += configurePriceDependingOnDays(firePitCost)
            }
            // console.log(priceOfNights)
            
            setCostOfStay(priceOfNights)
        } 
    }



     // Functions to control submitting the form and booking *------------- *------------- *-------------
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        moveToConfirmBooking();
        if(!datesStaying) {
            createDateNightISOSStringArray()
        }

        var booking = {
            'datesStaying': datesStaying,
            'campingSite': campingPitchChoice,
            'adults': peopleAmount,
            'children': childrenAmount,
            'dogs': dogAmount,
            'firePit': firePit,
            'gazebo': gazeboAmount,
            'additionCars': additionalCarAmount
        }

        fillBookingInformation(booking)

    
    }

    

    
    const moveToConfirmBooking = () => {
        setTimeout(() => {
            navigate('/book/confirm-booking')
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



                {/* Overall Cost of the stay *------------- *------------- *-------------*/}
                <div id="overall-cost-of-stay">
                    Price for stay: £{costOfStay} 
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