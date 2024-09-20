class Booking {
    constructor ( state, userId, guestName, guests, space, date, nights, notes, dateBookingCreated) {
        
        this.state = state;
        this.userId = userId
        this.guestName = guestName
        this.guests = guests;
        this.space = space;
        this.date = date
        this.nights = nights;
        this.notes = notes;
        this.dateBookingCreated = dateBookingCreated
    }
}

export default Booking;