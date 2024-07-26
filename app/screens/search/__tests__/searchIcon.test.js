import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import SearchScreen from '../index';

//mock firebase auth function
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

//mock firebase firestore functions used in nutrientsFilter.jsx
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
}));

describe('Search Screen: Navigation Bar Test', () => {  

    it('Search Icon is green', async () => {
      const { getByTestId } = render(<SearchScreen />);
      const icon = getByTestId('search');
      
      expect(icon.props.children[0].props.children.props.color).toBe('green');
    })

});