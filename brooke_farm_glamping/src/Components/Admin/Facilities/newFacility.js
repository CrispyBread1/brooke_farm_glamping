import React from "react";
import { useEffect, useState } from "react";
import './newFacility.css'




const AdminNewFacilityComponent = ({}) => {

    const [edit, setEdit] = useState(false)
    const [editString, setEditString] = useState('Edit')


    useEffect(() => {
        
    }, []);

    const addFacility = () => {

    }

    

    return (
        <div className="admin-facilities-new">

            <button className="add-facility" onClick={addFacility} style={{ width: "9rem", height: "9rem" }} type="button">+</button>

        </div>
    )
}


export default AdminNewFacilityComponent;