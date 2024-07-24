import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import FollowersButton from '../components/followersButton';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
  
describe('Followers button', () => {  
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Followers button should navigate to the correct screen when pressed', () => {
    const { getByTestId } = render(<FollowersButton />);
    const followersButton = getByTestId('followers');
    fireEvent.press(followersButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/followers/index');
  })
});