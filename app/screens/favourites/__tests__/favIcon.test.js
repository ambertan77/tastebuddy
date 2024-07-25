import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent, cleanup } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import FavouritesScreen from '../index';
import FavFoodList from '../components/favFood';
import { fetchFood } from '../../search/components/food';
import { fetchFavs } from '../../search/components/favourites';

jest.mock('../../search/components/food');
jest.mock('../../search/components/favourites');

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
    where: jest.fn(),
    query: jest.fn(),
}));

describe('Favourites Page: Post a food item (Feature 8)', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
        cleanup();
        fetchFood.mockClear();
        fetchFavs.mockClear();
    });

    it('Favourites Icon is green', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
          ])
    
        fetchFavs.mockResolvedValueOnce([])

        const page = render(<FavouritesScreen />);
        const icon = page.getByTestId('favourites');
        
        expect(icon.props.children[0].props.children.props.color).toEqual('green');
    })
});