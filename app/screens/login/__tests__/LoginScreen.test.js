import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 

import LoginScreen from '../index';
import SignupButton from '../components/signupButton';

//mock the alert function used in screens/login/index
global.alert = jest.fn();

//mock useNavigation 
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

//mock firebase auth functions used in login/index file 
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      signInWithEmailAndPassword: jest.fn(),
    };
});

describe('Login Screen', () => {  
  beforeEach(() => {
    jest.clearAllMocks(); //clear all mocks before each test case 
  });

  it('Login is successful', async () => {
    
    signInWithEmailAndPassword.mockResolvedValue({
        user: { email: 'penguin@email.com', password: 'pw123456' }
    }); //determines what happens when signInWithEmailAndPassword function is called
    
    const { getByTestId } = render(<LoginScreen />); 

    fireEvent.changeText(getByTestId('email'), 'penguin@email.com'); //adds text to email textInput
    fireEvent.changeText(getByTestId('password'), 'pw123456'); //adds text to password textInput
    fireEvent.press(getByTestId('loginButton')); //presses login button
    
    await waitFor(() => {
        expect(signInWithEmailAndPassword).toHaveBeenCalled(); //expect signInWithEmailAndPassword function to be called with onPress of button
        expect(mockNavigate).toHaveBeenCalledWith('screens/home/index'); //expect useNavigation().navigate() to be called, user directed to home 
        expect(getByTestId('email').props.value).toBe('penguin@email.com'); //expect email textInput value prop to be 'penguin@email.com'
        expect(getByTestId('password').props.value).toBe('pw123456'); //expect password textInput value prop to be 'pw123456'
    });
  });

  it('Sign up button should go to Sign up page on Press', () => {
    const page = render(<SignupButton />);
    const signupButton = page.getByTestId('signupButton')
    fireEvent.press(signupButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/signup/index'); //expect useNavigation().navigate() to be called, user directed to sign up page
  });
});