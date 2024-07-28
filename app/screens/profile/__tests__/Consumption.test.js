import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import ConsumptionScreen from '../components/consumption';
import ConsumptionList from '../components/userConsumption';
import { getConsumptionData } from '../components/getConsumptionData';

jest.mock('../components/getConsumptionData');

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
            uid: '123456',
        }},
    };
});

//mock firebase auth functions used in consumption.jsx
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
    };
});
 
//mock firebase firestore functions used in consumption.jsx
jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    addDoc: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ 
      docs: [],
    })),
    doc: jest.fn(),
    getDoc: jest.fn(() => ({
        data: jest.fn(() => ({
        })),
    })),
    getFirestore: jest.fn(),
}));

describe('Search Screen: Random Generator (Feature 6)', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it('Add to food log button exists on the consumption history component', async () => {

        getConsumptionData.mockResolvedValueOnce([
            {Date: "29/6", Meal: "dinner", Name: "bibimbap", uid: "1"}, 
            {Date: "28/7", Meal: "breakfast", Name: "egg", uid: "2"}
        ]);

        const { getByTestId } = render(<ConsumptionScreen />);

        const addFoodButton = getByTestId('addFoodButton');
        expect(addFoodButton).toBeDefined();
    });

    it('food log reflects all data', async () => {

        getConsumptionData.mockResolvedValueOnce([
            {Date: "29/6", Meal: "dinner", Name: "bibimbap", uid: "1"}, 
        ])

        const { queryByText } = await waitFor(() => render(<ConsumptionList />));
        
        expect(queryByText('bibimbap')).toBeTruthy();
        expect(queryByText('29/6, dinner')).toBeTruthy();
        
    });

    it('Add to food log button opens popup when pressed', async () => {

        getConsumptionData.mockResolvedValueOnce([
            {Date: "29/6", Meal: "dinner", Name: "bibimbap", uid: "1"}, 
        ])

        const { queryByTestId, getByTestId } = render(<ConsumptionScreen />);
        const addFoodButton = getByTestId('addFoodButton');
        const addFoodPopup = queryByTestId('addFoodPopup');

        expect(addFoodPopup).toBeNull();

        await waitFor(() => fireEvent.press(addFoodButton));
        
        expect(queryByTestId('addFoodPopup')).not.toBeNull();
    });

    it('Popup text inputs correctly reflect text inputs', async () => {

        getConsumptionData.mockResolvedValueOnce([
            {Date: "29/6", Meal: "dinner", Name: "bibimbap", uid: "1"}, 
        ])

        const { queryByTestId, getByTestId } = render(<ConsumptionScreen />);

        const addFoodButton = getByTestId('addFoodButton');
        const addFoodPopup = queryByTestId('addFoodPopup');
        expect(addFoodPopup).toBeNull();

        await waitFor(() => fireEvent.press(addFoodButton));
        expect(queryByTestId('addFoodPopup')).not.toBeNull();

        await waitFor(() => fireEvent.changeText(queryByTestId('foodName'), 'chicken soup'));
        expect(queryByTestId('foodName').props.value).toBe('chicken soup');

        await waitFor(() => fireEvent.changeText(queryByTestId('consumptionDate'), '27/7'));
        expect(queryByTestId('consumptionDate').props.value).toBe('27/7');

        await waitFor(() => fireEvent.changeText(queryByTestId('mealType'), 'dinner'));
        expect(queryByTestId('mealType').props.value).toBe('dinner');
    });

    it('Newly added food is reflected in Food Log', async () => {

        getConsumptionData.mockResolvedValueOnce([
            {Date: "29/6", Meal: "dinner", Name: "bibimbap", uid: "1"}, 
        ])

        const { queryByTestId, getByTestId, queryByText } = render(<ConsumptionScreen />);

        const addFoodButton = getByTestId('addFoodButton');
        const addFoodPopup = queryByTestId('addFoodPopup');
        expect(addFoodPopup).toBeNull();

        await waitFor(() => fireEvent.press(addFoodButton));
        expect(queryByTestId('addFoodPopup')).not.toBeNull();

        await waitFor(() => fireEvent.changeText(queryByTestId('foodName'), 'chicken soup'));
        expect(queryByTestId('foodName').props.value).toBe('chicken soup');

        await waitFor(() => fireEvent.changeText(queryByTestId('consumptionDate'), '27/7'));
        expect(queryByTestId('consumptionDate').props.value).toBe('27/7');

        await waitFor(() => fireEvent.changeText(queryByTestId('mealType'), 'dinner'));
        expect(queryByTestId('mealType').props.value).toBe('dinner');

        getConsumptionData.mockResolvedValueOnce([
            { Date: '29/6', Meal: 'dinner', Name: 'bibimbap', uid: '1' },
            { Date: '28/7', Meal: 'breakfast', Name: 'egg', uid: '2' },
            { Date: '27/7', Meal: 'dinner', Name: 'chicken soup', uid: '3' },
        ]);
      
        await waitFor(() => fireEvent.press(queryByTestId('addButton')));
        expect(queryByTestId('addFoodPopup')).toBeNull();
      
        await waitFor(() => {
            expect(queryByText('27/7, dinner')).toBeTruthy();
            expect(queryByText('chicken soup')).toBeTruthy();
        });

    });

    it('Close popup when "Head back to your profile" button is pressed', async () => {

        getConsumptionData.mockResolvedValueOnce([
            {Date: "29/6", Meal: "dinner", Name: "bibimbap", uid: "1"}, 
        ])

        const { queryByTestId, getByTestId } = render(<ConsumptionScreen />);

        const addFoodButton = getByTestId('addFoodButton');
        await waitFor(() => fireEvent.press(addFoodButton));
        const addFoodPopupOpened = queryByTestId('addFoodPopup');
        expect(addFoodPopupOpened).not.toBeNull();
            
        const backButton = getByTestId('goBack');
        await waitFor(() => fireEvent.press(backButton));
        const addFoodPopup = queryByTestId('addFoodPopup');
        expect(addFoodPopup).toBeNull();
        
    });

});