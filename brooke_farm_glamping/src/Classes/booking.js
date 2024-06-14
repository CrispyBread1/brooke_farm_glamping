class Booking {
    constructor (userId, guestName, guests, space, date, nights, state, notes, dateBookingCreated) {
        
        this.userId = userId
        this.guestName = guestName
        this.guests = guests;
        this.space = space;
        this.date = date
        this.nights = nights;
        this.state = state;
        this.notes = notes;
        this.dateBookingCreated = dateBookingCreated
    }
}

export default Booking;