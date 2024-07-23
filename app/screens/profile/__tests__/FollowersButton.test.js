import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import FollowersButton from '../components/followersButton';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
  }));
  
const mockNavigation = jest.mocked(useNavigation);
  
describe('Followers button', () => {  
  it('Followers button should call onPress when pressed', () => {
    const { getByTestId } = render(<FollowersButton onPress={mockNavigation} />);
    const followersButton = getByTestId('followers');
    fireEvent.press(followersButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
});