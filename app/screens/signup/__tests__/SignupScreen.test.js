import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import SignupScreen from '../index';
import LoginButton from '../components/loginButton';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockNavigation = jest.mocked(useNavigation);

describe('Signup Screen', () => {  
  it('Signup button should go to home page on Press', () => {
    const page = render(<SignupScreen />);
    const signupButton = page.getByTestId('signupButton');
    fireEvent.press(signupButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
});