import { useState } from "react";
import React from 'react';

const Dogs = () => {
    
    const [dog, setDog] = useState(false)
    const [dogAmount, setDogAmount] = useState(0)

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

    return (
      
        <div id="checkbox-dogs">
                <input 
                type="checkbox" 
                className="dog" 
                id="dog"
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
                className="dogAmount"
                id="dogAmount"
                type="text"
                placeholder="number"
                value={dogAmount}
                readOnly
                style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="add-dogs" onClick={addDogs} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                </div>}

                {!dog && <input 
                    type="hidden"
                    name="dogAmount"
                    value={dogAmount}
                />}
                
                <br></br>
        </div>   
        
    )

};

export default Dogs