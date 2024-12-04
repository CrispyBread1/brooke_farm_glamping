import { 
    // getFirestore, 
    // collection, 
    getDocs, 
    addDoc, 
    // doc, 
    getDoc, 
    // query, 
    // where, 
    updateDoc 
  } from "firebase/firestore";
  
  import {
    addBooking,
    retrieveBooking,
    retrieveUserBooking,
    retrieveActiveBookings,
    checkInBooking,
  } from "../../../src/Scripts/databaseControls/bookingControls.js";
  
  // Mock Firestore methods
  jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(),
    collection: jest.fn().mockReturnValue("mockCollectionRef"),
    addDoc: jest.fn(),
    getDoc: jest.fn(),
    doc: jest.fn().mockReturnValue("mockDocRef"),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    updateDoc: jest.fn(),
  }));
  
  describe("Firestore Function Tests", () => {
    let mockBooking;
  
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks before each test
  
      // Example mock booking object
      mockBooking = {
        toFirestore: jest.fn().mockReturnValue({
          id: "mockId",
          user: "testUser",
          active: true,
          dates: ["2024-12-01", "2024-12-05"],
        }),
      };
    });
  
    test("addBooking should add a new booking", async () => {
      const mockDocRef = { id: "mockDocId" };
      addDoc.mockResolvedValue(mockDocRef); // Mock addDoc behavior
  
      const result = await addBooking(mockBooking);
  
      expect(addDoc).toHaveBeenCalledTimes(1); 
      expect(addDoc).toHaveBeenCalledWith(
        "mockCollectionRef", // Firestore collection reference
        mockBooking.toFirestore() // Booking data
      );
      expect(result).toEqual(mockDocRef);
    });
  
    test("retrieveBooking should fetch a specific booking", async () => {
      const mockDocData = { id: "mockId", user: "testUser", active: true };
      const mockDocSnap = { exists: () => true, data: () => mockDocData };
      getDoc.mockResolvedValue(mockDocSnap); // Mock getDoc behavior
  
      const result = await retrieveBooking("mockDocId");
  
      expect(getDoc).toHaveBeenCalledWith("mockDocRef");
      expect(getDoc).toHaveBeenCalledTimes(1); 
      expect(result).toEqual(mockDocData);
    });
  
    test("retrieveUserBooking should fetch multiple bookings", async () => {
      const mockDocData1 = { id: "mockId1", user: "user1", active: true };
      const mockDocData2 = { id: "mockId2", user: "user2", active: false };
      const mockDocSnap1 = { exists: () => true, data: () => mockDocData1 };
      const mockDocSnap2 = { exists: () => true, data: () => mockDocData2 };
  
      getDoc.mockResolvedValueOnce(mockDocSnap1).mockResolvedValueOnce(mockDocSnap2); // Mock getDoc behavior
  
      const result = await retrieveUserBooking(["mockDocId1", "mockDocId2"]);
  
      expect(getDoc).toHaveBeenCalledTimes(2);
      expect(result).toEqual([mockDocData1, mockDocData2]);
    });
  
    test("retrieveActiveBookings should fetch active bookings", async () => {
      const mockQuerySnapshot = {
        forEach: (callback) => {
          callback({ id: "doc1", data: () => ({ active: true }) });
          callback({ id: "doc2", data: () => ({ active: true }) });
        },
      };
      getDocs.mockResolvedValue(mockQuerySnapshot); // Mock getDocs behavior
  
      const result = await retrieveActiveBookings();
  
      expect(getDocs).toHaveBeenCalledTimes(1); // Firestore query reference
      expect(result).toEqual([
        { id: "doc1", data: { active: true } },
        { id: "doc2", data: { active: true } },
      ]);
    });
  
    test("checkInBooking should update booking with check-in details", async () => {
      const mockUpdateResponse = {}; // Mock the update response
      updateDoc.mockResolvedValue(mockUpdateResponse); // Mock updateDoc behavior
      
      const result = await checkInBooking("mockBookingId");
    
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(
        "mockDocRef", // Firestore document reference
        {
          checkedIn: true,
          checkedInTime: expect.any(Date), // Ensure it updates with a date
        }
      );
      expect(result).toEqual(mockUpdateResponse); // Verify result matches the mock response
    });
  });
  