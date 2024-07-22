import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { CurrentRenderContext, useNavigation } from '@react-navigation/native';

import WelcomeScreen from '../../../index';
import LoginScreen from '../index';
import SignupScreen from '../../signup/index';

//mock useNavigation
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('Welcome Screen', () => {  
  //simulate Login button press and expect useNavigation to be called
  it('Login button leads to Login Screen', () => {
    const page = render(<WelcomeScreen />);
    const loginButton = page.getByTestId('loginButton');
    fireEvent.press(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/login/index'); //expect useNavigation().navigate() to be called
  })
  
  //simulate Signup button press and expect useNavigation to be called
  it('Signup button leads to Signup Screen', () => {
    const page = render(<WelcomeScreen />);
    const signupButton = page.getByTestId('signupButton');
    fireEvent.press(signupButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/signup/index'); //expect useNavigation().navigate() to be called
  })
});