import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 

import SignupScreen from '../index';
import LoginButton from '../components/loginButton';

global.alert = jest.fn();

//mock navigation 
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockNavigation = jest.mocked(useNavigation);

//mock firebase auth functions
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
      getAuth: jest.fn(),
      initializeAuth: jest.fn(),
    };
});
 
//mock firebase firestore functions
jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    addDoc: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    getDocs: jest.fn(() => ({
      docs: [],
    })),
    getFirestore: jest.fn(() => ({})),
}));


describe('Signup Screen', () => {  
    beforeEach(() => {
        jest.clearAllMocks();
        mockNavigation.mockReturnValue({
            navigate: jest.fn(),
        });
    });
    
    createUserWithEmailAndPassword.mockResolvedValue({
        user: { uid: '123456', email: 'sheep@email.com' }
    });

  it('Signup fails when using a username that exists in Firestore database', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [{ data: () => ({ username: 'penguin' }) }]
    });
  
    const { getByTestId } = render(<SignupScreen />);

    await waitFor(() => expect(getDocs).toHaveBeenCalled());
  
    fireEvent.changeText(getByTestId('username'), 'penguin');
    fireEvent.changeText(getByTestId('email'), 'penguin@email.com');
    fireEvent.changeText(getByTestId('password'), 'pw123456');
    fireEvent.press(getByTestId('signupButton'));
    
    await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Username already being used.');
    });

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });
});