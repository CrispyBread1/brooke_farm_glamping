import React from "react";
import { useEffect, useState } from "react";
import './facility.css'


const AdminFacilityComponent = ({facility, facilityID, updateCampingFacility, addBlockedDays}) => {

    const [edit, setEdit] = useState(false)
    const [editString, setEditString] = useState('Edit')

    const [main, setMain] = useState(false)

    const [block, setBlock] = useState(false)
    const [blockString, setBlockString] = useState('Block')

    const [fName, setFName] = useState(facility.name)
    const [fAmount, setFAmount] = useState(facility.amount)
    // const [fImageURL, setFImageURL] = useState(facility.name)
    const [fMaxPeople, setFMaxPeople] = useState(facility.maxPeople)
    const [fPrice, setFPrice] = useState(facility.price)

    const [date, setDate] = useState(null)

    const [fDay, setFDay] = useState(date.getDate())
    const [fMonth, setFMonth] = useState(date.getMonth())
    const [fYear, setFYear] = useState(date.getFullYear())

    useEffect(() => {
        setDate(new Date())

    }, []);
    useEffect(() => {
        if (edit) {generateEdit()}

    }, [facility]);

    const generateEdit = () => {
        if (edit && checkNoEditsMade()) {
            setEdit(false)
            setMain(false)
            setEditString('Edit')
            clearState()
            
        } else {
            setEdit(true)
            setMain(true)
            setEditString('X')
        }
    }
    
    const checkNoEditsMade = () => {
        var editMade = true //this has to be true and edited is false - just so the window.confirm works
        if (facility.name !== fName) {return confirmCloseEdit()}
        if (facility.amount !== fAmount) {return confirmCloseEdit()}
        if (facility.maxPeople !== fMaxPeople) {return confirmCloseEdit()}
        if (facility.price !== fPrice) {return confirmCloseEdit()}
        return editMade
    }

    const confirmCloseEdit = () => {
        return window.confirm("Are you sure you want to exit edit? There are unsaved changes")
    }

    const clearState = () => {
        setFName(facility.name)
        setFAmount(facility.amount)
        // setFImageURL(facility.name)
        setFMaxPeople(facility.maxPeople)
        setFPrice(facility.price)
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
    const handleFDayChange = (evt) => {
        var value = evt.target.value
        if (value.length <= 2 && value <= 31) {
            setFDay(value)
        }
    }
    const handleFMonthChange = (evt) => {
        var value = evt.target.value
        if (value.length <= 2 && value <= 12) {
            setFMonth(value)
        }
    }
    const handleFYearChange = (evt) => {
        var value = evt.target.value
        if (value.length <= 4 && value >= date.getFullYear()) {
            setFYear(value)
        }
    }

    const deleteFacility = () => {
        var facilityRemove = {
            state: false,
        }
        if (confirmDelete()) updateCampingFacility(facilityRemove, facilityID)
    }

    const confirmDelete = () => {
        return window.confirm("Are you sure you want to delete this facility?")
    }

    const generateBlock = () => {
        if (block) {
            setBlock(false)
            setMain(false)
            setBlockString('Block')
            clearState()
        } else {
            setBlock(true)
            setMain(true)
            setBlockString('X')
        }
    }
    
    const handleFormSubmit = (evt) => {
        evt.preventDefault()
        if (!block) {
            var facilityEdit = {
                name: evt.target.fname.value,
                amount: evt.target.fAmount.value,
                maxPeople: evt.target.fMaxPeople.value,
                price: evt.target.fPrice.value,
                imageURL: '',
                blockedDays: []
            }
        updateCampingFacility(facilityEdit, facilityID)
        } else {
            addBlockedDays(new Date(fYear, fMonth, fDay), facilityID)
        }
    }

    return (
        <div className="admin-facilities">
            <h3>{facility.name}</h3>

            <div className="admin-facilities-button" onClick={generateBlock}>
                {blockString}
            </div>

            <div className="admin-facilities-button" onClick={generateEdit}>
                {editString}
            </div>

            <div className="admin-facilities-button" onClick={deleteFacility}>
                Delete
            </div>
            <br></br>

            <form onSubmit={handleFormSubmit} >

                {block && <label htmlFor="fdate">Date:</label>}
                {block && <br></br>}
                {block && <input type="number" id="fDay" name="fDay" value={fDay} onChange={handleFDayChange} style={{ width: "3rem", height: "" }} placeholder="Day"/>}
                {block && <input type="number" id="fMonth" name="fMonth" value={fMonth} onChange={handleFMonthChange} style={{ width: "3rem", height: "" }} placeholder="Month"/>}
                {block && <input type="number" id="fYear" name="fYear" value={fYear} onChange={handleFYearChange} style={{ width: "3rem", height: "" }} placeholder="Year"/>}

                {!block && <label htmlFor="fname">Name:</label>}
                {!block && <br></br>}
                {edit && !block && <input type="text" id="fname" name="fname" value={fName} onChange={handleFNameChange}/>}
                {!edit && !block && <label className="admin-facilities-fLabel">{facility.name}</label>}
                { !block && <br></br>}
                
                {!block && <label htmlFor="fAmount">Max facilities available per day:</label>}
                {!block && <br></br>}
                {edit && !block &&  <input type="number" id="fAmount" name="fAmount" value={fAmount} onChange={handleFAmountChange}/>} 
                {!edit && !block &&  <label className="admin-facilities-fLabel">{facility.amount}</label>} 
                { !block && <br></br>}

                {!block && <label htmlFor="fMaxPeople">Max people to stay in the facility:</label>}
                {!block && <br></br>}
                {edit && !block &&  <input type="number" id="fMaxPeople" name="fMaxPeople" value={fMaxPeople} onChange={handleFMaxPeopleChange}/>}
                {!edit && !block && <label className="admin-facilities-fLabel">{facility.maxPeople}</label>}
                { !block && <br></br>}

                {!block && <label htmlFor="fPrice">Price per night:</label>}
                <br></br>
                {edit && !block &&  <input type="number" id="fPrice" name="fPrice" value={fPrice} onChange={handleFPriceChange}/>}
                {!edit && !block && <label className="admin-facilities-fLabel">£{facility.price}</label>}
                { !block && <br></br>}

                {/* Need to work out how to change images */}

                {main && <button id="post-button-admin" type="submit" className="admin-facilities-save-button" style={{ width: "", height: "" }}>
                    Save
                </button>}

            </form>
        </div>
    )
}


export default AdminFacilityComponent;