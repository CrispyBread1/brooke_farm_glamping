import { useState, useEffect } from "react";
import { retrieveCampingFacilities } from "../../../Scripts/databaseControls/campingFacilitiesControls";
import React from 'react';

const CampingOptions = ({dateChosen, nights, campingSpotsNeeded, setCampingPitchChoice, submittedWithoutCampsite, setSubmittedWithoutCampsite}) => {
    
    const [campingFacilities, setCampingFacilities] = useState(null)
    const [multipleCampingSpots, setMultipleCampingSpots] = useState(false)
    const [campingChoice, setCampingChoice] = useState(null)

    useEffect(() => {
        fetchCampingFacilities()
        // console.log(campingSpotsNeeded)
    }, []);

    useEffect(() => {
        if (campingSpotsNeeded > 1) {
            setMultipleCampingSpots(true)
        }
    }, []);



    useEffect(() => {
        createCampingOptions()
    
      }, [campingFacilities, dateChosen]); //peopleAmount, nights

    const fetchCampingFacilities = async () => {
        try {
          const camps = await retrieveCampingFacilities();
          const arr = []
          camps.forEach((doc) => {
            arr.push(doc.data())
          });
          setCampingFacilities(arr)
        } catch (error) {
          return error
        }
    }
    
    const createCampingOptions = () => {
        const sitesArray = [];
        for (var j in campingFacilities) {
            if (campingFacilities[j].state && checkBlockedDays(campingFacilities[j])) {
                const campingOption = campingFacilities[j];
                sitesArray.push(
                    
                    <div key={`div-${j}`} >
                    <input
                        type="radio"
                        name="tent"
                        onClick={() => handleCampingOption(campingOption)}
                        id={j}
                        value={campingFacilities[j].name}
                        aria-label={campingFacilities[j].name}
                        key={`input-${j}`}
                    /> 
                        {campingFacilities[j].name} -   
                        £{campingFacilities[j].price}  {multipleCampingSpots && `x ${campingSpotsNeeded} Required`} 
                    {/* This is where the name of the facilities will come through for the input label */}
                    </div>

                );
            }
        }
        setCampingChoice(sitesArray);
    };

    const handleCampingOption = (tok1) => {
        setCampingPitchChoice(tok1)
        setSubmittedWithoutCampsite(false)
    }

    const checkBlockedDays = (facility) => { // if theres blocked days loop through them, and with each one loop through the dates chosen
        if (facility && dateChosen) {
            if (facility.blockedDays.length > 0) {
                for (var n = 0; n < facility.blockedDays.length; n++ ){
                    for (var i = 0; i < nights; i ++) {
                        if (facility.blockedDays[n].toDate().toString() === (new Date (dateChosen.getFullYear(), dateChosen.getMonth(), (dateChosen.getDate() + (i)))).toString() ) {
                            return false
                        }
                    }
                }
            }
        } return true
    }  

    return (
      
        <div id="camping-option">
            <fieldset>
            <legend>Select camping option: </legend>
            {submittedWithoutCampsite && <label className="error-camping-choice"> Please make a camping pitch choice</label>}
                {campingChoice}
            </fieldset>
        </div> 
        
    )
};

export default CampingOptions