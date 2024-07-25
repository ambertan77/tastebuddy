import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { db, auth } from '../../../../firebase';

import FollowersScreen from '../index'
import { allFollowers } from '../components/allFollowers';
import Users from '../components/users'

jest.mock('../components/allFollowers');
jest.mock('../components/users');

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
      docs: [{id: '1', username: 'goat', email: 'goat@email.com', uid: '1'},
        {id: '2', username: 'sheep', email: 'sheep@email.com', uid: '2'},
        {id: '3', username: 'frog', email: 'frog@email.com', uid: '3'}],
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


describe('Followers screen displays all followers in the database', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it("all followers are displayed on screen", async () => {
        allFollowers.mockResolvedValueOnce([
            {id: '1', username: 'goat', email: 'goat@email.com', uid: '1'},
            {id: '2', username: 'sheep', email: 'sheep@email.com', uid: '2'},
            {id: '3', username: 'frog', email: 'frog@email.com', uid: '3'}
        ])
        const page = render(<FollowersScreen />);
        await waitFor(() => {
            expect(page.findByText('goat')).toBeTruthy();
            expect(page.findByText('sheep')).toBeTruthy();
            expect(page.findByText('frog')).toBeTruthy();
        }, {timeout: 3000})
    });
});