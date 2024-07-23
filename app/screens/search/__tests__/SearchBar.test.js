import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
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

describe('Search Screen', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it('Search Bar correctly reflects TextInput', async () => {
        const { getByTestId } = render(<SearchScreen />);
        const searchBar = getByTestId('searchBar');
        fireEvent.changeText(searchBar, "boiled egg");
        
        expect(searchBar.props.value).toBe("boiled egg");
    })

    it('Filtered food matches SearchText', async () => {
      fetchFood.mockResolvedValueOnce({ docs: ['food1', 'food2', 'food3'] }); 
      fetchFavs.mockResolvedValueOnce({ docs: ['food1', 'food2'] }); 
      
      const page = render(<FoodList />)

      expect(fetchFood).toHaveBeenCalledTimes(1);
      expect(page).toBeDefined();        
    })
});