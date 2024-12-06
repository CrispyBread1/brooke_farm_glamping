import {
    addUser,
    retrieveUser,
    addBookingToUser,
  } from "../../../src/Scripts/databaseControls/userControls.js";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
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
      doc: jest.fn().mockImplementation((db, path, id) => {
        if (db === "mockFirestoreInstance" && typeof path === "string" && typeof id === "string") {
          return "mockDocRef";
        }
        throw new Error("Invalid arguments passed to doc");
      }),
      setDoc: jest.fn(),
      getDoc: jest.fn(),
      getDocs: jest.fn(),
      updateDoc: jest.fn(),
      arrayUnion: jest.fn(),
    };
  });
  
  describe("Firebase Functions", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe("addUser", () => {
        it("should add a user successfully", async () => {
          setDoc.mockResolvedValue(); // Simulate successful write
      
          const mockUser = { name: "John Doe" };
          const mockUID = "mockUID";
      
          const result = await addUser(mockUser, mockUID);
      
          expect(getFirestore).toHaveBeenCalledTimes(1);
          expect(doc).toHaveBeenCalledWith(expect.anything(), "users", mockUID);
          expect(setDoc).toHaveBeenCalledWith("mockDocRef", mockUser);
          expect(result).toEqual(mockUID);
        });
      
        it("should reject if setDoc fails", async () => {
          setDoc.mockRejectedValue(new Error("Failed to add user")); // Simulate failure
      
          const mockUser = { name: "John Doe", id:"mockUID" };
          const mockUID = "mockUID";
      
          await expect(addUser(mockUser, mockUID)).rejects.toThrow("Failed to add user");
      
          expect(setDoc).toHaveBeenCalledTimes(1);
        });
      });
      
  
    describe("retrieveUser", () => {
      it("should fetch a user successfully", async () => {
        const mockUserData = { name: "John Doe" };
        const mockDocSnap = {
          exists: () => true,
          data: () => mockUserData,
        };
        getDoc.mockResolvedValue(mockDocSnap);
  
        const mockUserID = "mockUserID";
        const result = await retrieveUser(mockUserID);
  
        expect(getFirestore).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(expect.anything(), "users", mockUserID);
        expect(getDoc).toHaveBeenCalledWith("mockDocRef");
        expect(result).toEqual(mockUserData);
      });
  
      it("should log an error if the user does not exist", async () => {
        const mockDocSnap = {
          exists: () => false,
        };
        console.log = jest.fn();
        getDoc.mockResolvedValue(mockDocSnap);
  
        const mockUserID = "mockUserID";
        const result = await retrieveUser(mockUserID);
  
        expect(console.log).toHaveBeenCalledWith("No such document!");
        expect(result).toBeUndefined();
      });
  
      it("should reject if getDoc fails", async () => {
        getDoc.mockRejectedValue(new Error("Failed to fetch user"));
  
        const mockUserID = "mockUserID";
        await expect(retrieveUser(mockUserID)).rejects.toThrow("Failed to fetch user");
  
        expect(getDoc).toHaveBeenCalledTimes(1);
      });
    });
  
    describe("addBookingToUser", () => {
        it("should add a booking to the user's document successfully", async () => {
          updateDoc.mockResolvedValue(); // Simulate successful update
      
          const mockBookingID = "mockBookingID";
          const mockUserID = "mockUserID";
      
          const result = await addBookingToUser(mockBookingID, mockUserID);
      
          expect(getFirestore).toHaveBeenCalledTimes(1);
          expect(doc).toHaveBeenCalledWith(expect.anything(), "users", mockUserID);
          expect(updateDoc).toHaveBeenCalledWith("mockDocRef", {
            bookings: arrayUnion(mockBookingID),
          });
          expect(result).toEqual(mockUserID);
        });
      
        it("should reject if updateDoc fails", async () => {
          updateDoc.mockRejectedValue(new Error("Failed to add booking")); // Simulate failure
      
          const mockBookingID = "mockBookingID";
          const mockUserID = "mockUserID";
      
          await expect(addBookingToUser(mockBookingID, mockUserID)).rejects.toThrow(
            "Failed to add booking"
          );
      
          expect(updateDoc).toHaveBeenCalledTimes(1);
        });
    });
      
});
  