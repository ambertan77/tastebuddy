import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
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
    updateDoc: jest.fn(),
    arrayRemove: jest.fn(),
    arrayUnion: jest.fn(),
}));

describe('Search Screen: Like a food item (Feature 7)', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it('Feature 7: Food is liked (heart icon is pressed)', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
          ])
    
        fetchFavs.mockResolvedValueOnce([])

        const page = render(<SearchScreen />);
        const heartIcon = await waitFor(() => page.findByTestId('heart'));
        await waitFor(() => userEvent.press(heartIcon))
        
        await waitFor(() => expect(heartIcon.props.children[0].props.name).toBe('heart')); //ensure that name of icon used is heart and not hearto (heart outline)
        await waitFor(() => expect(updateDoc).toHaveBeenCalledTimes(1)); //ensure that updateDoc has been called once (in handlePressLike function in nutriFilter.jsx)
    });

    it('Feature 7: heart icon is already filled heart when food is in favourites in db', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
          ])
    
        fetchFavs.mockResolvedValueOnce([
            "1"
        ])

        const page = render(<SearchScreen />);
        const heartIcon = await waitFor(() => page.findByTestId('heart'));
        
        await waitFor(() => expect(heartIcon.props.children[0].props.name).toBe('heart')); //ensure that name of icon used is heart and not hearto (heart outline)
        await waitFor(() => expect(updateDoc).toHaveBeenCalledTimes(0)); //ensure that updateDoc has NOT been called once (handlePressLike function NOT called)
    });

    it('Feature 7: heart icon becomes an outlined heart when food is unliked', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
          ])
    
        fetchFavs.mockResolvedValueOnce([
            "1"
        ])

        const page = render(<SearchScreen />);
        const heartIcon = await waitFor(() => page.findByTestId('heart'));
        await waitFor(() => userEvent.press(heartIcon))
        
        await waitFor(() => expect(heartIcon.props.children[0].props.name).toBe('hearto')); //ensure that name of icon used is heart and not hearto (heart outline)
        await waitFor(() => expect(updateDoc).toHaveBeenCalledTimes(1)); //ensure that updateDoc has NOT been called once (handlePressLike function NOT called)
    });

});