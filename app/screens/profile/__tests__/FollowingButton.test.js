import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import FollowingButton from '../components/followingButton';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
  }));
  
const mockNavigation = jest.mocked(useNavigation);
  
describe('Following button', () => {  
  it('Following button should call onPress when pressed', () => {
    const { getByTestId } = render(<FollowingButton onPress={mockNavigation} />);
    const followingButton = getByTestId('following');
    fireEvent.press(followingButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
});