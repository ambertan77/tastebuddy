import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../components/backButton';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
  }));
  
const mockNavigation = jest.mocked(useNavigation);
  
describe('Back button', () => {  
  it('Back button should call onPress when pressed', () => {
    const { getByTestId } = render(<BackButton onPress={mockNavigation} />);
    const backButton = getByTestId('goBack');
    fireEvent.press(backButton);
    expect(mockNavigation).toHaveBeenCalled();
  })
});