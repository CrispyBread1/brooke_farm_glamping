import {
  addBooking,
  retrieveBooking,
  retrieveUserBooking,
  retrieveActiveBookings,
  checkInBooking,
} from "../../../src/Scripts/databaseControls/bookingControls.js";

import {
  initializeApp,
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore");
  
  return {
    ...originalModule,
    getFirestore: jest.fn().mockReturnValue("mockFirestoreInstance"),
    collection: jest.fn().mockImplementation((db, path) => {
      if (db === "mockFirestoreInstance" && typeof path === "string") {
        return "mockCollectionRef";
      }
      throw new Error("Invalid arguments passed to collection");
    }),
    addDoc: jest.fn(),
    doc: jest.fn().mockImplementation((db, path, id) => {
      if (db === "mockFirestoreInstance" && typeof path === "string" && typeof id === "string") {
        return "mockDocRef";
      }
      throw new Error("Invalid arguments passed to doc");
    }),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    updateDoc: jest.fn(),
  };
});

describe("Firestore Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addBooking", () => {
    describe("when addDoc resolves successfully", () => {
      test("should add a booking successfully", async () => {
        const mockDocRef = { id: "mockDocId" };
        addDoc.mockResolvedValue(mockDocRef);

        const mockBooking = {
          toFirestore: jest.fn().mockReturnValue({ user: "testUser" }),
        };

        const result = await addBooking(mockBooking);

        expect(getFirestore).toHaveBeenCalledTimes(1);
        expect(collection).toHaveBeenCalledWith(expect.anything(), "bookings");
        expect(addDoc).toHaveBeenCalledWith("mockCollectionRef", mockBooking.toFirestore());
        expect(result).toEqual(mockDocRef);
      });
    });

    describe("when addDoc throws an error", () => {
      test("should reject on error", async () => {
        addDoc.mockRejectedValue(new Error("Add booking failed"));

        const mockBooking = {
          toFirestore: jest.fn().mockReturnValue({ user: "testUser" }),
        };

        await expect(addBooking(mockBooking)).rejects.toThrow("Add booking failed");

        expect(addDoc).toHaveBeenCalledTimes(1);
      });
    });

    describe("when addDoc returns null", () => {
      test("should reject with 'No data available'", async () => {
        addDoc.mockResolvedValue(null);

        const mockBooking = {
          toFirestore: jest.fn().mockReturnValue({ user: "testUser" }),
        };

        await expect(addBooking(mockBooking)).rejects.toThrow("No data available");

        expect(getFirestore).toHaveBeenCalledTimes(1);
        expect(collection).toHaveBeenCalledWith("mockFirestoreInstance", "bookings");
        expect(addDoc).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("retrieveBooking", () => {
    describe("when getDoc resolves successfully", () => {
      test("should fetch a specific booking", async () => {
        const mockDocSnap = {
          exists: () => true,
          data: () => ({ user: "testUser", id: "mockDocId" }),
        };
        getDoc.mockResolvedValue(mockDocSnap);

        const result = await retrieveBooking("mockBookingId");

        expect(getFirestore).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(expect.anything(), "bookings", "mockBookingId");
        expect(getDoc).toHaveBeenCalledWith("mockDocRef");
        expect(result).toEqual(mockDocSnap.data());
      });
    });

    describe("when getDoc throws an error", () => {
      test("should log the error", async () => {
        console.log = jest.fn();
        getDoc.mockRejectedValue(new Error("Retrieve booking failed"));

        await retrieveBooking("mockBookingId");

        expect(console.log).toHaveBeenCalledWith(new Error("Retrieve booking failed"));
      });
    });
  });

  describe("retrieveUserBooking", () => {
    describe("when fetching multiple bookings", () => {
      test("should return all bookings", async () => {
        const mockDocSnap = {
          exists: () => true,
          data: jest.fn().mockReturnValue({ user: "testUser" }),
        };
        getDoc.mockResolvedValue(mockDocSnap);

        const result = await retrieveUserBooking(["id1", "id2"]);

        expect(getFirestore).toHaveBeenCalledTimes(1);
        expect(getDoc).toHaveBeenCalledTimes(2);
        expect(result).toEqual([{ user: "testUser" }, { user: "testUser" }]);
      });
    });

    describe("when no booking IDs are provided", () => {
      test("should return an empty list", async () => {
        const result = await retrieveUserBooking([]);

        expect(result).toEqual([]);
        expect(getDoc).not.toHaveBeenCalled();
      });
    });

    describe("when getDoc throws an error", () => {
      test("should log the error", async () => {
        console.log = jest.fn();
        getDoc.mockRejectedValue(new Error("Retrieve user booking failed"));

        await retrieveUserBooking(["id1"]);

        expect(console.log).toHaveBeenCalledWith(new Error("Retrieve user booking failed"));
      });
    });
  });

  describe("retrieveActiveBookings", () => {
    describe("when fetching active bookings", () => {
      test("should return all active bookings", async () => {
        const mockQuerySnapshot = {
          forEach: jest.fn((callback) => {
            callback({ id: "doc1", data: () => ({ active: true }) });
            callback({ id: "doc2", data: () => ({ active: true }) });
          }),
        };
        getDocs.mockResolvedValue(mockQuerySnapshot);

        const result = await retrieveActiveBookings();

        expect(getFirestore).toHaveBeenCalledTimes(1);
        expect(collection).toHaveBeenCalledWith(expect.anything(), "bookings");
        expect(query).toHaveBeenCalledWith("mockCollectionRef", where("active", "==", true));
        expect(getDocs).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
          { id: "doc1", data: { active: true } },
          { id: "doc2", data: { active: true } },
        ]);
      });
    });

    describe("when getDocs throws an error", () => {
      test("should return the error", async () => {
        getDocs.mockRejectedValue(new Error("Retrieve active bookings failed"));

        const result = await retrieveActiveBookings();

        expect(result).toEqual(new Error("Retrieve active bookings failed"));
      });
    });
  });

  describe("checkInBooking", () => {
    describe("when updateDoc resolves successfully", () => {
      test("should update booking successfully", async () => {
        const mockUpdateResponse = {};
        updateDoc.mockResolvedValue(mockUpdateResponse);
  
        const result = await checkInBooking("mockBookingId");
  
        expect(getFirestore).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(expect.anything(), "bookings", "mockBookingId");
        expect(updateDoc).toHaveBeenCalledWith("mockDocRef", {
          checkedIn: true,
          checkedInTime: expect.any(Date),
        });
        expect(result).toEqual(mockUpdateResponse);
      });
    });
  
    describe("when updateDoc throws an error", () => {
      test("should reject with an error", async () => {
        const mockError = new Error("Check-in failed");
        updateDoc.mockRejectedValue(mockError);
  
        await expect(checkInBooking("mockBookingId")).rejects.toThrow("Check-in failed");
  
        expect(updateDoc).toHaveBeenCalledTimes(1);
      });
    });
  
    describe("when updateDoc resolves to null", () => {
      test("should reject with 'Failed to update booking'", async () => {
        updateDoc.mockResolvedValue(null);
  
        await expect(checkInBooking("mockBookingId")).rejects.toThrow("Failed to update booking");
  
        expect(updateDoc).toHaveBeenCalledTimes(1);
      });
    });
  });
  
});

