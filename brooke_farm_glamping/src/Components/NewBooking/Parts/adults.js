import React from 'react';
const Adults = ({peopleAmount, setPeopleAmount,campingSpotsNeeded, setCampingSpotsNeeded}) => {
    

    const addGuest = () => {
        setPeopleAmount(peopleAmount + 1)
        
        if ( peopleAmount % 6 === 0) {
            setCampingSpotsNeeded(campingSpotsNeeded + 1)
        }
    }
    const removeGuest = () => {
        if (peopleAmount > 1) {
            if ((peopleAmount - 1) % 6 === 0) {
                setCampingSpotsNeeded(campingSpotsNeeded - 1)
                
            }
            // if (campingSpotsNeeded === 1) {
            // }
            setPeopleAmount(peopleAmount - 1)
        }
    }

    return (
      
        <div id="adults-staying">
            
            <label>Amount of adults staying</label>
            
            <br></br>
            
            <button id="remove-guest" onClick={removeGuest} style={{ width: "2vw", height: "2vw" } }type="button">-</button>
            
            <input
            className="adults"
            name="adults"
            type="text"
            placeholder="number"
            value={peopleAmount}
            readOnly
            style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
            />
            
            <button id="add-guest" onClick={addGuest} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
            
            <br></br>
        </div>
        
    )

};

export default Adults