import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { db, auth } from '../../../../firebase';

import Consumption from '../components/consumption';
import UserConsumption from '../components/userConsumption';
import { getConsumptionData } from '../components/getConsumptionData';

jest.mock('../components/getConsumptionData')

//mock alert function 
global.alert = jest.fn();

//mock useNavigation 
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

//mock firebase functions
jest.mock('../../../../firebase', () => {
    const originalModule = jest.requireActual('../../../../firebase');
    return {
      ...originalModule,
      auth: {
        currentUser: {
            uid: '0',
        }},
    };
});

//mock firebase auth functions used in signup/index
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
    };
});
 
//mock firebase firestore functions used in signup/index
jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    addDoc: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(() => ({ 
      docs: [{id: '1', Name: 'bibimbap', Date: '26/7', Meal: 'lunch'},
        {id: '2', Name: 'noodles soup', Date: '26/7', uid: 'dinner'},
        {id: '3', username: 'chicken sandwich', email: '27/7', uid: 'breakfast'}],
    })),
    doc: jest.fn(),
    getDoc: jest.fn(() => ({
        data: jest.fn(() => ({
            username: "tester", 
            email: "tester@email.com", 
            uid: "0" 
        })),
    })),
    getFirestore: jest.fn(),
    updateDoc: jest.fn(),
    arrayRemove: jest.fn(),
    arrayUnion: jest.fn(),
    where: jest.fn(),
    query: jest.fn()
}));

  
const mockNavigation = jest.mocked(useNavigation);
  
describe('Add to food log button', () => {  
  it('Add to food log button exists on the consumption history component', () => {
    const { getByTestId } = render(<Consumption />);
    const addFoodButton = getByTestId('addFoodButton');
    expect(addFoodButton).toBeDefined();
  });

  it('food log reflects all data', async () => {
    getConsumptionData.mockResolvedValueOnce([
      {id: '1', Name: 'bibimbap', Date: '26/7', Meal: 'lunch'},
    ])
    const component = render(<UserConsumption />);
    await waitFor(() => {
      expect(component.findByText('bibimbap')).toBeTruthy();
      expect(component.findByText('26/7')).toBeTruthy();
      expect(component.findByText('lunch')).toBeTruthy();
    }, {timeout: 3000})
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