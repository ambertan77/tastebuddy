import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import AddFriends from '../components/addFriends';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
  }));
  
const mockNavigation = jest.mocked(useNavigation);
  
describe('Add friends button', () => {  
  it('Add friends button should call onPress when pressed', () => {
    const { getByTestId } = render(<AddFriends onPress={mockNavigation} />);
    const addFriendsButton = getByTestId('addFriends');
    fireEvent.press(addFriendsButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
});