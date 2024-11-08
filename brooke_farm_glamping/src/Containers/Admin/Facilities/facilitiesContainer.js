import React from "react";
import { useEffect, useState } from "react";
import { retrieveCampingFacilities } from "../../../Scripts/databaseControls/campingFacilitiesControls";
import AdminFacilityComponent from "../../../Components/Admin/Facilities/facility";



const AdminFacilities = ({}) => {

    const [campingFacilities, setCampingFacilities] = useState(null)
    const [facilitiesForms, setFacilitiesForms] = useState(null)

    useEffect(() => {
        fetchCampingFacilities()
    
    }, []);

    useEffect(() => {
        configureForm()
    
    }, [campingFacilities]);

    const fetchCampingFacilities = async () => {
        try {
          const camps = await retrieveCampingFacilities();
          const arr = []
          camps.forEach((doc) => {
            arr.push(doc.data())
          });
          setCampingFacilities(arr)
        } catch (error) {
          console.error('Error fetching campsites:', error);
        }
    }

    const configureForm = () => {
        var arr = []
        if (campingFacilities) {
            campingFacilities.forEach((facility) => {
                arr.push(<AdminFacilityComponent key={facility.name} id={facility.name} facility={facility}/>)
            })
            setFacilitiesForms(arr)
        }
    }

    const handleFormSubmit = () => {

    }
   

    return (
        <>
            <h3>Facilities:</h3>

            <form onSubmit={handleFormSubmit}>

                {facilitiesForms}

            </form>

        </>
    )
}


export default AdminFacilities;