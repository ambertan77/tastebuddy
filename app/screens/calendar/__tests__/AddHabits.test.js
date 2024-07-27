import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import AddHabitsButton from '../components/addHabits';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
  
describe('Add habits button', () => {  
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Add habits button should navigate to the correct screen when pressed', () => {
    const { getByTestId } = render(<AddHabitsButton />);
    const addHabitsButton = getByTestId('add');
    fireEvent.press(addHabitsButton);
    expect(mockNavigate).toHaveBeenCalledWith('screens/habit/index');
  })
});