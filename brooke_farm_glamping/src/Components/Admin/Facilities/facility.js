import React from "react";
import { useEffect, useState } from "react";
import './facility.css'




const AdminFacilityComponent = ({facility}) => {

    const [edit, setEdit] = useState(false)
    const [editString, setEditString] = useState('Edit')

    const [fName, setFName] = useState(facility.name)
    const [fAmount, setFAmount] = useState(facility.amount)
    const [fImageURL, setFImageURL] = useState(facility.name)
    const [fMaxPeople, setFMaxPeople] = useState(facility.maxPeople)
    const [fPrice, setFPrice] = useState('£' + facility.price)

    useEffect(() => {
    
    }, []);

    const generateEdit = () => {
        if (edit) {
            setEdit(false)
            setEditString('Edit')
            clearState()
        } else {
            setEdit(true)
            setEditString('X')
        }
    }  

    const clearState = () => {
        setFName(facility.name)
        setFAmount(facility.amount)
        setFImageURL(facility.name)
        setFMaxPeople(facility.maxPeople)
        setFPrice('£' + facility.price)
    }

    const handleFNameChange = (evt) => {
        setFName(evt.target.value);
    }
    const handleFAmountChange = (evt) => {
        setFAmount(evt.target.value);
    }
    const handleFMaxPeopleChange = (evt) => {
        setFMaxPeople(evt.target.value);
    }
    const handleFPriceChange = (evt) => {
        setFPrice(evt.target.value);
    }   

    return (
        <div className="admin-facilities-edit">
            <h3>{facility.name}</h3>

            <div className="admin-facilities-edit-button" onClick={generateEdit}>
                {editString}
            </div>
            
            <br></br>
                
            <label htmlFor="fname">Name:</label><br></br>
            {edit && <input type="text" id="fname" name="fname" value={fName} onChange={handleFNameChange}/>}
            {!edit && <label className="admin-facilities-fLabel">{facility.name}</label>}
            <br></br>
            
            <label htmlFor="fAmount">Max facilities available per day:</label><br></br>
            {edit && <input type="text" id="fAmount" name="fAmount" value={fAmount} onChange={handleFAmountChange}/>} 
            {!edit && <label className="admin-facilities-fLabel">{facility.amount}</label>} 
            <br></br>

            <label htmlFor="fMaxPeople">Max people to stay in the facility:</label><br></br>
            {edit && <input type="text" id="fMaxPeople" name="fMaxPeople" value={fMaxPeople} onChange={handleFMaxPeopleChange}/>}
            {!edit && <label className="admin-facilities-fLabel">{facility.maxPeople}</label>}
            <br></br>

            <label htmlFor="fPrice">Price per night:</label><br></br>
            {edit && <input type="text" id="fPrice" name="fPrice" value={fPrice} onChange={handleFPriceChange}/>}
            {!edit && <label className="admin-facilities-fLabel">£{facility.price}</label>}
            <br></br>

            {/* Need to work out how to change images */}

        </div>
    )
}


export default AdminFacilityComponent;