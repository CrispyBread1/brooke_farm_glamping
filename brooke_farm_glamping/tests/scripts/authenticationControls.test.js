import {logInEmailPassword, registerNewAccountEmailPassword, logOut } from '../../src/Scripts/authenticationControls.js'; // Adjust the import path based on your project structure
  
  import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  } from 'firebase/auth';
  
  // Mock Firebase Authentication
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => 'mockAuthInstance'),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  }));
  
  describe('Firebase Authentication Functions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('logInEmailPassword', () => {
      it('should log in the user successfully with email and password', async () => {
        const mockUserCredential = { user: { uid: '12345', email: 'test@example.com' } };
        signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
  
        const email = 'test@example.com';
        const password = 'password123';
  
        const result = await logInEmailPassword(email, password);
  
        expect(getAuth).toHaveBeenCalledTimes(1);
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith('mockAuthInstance', email, password);
        expect(result).toEqual(mockUserCredential);
      });
  
      it('should throw an error if log in fails', async () => {
        const mockError = new Error('Invalid login credentials');
        signInWithEmailAndPassword.mockRejectedValue(mockError);
  
        const email = 'wrong@example.com';
        const password = 'wrongpassword';
  
        await expect(logInEmailPassword(email, password)).rejects.toThrow('Invalid login credentials');
        expect(getAuth).toHaveBeenCalledTimes(1);
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith('mockAuthInstance', email, password);
      });
    });
  
    describe('registerNewAccountEmailPassword', () => {
      it('should register a new user successfully with email and password', async () => {
        const mockUserCredential = { user: { uid: '67890', email: 'newuser@example.com' } };
        createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
  
        const email = 'newuser@example.com';
        const password = 'securePassword123';
  
        const result = await registerNewAccountEmailPassword(email, password);
  
        expect(getAuth).toHaveBeenCalledTimes(1);
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith('mockAuthInstance', email, password);
        expect(result).toEqual(mockUserCredential);
      });
  
      it('should throw an error if registration fails', async () => {
        const mockError = new Error('Email already in use');
        createUserWithEmailAndPassword.mockRejectedValue(mockError);
  
        const email = 'existinguser@example.com';
        const password = 'password123';
  
        await expect(registerNewAccountEmailPassword(email, password)).rejects.toThrow('Email already in use');
        expect(getAuth).toHaveBeenCalledTimes(1);
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith('mockAuthInstance', email, password);
      });
    });
  
    describe('logOut', () => {
      it('should log out the user successfully', async () => {
        signOut.mockResolvedValue();
  
        await logOut();
  
        expect(getAuth).toHaveBeenCalledTimes(1);
        expect(signOut).toHaveBeenCalledWith('mockAuthInstance');
      });
  
      it('should throw an error if log out fails', async () => {
        const mockError = new Error('Failed to log out');
        signOut.mockRejectedValue(mockError);
  
        await expect(logOut()).rejects.toThrow('Failed to log out');
        expect(getAuth).toHaveBeenCalledTimes(1);
        expect(signOut).toHaveBeenCalledWith('mockAuthInstance');
      });
    });
  });
  