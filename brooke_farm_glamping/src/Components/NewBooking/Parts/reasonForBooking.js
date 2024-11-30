import { useState } from "react";

const ReasonForBooking = ({submittedWithoutReason, setSubmittedWithoutReason}) => {
    
    const [reasonForBooking, setReasonForBooking] = useState("")

    const handleReasonForBookingChange = (evt) => {
        setReasonForBooking(evt.target.value)
        if (reasonForBooking) {
            setSubmittedWithoutReason(false)
        }
    }

    return (
      
        <div>
            <label htmlFor="reason-for-booking"> What is the reason for creating this booking?</label>
            <input type="text" id="reason-for-booking" name="reason" value={reasonForBooking} onChange={handleReasonForBookingChange} />
            {submittedWithoutReason && <label className="error-camping-choice"> Please make submit a reason</label>}

        </div>
                
        
    )

};

export default ReasonForBooking