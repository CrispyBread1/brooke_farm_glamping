import { useEffect, useState } from "react";

const OverallCost = ({nights, campingPitchChoice, peopleAmount, firePit, campingSpotsNeeded, setPricesArrayPerNightPerSpot}) => {
    
    const [costOfStay, setCostOfStay] = useState(0)
    const firePitCost = 10

    useEffect(() => {
        handleCostOfStayCalculation()
        configureAmountOfCampingPitchesPrice()

    }, [nights, campingPitchChoice, peopleAmount])  //, firePit, 

    const configurePriceDependingOnDays = (cost) => {
        return cost * nights
    }

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

    return (
      
        <div id="costOfStay">
            <h1>Price for stay: £{costOfStay} </h1>
            <input 
            type="hidden"
            name="costOfStay"
            id="costOfStay"
            value={costOfStay}
            />
            
        </div>           
        
    )

};

export default OverallCost