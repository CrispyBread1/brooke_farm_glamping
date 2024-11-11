import React from "react";
import { useEffect, useState } from "react";

const AdminEmptyFacilityComponent = ({addFacility}) => {

    const [edit, setEdit] = useState(false)
    const [editString, setEditString] = useState('Edit')

    const [fName, setFName] = useState('')
    const [fAmount, setFAmount] = useState('')
    const [fImageURL, setFImageURL] = useState('')
    const [fMaxPeople, setFMaxPeople] = useState('')
    const [fPrice, setFPrice] = useState('')


    useEffect(() => {
        
    }, []);

    const clearState = () => {
        setFName('')
        setFAmount('')
        setFImageURL('')
        setFMaxPeople('')
        setFPrice('')
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

    const handleFormSubmit = (evt) => {
        evt.preventDefault()
        var newFacility = {
            name: evt.target.fname.value,
            amount: evt.target.fAmount.value,
            maxPeople: evt.target.fMaxPeople.value,
            price: evt.target.fPrice.value,
            state: true,
            imageURL: "",
            blockedDays: []
        }
        addFacility(newFacility)
    }

    

    return (
        <div className="admin-facilities">

            <h3>New Facility</h3>

            <br></br>

            <form onSubmit={handleFormSubmit} >
                <label htmlFor="fname">Name:</label><br></br>
                <input type="text" id="fname" name="fname" value={fName} onChange={handleFNameChange}/>
                <br></br>
                
                <label htmlFor="fAmount">Max facilities available per day:</label><br></br>
                <input type="number" id="fAmount" name="fAmount" value={fAmount} onChange={handleFAmountChange}/> 
                <br></br>

                <label htmlFor="fMaxPeople">Max people to stay in the facility:</label><br></br>
                <input type="number" id="fMaxPeople" name="fMaxPeople" value={fMaxPeople} onChange={handleFMaxPeopleChange}/>
                <br></br>

                <label htmlFor="fPrice">Price per night:</label><br></br>
                <input type="number" id="fPrice" name="fPrice" value={fPrice} onChange={handleFPriceChange}/>
                <br></br>

                {/* Need to work out how to change images */}

                <button id="post-button-admin" type="submit" className="admin-facilities-save-button" style={{ width: "", height: "" }}>
                    Save
                </button>

            </form>

        </div>
    )
}


export default AdminEmptyFacilityComponent;