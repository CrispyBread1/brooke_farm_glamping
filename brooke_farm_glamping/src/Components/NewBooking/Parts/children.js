import { useState } from "react";

const Children = ({}) => {
    
    const [childrenAmount, setChildrenAmount] = useState(0)

    const addChildren = () => {
        setChildrenAmount(childrenAmount + 1)
    }
    const removeChildren = () => {
        if (childrenAmount > 0) {
            setChildrenAmount(childrenAmount - 1)
        }
    }

    return (
      
        <div id="children-amount">
            <label>Amount of children staying</label>
            <br></br>

            <button id="remove-children" onClick={removeChildren} style={{ width: "2vw", height: "2vw" }} type="button">-</button>

            <input
            className="children"
            id="children"
            type="text"
            placeholder="number"
            value={childrenAmount}
            readOnly
            style={{ width: "3vw", height: "3vw", textAlign: "center", fontSize: "2vw"  }}
            />

            <button id="add-children" onClick={addChildren} style={{ width: "2vw", height: "2vw" }} type="button">+</button>
            <br></br>
        </div>
                
        
    )

};

export default Children