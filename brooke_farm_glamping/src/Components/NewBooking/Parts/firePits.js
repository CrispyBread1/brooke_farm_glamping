import React from 'react';

const FirePits = ({firePit, setFirePit}) => {
    
    const configureFirePit = () => {
        if (firePit) {
            setFirePit(false)
        } else setFirePit(true)
    }

    return (
      
        <div id="checkbox-firepit">
            <input 
            type="checkbox" 
            className="firepit" 
            id="firepit"
            name="firepit" 
            value="Firepit" 
            onClick={configureFirePit}
            style={{ width: "1.5vw", height: "1.5vw", textAlign: "center", fontSize: "2vw"  }}/>
            <label htmlFor="firepit"> I would like a firepit</label>
            
            <br></br>
        </div>       
        
    )

};

export default FirePits