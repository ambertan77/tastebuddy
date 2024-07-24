import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../components/backButton';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
  
describe('Back button', () => {  
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Back button should navigate to the correct screen when pressed', () => {
    const { getByTestId } = render(<BackButton />);
    const backButton = getByTestId('goBack');
    fireEvent.press(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/profile/index');
  })
});