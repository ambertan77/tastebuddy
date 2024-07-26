import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import FollowingScreen from '../index';
import UsersList from '../components/users';
import { allFollowing } from '../components/allFollowing';

jest.mock('../components/allFollowing');

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

//mock firebase auth functions used in users.jsx
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
    };
});
 
//mock firebase firestore functions used in users.jsx
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

describe('Followers Screen:', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });


    it('Following correctly reflected on screen', async () => {

        allFollowing.mockResolvedValueOnce([
            {email: "goat@email.com", id: "1", uid: "1", username: "goat"}, 
            {email: "sheep@email.com", id: "2", uid: "2", username: "sheep"}, 
            {email: "frog@email.com", id: "3", uid: "3", username: "frog"}
        ]);

        const page = render(<UsersList />);

        await waitFor(() => {
            expect(page.queryByText('goat')).toBeTruthy(); //ensure goat is on following page
            expect(page.queryByText('sheep')).toBeTruthy(); //ensure sheep is on following page
            expect(page.queryByText('frog')).toBeTruthy(); //ensure frog is on following page
            expect(page.queryByText('ninja')).toBeFalsy(); //ensure user ninja doesnt exist on following page
        })
  })

});