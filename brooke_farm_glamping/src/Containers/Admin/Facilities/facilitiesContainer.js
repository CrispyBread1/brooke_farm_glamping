import React from "react";
import { useEffect, useState } from "react";
import { retrieveCampingFacilities, updateFacilities } from "../../../Scripts/databaseControls/campingFacilitiesControls";
import AdminFacilityComponent from "../../../Components/Admin/Facilities/facility";
import './facilitiesContainer.css'
import AdminNewFacilityComponent from "../../../Components/Admin/Facilities/newFacility";
import AdminEmptyFacilityComponent from "../../../Components/Admin/Facilities/emptyFacility";



const AdminFacilities = ({}) => {

    const [campingFacilities, setCampingFacilities] = useState(null)
    const [facilitiesForms, setFacilitiesForms] = useState(null)
    const [addingNewFacility, setAddingNewFacility] = useState(false)

    useEffect(() => {
        fetchCampingFacilities()
    
    }, []);

    useEffect(() => {
        configureForm()
    
    }, [campingFacilities, addingNewFacility]);

    const fetchCampingFacilities = async () => {
        try {
          const camps = await retrieveCampingFacilities();
          const arr = []
          camps.forEach((doc) => {
            arr.push({id: doc.id, data: doc.data()})
          });
          setCampingFacilities(arr)
        } catch (error) {
          console.error('Error fetching campsites:', error);
        }
    }

    const updateCampingFacility = async (facility, facilityID) => {
        try {
            updateFacilities(facility, facilityID)
            .then((res) => {
                fetchCampingFacilities()
                console.log('Successfully updated facility')
            })
        } catch (error) {
            console.error('Error updating facility:', error);
        }
    }  

    const addFacility = () => {
        setAddingNewFacility(true)
    }

    const configureForm = () => {
        var arr = []
        if (campingFacilities) {
            campingFacilities.forEach((facility) => {
                arr.push(<AdminFacilityComponent key={facility.data.name} id={facility.data.name} facility={facility.data} facilityID={facility.id} updateCampingFacility={updateCampingFacility}/>)
            })
            if (addingNewFacility) {
                arr.push(<AdminEmptyFacilityComponent key="empty-component" id="empty-component" />)
            }

            arr.push(<AdminNewFacilityComponent key="new-component" id="new-component" addFacility={addFacility}/>)
            setFacilitiesForms(arr)
        }
    }

    

    
   

    return (
        <>
            <h3>Facilities:</h3>

            <div className="admin-facilities-container">
                {facilitiesForms}
            </div>
            
        </>
    )
}


export default AdminFacilities;