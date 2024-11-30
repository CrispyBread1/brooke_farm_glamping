import React from "react";
import './newFacility.css'

const AdminNewFacilityComponent = ({addEmptyFacility}) => {

    // const [edit, setEdit] = useState(false)
    // const [editString, setEditString] = useState('Edit')


    // useEffect(() => {
        
    // }, []);

    

    

    return (
        <div className="admin-facilities">

            <button className="add-facility" onClick={addEmptyFacility} style={{ width: "9rem", height: "9rem" }} type="button">+</button>

        </div>
    )
}


export default AdminNewFacilityComponent;