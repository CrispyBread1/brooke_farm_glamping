import React from "react";
import { useEffect, useState } from "react";
import './facility.css'




const AdminFacilityComponent = ({facility}) => {

    const [fName, setFName] = useState(facility.name)

    useEffect(() => {
    
      }, []);

    const handleFNameChange = (evt) => {
        setFName(evt.target.value);
    }
   

    return (
        <div className="admin-facilities-edit">
            <label>{facility.name}</label><br></br>
                
            <label for="fname">Name:</label><br></br>
            <input type="text" id="fname" name="fname" value={fName} onChange={handleFNameChange}/><br></br>

        </div>
    )
}


export default AdminFacilityComponent;