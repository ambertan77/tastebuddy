import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import FollowingButton from '../components/followingButton';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
  
describe('Following button', () => {  
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Following button should navigate to the correct screen when pressed', () => {
    const { getByTestId } = render(<FollowingButton />);
    const followingButton = getByTestId('following');
    fireEvent.press(followingButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/following/index');
  })
});