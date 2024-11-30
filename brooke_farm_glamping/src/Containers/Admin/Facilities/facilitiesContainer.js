import React from "react";
import { useEffect, useState } from "react";
import { retrieveCampingFacilities, updateFacilities, addNewFacility, addFacilitiesBlockedDay } from "../../../Scripts/databaseControls/campingFacilitiesControls";
import AdminFacilityComponent from "../../../Components/Admin/Facilities/facility";
import './facilitiesContainer.css'
import AdminNewFacilityComponent from "../../../Components/Admin/Facilities/newFacility";
import AdminEmptyFacilityComponent from "../../../Components/Admin/Facilities/emptyFacility";



const AdminFacilities = () => {

    const [campingFacilities, setCampingFacilities] = useState(null)
    const [facilitiesForms, setFacilitiesForms] = useState(null)
    const [addingNewFacility, setAddingNewFacility] = useState(false)

    useEffect(() => {
        fetchCampingFacilities()
    
    }, []);

    useEffect(() => {
        configureForm()
    
    }, [campingFacilities]);

    useEffect(() => {
        if (addingNewFacility) {
            configureForm()
        } else fetchCampingFacilities()
    
    }, [addingNewFacility]);


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
            .then(() => {
                fetchCampingFacilities()
                console.log('Successfully updated facility')
            })
        } catch (error) {
            console.error('Error updating facility:', error);
        }
    }  

    const addEmptyFacility = () => {
        setAddingNewFacility(true)
    }

    const addFacility = async (facility) => {
        try {
            addNewFacility(facility)
            .then(() => {
                setAddingNewFacility(false)
            })
        } catch (error) {
            console.error('Error adding booking:', error);
          }
    }

    const configureForm = () => {
        var arr = []
        if (campingFacilities) {
            campingFacilities.forEach((facility) => {
                if (facility.data.state) arr.push(<AdminFacilityComponent key={facility.data.name} id={facility.data.name} facility={facility.data} facilityID={facility.id} updateCampingFacility={updateCampingFacility} addBlockedDays={addBlockedDays}/>)
            })
            if (addingNewFacility) {
                arr.push(<AdminEmptyFacilityComponent key="empty-component" id="empty-component" addFacility={addFacility}/>)
            }

            arr.push(<AdminNewFacilityComponent key="new-component" id="new-component" addEmptyFacility={addEmptyFacility}/>)
            setFacilitiesForms(arr)
        }
    }

    const addBlockedDays = async (blockDay, facilityID) => {
        try {
            addFacilitiesBlockedDay(blockDay, facilityID)
            .then(() => {
                fetchCampingFacilities()
                console.log('Successfully blocked day')
            })
        } catch (error) {
            console.error('Error updating facility:', error);
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