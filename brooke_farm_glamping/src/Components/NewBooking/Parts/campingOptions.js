import { useState, useEffect } from "react";
import { retrieveCampingFacilities } from "../../../Scripts/databaseControls/campingFacilitiesControls";

const CampingOptions = ({dateChosen, nights, campingSpotsNeeded, setCampingPitchChoice}) => {
    
    const [campingFacilities, setCampingFacilities] = useState(null)
    const [multipleCampingSpots, setMultipleCampingSpots] = useState(false)
    const [triedToSubmitWithoutCampsite, setTriedToSubmitWithoutCampsite] = useState(false)
    const [campingChoice, setCampingChoice] = useState(null)

    useEffect(() => {
        fetchCampingFacilities()
    
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
          console.error('Error fetching campsites:', error);
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
        setTriedToSubmitWithoutCampsite(false)
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
            {triedToSubmitWithoutCampsite && <label className="error-camping-choice"> Please make a camping pitch choice</label>}
                {campingChoice}
            </fieldset>
        </div> 
        
    )
};

export default CampingOptions