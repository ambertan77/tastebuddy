import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import AddFriendsButton from '../components/addFriends';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
  
describe('Add friends button', () => {  
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Add friends button should navigate to the correct screen when pressed', () => {
    const { getByTestId } = render(<AddFriendsButton />);
    const addFriendsButton = getByTestId('addFriends');
    fireEvent.press(addFriendsButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/userlist/index');
  })
});