import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent, cleanup, waitForElementToBeRemoved } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, updateDoc, arrayRemove, arrayUnion, onSnapshot } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import FavouritesScreen from '../index';
import FavFoodList from '../components/favFood';
import { fetchFood } from '../../search/components/food';

jest.mock('../../search/components/food');

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

//mock firebase auth functions used in favFood.jsx
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
    };
});
 
//mock firebase firestore functions used in favFood.jsx
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
            favourites: []
        })),
    })),
    getFirestore: jest.fn(),
    updateDoc: jest.fn(),
    arrayRemove: jest.fn(),
    arrayUnion: jest.fn(),
    where: jest.fn(),
    query: jest.fn(),
    onSnapshot: jest.fn(),
}));

describe('Favourites Page: Unlike food item', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
        cleanup();
        fetchFood.mockClear();
    });

    it('food item can be unliked', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: []},
            {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: []},
            {id: '3', Name: 'chicken soup', Price: '3.2', Nutrients: []}
        ])
    
        const mockOnSnapshot = jest.fn((docRef, callback) => {
            const mockData = { favourites: ["1"] };
            callback({ data: () => mockData });
        });

        onSnapshot.mockImplementation(mockOnSnapshot);

        const page = render(<FavFoodList />);
        
        const foodItem = await waitFor(() => page.getByText('boiled egg'));
        expect(foodItem).toBeTruthy(); //food item exists before unlike 

        const likeButton = await waitFor(() => page.getByTestId('like'));
        fireEvent.press(likeButton);

        await waitFor(() => {
            expect(updateDoc).toHaveBeenCalledTimes(1);
            expect(page.queryByText('boiled egg')).toBeFalsy(); //food item does not exist on fav page after unlike button is pressed
        });
    })
});