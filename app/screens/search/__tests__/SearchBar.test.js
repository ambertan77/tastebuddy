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

describe('Search Screen: Search Bar (Feature 4)', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it('Search Icon is green', async () => {
      const { getByTestId } = render(<SearchScreen />);
      const icon = getByTestId('search');
      
      expect(icon.props.children[0].props.children.props.color).toBe('green');
    })

    it('Feature 4: Search Bar correctly reflects TextInput', async () => {
        const { getByTestId } = render(<SearchScreen />);
        const searchBar = getByTestId('searchBar');
        fireEvent.changeText(searchBar, "boiled egg");
        
        expect(searchBar.props.value).toBe("boiled egg");
    })

    it('Feature 4: Search input results in correctly sorted food', async () => {
      fetchFood.mockResolvedValueOnce([
        {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: []},
        {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: []},
        {id: '3', Name: 'chicken soup', Price: '3.2', Nutrients: []}
      ])

      fetchFavs.mockResolvedValueOnce([
        '1', '2'
      ])

      const page = render(<FoodList input="egg" setSearchText={() => jest.fn} />);

      await waitFor(() => {
        expect(page.queryByText('boiled egg')).toBeTruthy();
        expect(page.queryByText('egg tart')).toBeTruthy();
        expect(page.queryByText('chicken soup')).toBeFalsy();
      })
  })

});