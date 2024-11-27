import { useState } from "react";

const ReasonForBooking = ({}) => {
    
    const [reasonForBooking, setReasonForBooking] = useState("")
    const [triedToSubmitWithoutReason, setTriedToSubmitWithoutReason] = useState(false)

    const handleReasonForBookingChange = (evt) => {
        setReasonForBooking(evt.target.value)
        if (reasonForBooking) {
            setTriedToSubmitWithoutReason(false)
        }
    }

    return (
      
        <div>
            <label htmlFor="reason-for-booking"> What is the reason for creating this booking?</label>
            <input type="text" id="bDay" name="bDay" value={reasonForBooking} onChange={handleReasonForBookingChange} />
            {triedToSubmitWithoutReason && <label className="error-camping-choice"> Please make submit a reason</label>}

        </div>
                
        
    )

};

export default ReasonForBooking