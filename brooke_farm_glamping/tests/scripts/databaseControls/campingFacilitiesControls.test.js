import {
    retrieveCampingFacilities,
    updateFacilities,
    addNewFacility,
    addFacilitiesBlockedDay,
  } from "../../../src/Scripts/databaseControls/campingFacilitiesControls.js";
  
  import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
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
      getDocs: jest.fn(),
      addDoc: jest.fn(),
      doc: jest.fn().mockImplementation((db, path, id) => {
        if (db === "mockFirestoreInstance" && typeof path === "string" && typeof id === "string") {
          return "mockDocRef";
        }
        throw new Error("Invalid arguments passed to doc");
      }),
      updateDoc: jest.fn(),
      arrayUnion: jest.fn(),
    };
  });
  
  describe("Camping Facilities Firestore Functions", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test("retrieveCampingFacilities should retrieve facilities successfully", async () => {
        const mockQuerySnapshot = {
            forEach: jest.fn((callback) => {
              callback({ id: "doc1", data: () => ({ active: true }) });
              callback({ id: "doc2", data: () => ({ active: true }) });
            }),
        };
        
        getDocs.mockResolvedValue(mockQuerySnapshot);
        
        const result = await retrieveCampingFacilities();
  
        expect(getFirestore).toHaveBeenCalledTimes(1);
        expect(collection).toHaveBeenCalledWith(expect.anything(), "pitches");
        expect(result).toEqual([
            { id: "doc1", data: { active: true } },
            { id: "doc2", data: { active: true } },
        ]);
    });
  
    test("retrieveCampingFacilities should reject if getDocs throws an error", async () => {
      getDocs.mockRejectedValue(new Error("No data available"));
  
      await expect(retrieveCampingFacilities()).rejects.toThrow("No data available");
    });
  


    test("updateFacilities should update facilities successfully", async () => {
      const mockUpdateResponse = {};
      updateDoc.mockResolvedValue(mockUpdateResponse);
  
      const facility = { name: "New Facility" };
      const facilityID = "mockFacilityID";
      const result = await updateFacilities(facility, facilityID);
  
      expect(getFirestore).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(expect.anything(), "pitches", facilityID);
      expect(updateDoc).toHaveBeenCalledWith("mockDocRef", facility);
      expect(result).toEqual("Facility updated successfully");
    });
  
    test("updateFacilities should reject if updateDoc throws an error", async () => {
      updateDoc.mockRejectedValue(new Error("Update failed"));
  
      await expect(updateFacilities({}, "mockFacilityID")).rejects.toThrow("Update failed");
    });


  
    test("addNewFacility should add a new facility successfully", async () => {
      const mockDocRef = { id: "mockDocId" };
      addDoc.mockResolvedValue(mockDocRef);
  
      const facility = { name: "New Facility" };
      const result = await addNewFacility(facility);
  
      expect(getFirestore).toHaveBeenCalledTimes(1);
      expect(collection).toHaveBeenCalledWith(expect.anything(), "pitches");
      expect(addDoc).toHaveBeenCalledWith("mockCollectionRef", facility);
      expect(result).toEqual("mockDocId");
    });
  
    test("addNewFacility should reject if addDoc throws an error", async () => {
      addDoc.mockRejectedValue(new Error("Add failed"));
  
      await expect(addNewFacility({})).rejects.toThrow("Add failed");
    });


  
    test("addFacilitiesBlockedDay should add a blocked day successfully", async () => {
      const mockUpdateResponse = {};
      updateDoc.mockResolvedValue(mockUpdateResponse);
  
      const blockedDay = "2024-01-01";
      const facilityID = "mockFacilityID";
      const result = await addFacilitiesBlockedDay(blockedDay, facilityID);
  
      expect(getFirestore).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(expect.anything(), "pitches", facilityID);
      expect(updateDoc).toHaveBeenCalledWith("mockDocRef", {
        blockedDays: arrayUnion(blockedDay),
      });
      expect(result).toEqual("Blocked day added successfully");
    });
  
    test("addFacilitiesBlockedDay should reject if updateDoc throws an error", async () => {
      updateDoc.mockRejectedValue(new Error("Update failed"));
  
      await expect(addFacilitiesBlockedDay("2024-01-01", "mockFacilityID")).rejects.toThrow(
        "Update failed"
      );
    });
  });
  