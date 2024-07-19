import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import LoginScreen from '../index';
import SignupButton from '../components/signupButton';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockNavigation = jest.mocked(useNavigation);

describe('LoginScreen', () => {  
  it('login button exists on login page', () => {
    const page = render(<LoginScreen />);
    const loginButton = page.getByTestId('loginButton');
    expect(loginButton).toBeDefined();
  })
  
  it('should go to home page', () => {
    const page = render(<LoginScreen />);
    const loginButton = page.getByTestId('loginButton');
    fireEvent.press(loginButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
});