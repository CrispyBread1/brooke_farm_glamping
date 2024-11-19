class Booking {
    constructor ( state, userID, guestName, reference, guests, space, date, nights, children, dogs, firepit, gazebo, additionCars, cost, active, notes, dateOfBooking) {
        
        this.state = state
        this.userId = userID
        this.guestName = guestName
        this.reference = reference

        this.guests = guests;
        this.space = space;
        this.date = date
        this.nights = nights;

        this.children = children
        this.dogs = dogs
        this.firepit = firepit
        this.gazebo = gazebo
        this.additionCars = additionCars

        this.cost = cost
        this.active = active

        this.notes = notes;
        this.dateBookingCreated = dateOfBooking
    }
    toFirestore() {
        return {
          state: this.state,
          userId: this.userId,
          guestName: this.guestName,
          reference: this.reference,
          guests: this.guests,
          space: this.space,
          date: this.date,  
          nights: this.nights,
          children: this.children,
          dogs: this.dogs,
          firepit: this.firepit,
          gazebo: this.gazebo,
          additionCars: this.additionCars,
          cost: this.cost,
          active: this.active,
          notes: this.notes,
          dateBookingCreated: this.dateBookingCreated 
        };
      }
}

export default Booking;