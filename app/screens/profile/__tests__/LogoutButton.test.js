import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import LogoutButton from '../components/logoutButton';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
  
describe('Logout button', () => {  
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Logout button should navigate to the correct screen when pressed', () => {
    const { getByTestId } = render(<LogoutButton />);
    const logoutButton = getByTestId('logout');
    fireEvent.press(logoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('index');
  })
});