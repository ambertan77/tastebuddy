import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import Consumption from '../components/consumption';

//mock firebase functions
jest.mock('../../../../firebase', () => { 
    const originalModule = jest.requireActual('../../../../firebase');
    return {
      ...originalModule,
      auth: {
        currentUser: {
            uid: '123456',
        }},
    };
});
 
//mock firebase firestore functions
jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    getDoc: jest.fn(() => ({
        data: jest.fn(() => ({
            uid: '123456',
            email: 'sheep@email.com',
            username: 'sheep'
        })),
    })),
    getFirestore: jest.fn(() => ({})),
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

//mock the alert function used in screens/login/index
global.alert = jest.fn();
  
const mockNavigation = jest.mocked(useNavigation);
  
describe('Add to food log button', () => {  
  it('Add to food log button exists on the consumption history component', () => {
    const { getByTestId } = render(<Consumption />);
    const addFoodButton = getByTestId('addFoodButton');
    expect(addFoodButton).toBeDefined();
  });

  it('Add to food log button opens popup when pressed', async () => {
    const { queryByTestId, getByTestId } = render(<Consumption />);
    const addFoodButton = getByTestId('addFoodButton');
    const addFoodPopup = queryByTestId('addFoodPopup');
    expect(addFoodPopup).toBeNull();
    fireEvent.press(addFoodButton);
    await waitFor(() => {
        const addFoodPopupOpened = queryByTestId('addFoodPopup');
        expect(addFoodPopupOpened).not.toBeNull();
    });
  });

  it('Close popup when "Head back to your profile" button is pressed', async () => {
    const { queryByTestId, getByTestId } = render(<Consumption />);
    const addFoodButton = getByTestId('addFoodButton');
    fireEvent.press(addFoodButton);
    await waitFor(() => {
        const addFoodPopupOpened = queryByTestId('addFoodPopup');
        expect(addFoodPopupOpened).not.toBeNull();
        const backButton = getByTestId('goBack');
        fireEvent.press(backButton);
    });
    await waitFor(() => {
        const addFoodPopup = queryByTestId('addFoodPopup');
        expect(addFoodPopup).toBeNull();
    })
  });
});