import { useState } from "react";

const AdditionalCars = () => {
    
    const [additionalCar, setAdditionalCar] = useState(false)
    const [additionalCarAmount, setAdditionalCarAmount] = useState(0)

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

    return (
      
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
            <label>Amount of additional Cars</label>
            <br></br>
            <button id="remove-AdditionalCar" onClick={removeAdditionalCar} style={{ width: "2vw", height: "2vw" }} type="button">-</button>
            <input
            className="additionalCarAmount"
            id="additionalCarAmount"
            type="text"
            placeholder="number"
            value={additionalCarAmount}
            readOnly
            style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
            />
            <button id="add-gazebo" onClick={addAdditionalCar} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
            
            <br></br> 
            </div>}

            {!additionalCar && <input 
                type="hidden"
                name="additionalCarAmount"
                id="additionalCarAmount"
                value={additionalCarAmount}
            />}
        </div>
                
        
    )

};

export default AdditionalCars