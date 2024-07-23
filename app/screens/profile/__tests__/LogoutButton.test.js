import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import LogoutButton from '../components/logoutButton';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
  }));
  
const mockNavigation = jest.mocked(useNavigation);
  
describe('Logout button', () => {  
  it('Logout button should call onPress when pressed', () => {
    const { getByTestId } = render(<LogoutButton onPress={mockNavigation} />);
    const logoutButton = getByTestId('logout');
    fireEvent.press(logoutButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
});