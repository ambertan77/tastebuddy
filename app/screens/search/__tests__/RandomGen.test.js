import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import SearchScreen from '../index';
import FoodList from '../components/nutrientsFilter';
import { fetchFood } from '../components/food';
import { fetchFavs } from '../components/favourites';

jest.mock('../components/food');
jest.mock('../components/favourites');

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
    getDocs: jest.fn(() => Promise.resolve({ 
      docs: [],
    })),
    doc: jest.fn(),
    getDoc: jest.fn(() => ({
        data: jest.fn(() => ({
            favourites: ['chicken soup', 'fried rice', 'boiled egg']
        })),
    })),
    getFirestore: jest.fn(),
}));

describe('Search Screen: Random Generator (Feature 6)', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it('Feature 6: Random Pop up doesnt exist on Search Page initially', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
            {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
            {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
          ])
    
        fetchFavs.mockResolvedValueOnce([
            '1', '2'
        ])

        const page = render(<SearchScreen />);
        
        await waitFor(() => expect(page.queryByTestId('randomPopup')).toBeFalsy());
    });

    it('Feature 6: Random Generator Pop up is open when Random Box Button is pressed', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
            {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
            {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
          ])
    
        fetchFavs.mockResolvedValueOnce([
            '1', '2'
        ])

        const page = render(<SearchScreen />);
        const randomBoxButton = await waitFor(() => page.getByTestId('randomBox'));
        await waitFor(() => fireEvent.press(randomBoxButton))
        
        await waitFor(() => {
            expect(page.queryByTestId('randomPopup')).toBeTruthy();
        });
    });

    it('Feature 6: random food doesnt exist initially', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
            {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
            {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
          ])
    
        fetchFavs.mockResolvedValueOnce([
            '1', '2'
        ])

        const page = render(<SearchScreen />);

        await waitFor(() => {
            expect(page.queryByTestId('randomFood').props.data).toEqual([]);
        });
    });

    it('Feature 6: random food exists after pressing GO', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
            {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
            {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
          ])
    
        fetchFavs.mockResolvedValueOnce([
            '1', '2'
        ])

        const page = render(<SearchScreen />);
        const randomBoxButton = await waitFor(() => page.getByTestId('randomBox'));
        await waitFor(() => fireEvent.press(randomBoxButton))

        const randomGO = await waitFor(() => page.getByTestId('randomGO'));
        await waitFor(() => fireEvent.press(randomGO))

        const randomFoodName = await waitFor(() => page.queryByTestId('randomFood').props.data[0].Name)
        
        await waitFor(() => {
            expect(page.queryByTestId('randomFood').props.data).not.toEqual([]); //check that random food exists
            expect((page.queryByTestId('randomFood').props.data).length).toEqual(1); //check there is only ONE random food
        });
    });
});