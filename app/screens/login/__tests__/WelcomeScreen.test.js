import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import WelcomeScreen from '../../../index';
import LoginScreen from '../index';
import SignupScreen from '../../signup/index';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockNavigation = jest.mocked(useNavigation);

describe('Welcome Screen', () => {  
  it('Login button leads to Login Screen', () => {
    const page = render(<WelcomeScreen />);
    const loginButton = page.getByTestId('loginButton');
    fireEvent.press(loginButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
  
  it('Signup button leads to Signup Screen', () => {
    const page = render(<WelcomeScreen />);
    const signupButton = page.getByTestId('signupButton');
    fireEvent.press(signupButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
});