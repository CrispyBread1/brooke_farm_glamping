import { useState } from "react";

const Gazebo = () => {

    const [gazebo, setGazebo] = useState(false)
    const [gazeboAmount, setGazeboAmount] = useState(0)

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

    return (
      
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
                className="gazeboAmount"
                id="gazeboAmount"
                type="text"
                placeholder="number"
                value={gazeboAmount}
                readOnly
                style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <button id="add-gazebo" onClick={addGazebo} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
                <br></br> 
                </div>}

                {!gazebo && <input 
                    type="hidden"
                    name="gazeboAmount"
                    value={gazeboAmount}
                />}
        </div>       
        
    )

};

export default Gazebo