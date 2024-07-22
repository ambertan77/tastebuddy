import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 

import SignupScreen from '../index';
import LoginButton from '../components/loginButton';

//mock alert function 
global.alert = jest.fn();

//mock useNavigation 
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

//mock firebase auth functions used in signup/index
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
    };
});
 
//mock firebase firestore functions used in signup/index
jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    addDoc: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ 
      docs: [],
    })),
    getFirestore: jest.fn(),
}));


describe('Signup Screen', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

  it('Signup fails when using a username that exists in Firestore database', async () => { //checks if duplicate username login in handleSignup works
    createUserWithEmailAndPassword.mockResolvedValue({ //substitute method for the one in signup/index
        user: { uid: '123456', username: 'penguin', email: 'penguin@email.com', password: 'pw123456' }
    }); 

    getDocs.mockResolvedValue({ //substitute method for the one in signup/index
      docs: [{ data: () => ({ username: 'penguin' }) }]
    });
  
    const { getByTestId } = render(<SignupScreen />);

    await waitFor(() => expect(getDocs).toHaveBeenCalled()); //wait for getDocs method to be called on mount, to mock the fetching of usernames
  
    fireEvent.changeText(getByTestId('username'), 'penguin');
    fireEvent.changeText(getByTestId('email'), 'penguin@email.com');
    fireEvent.changeText(getByTestId('password'), 'pw123456');
    fireEvent.press(getByTestId('signupButton')); //calls the handleSignup function 
    
    await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Username already being used.'); //handle signup function returns an alert 
    });

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('Signup is successful when using an email and username that does not exist in Firestore database', async () => {
    
    createUserWithEmailAndPassword.mockResolvedValue({ //substitute method for the one in signup/index
        user: { uid: '123456', username: 'penguin', email: 'penguin@email.com', password: 'pw123456' }
    });
  
    getDocs.mockResolvedValue({ //substitute method for the one in signup/index
        docs: [{ data: () => ({ username: 'sheep' }) }]
    });
    
    const { getByTestId } = render(<SignupScreen />);
  
    await waitFor(() => expect(getDocs).toHaveBeenCalled());

    fireEvent.changeText(getByTestId('username'), 'penguin');
    fireEvent.changeText(getByTestId('email'), 'penguin@email.com');
    fireEvent.changeText(getByTestId('password'), 'pw123456');
    fireEvent.press(getByTestId('signupButton'));
    
    await waitFor(() => {
        expect(global.alert).not.toHaveBeenCalledWith('Username already being used.'); //expect no alert
        expect(createUserWithEmailAndPassword).toHaveBeenCalled(); //expect createUserWithEmailAndPassword to be successfully called
        expect(mockNavigate).toHaveBeenCalledWith('screens/home/index'); //handleSignup function causes useNavigation().navigate to be called 
    });
  });

  it('Login button should go to Login page on Press', () => {
    const page = render(<LoginButton />);
    const loginButton = page.getByTestId('loginButton');
    fireEvent.press(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/login/index'); //expect useNavigation().navigate() to be called, user directed to login page
  });

});