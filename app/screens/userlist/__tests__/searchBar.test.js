import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import UserListScreen from '../index';
import FilteredList from '../components/filtered';
import { fetchUsers } from '../components/fetchUsers';

jest.mock('../components/fetchUsers');

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
    getDocs: jest.fn(() => Promise.resolve({ 
      docs: [],
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

describe('search bar in page displaying all users', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it('search bar in userlist screen correctly reflects text input', async () => {
        const { getByTestId } = render(<UserListScreen />);
        const searchBar = getByTestId('searchBar');
        fireEvent.changeText(searchBar, "user123");
        
        expect(searchBar.props.value).toBe("user123");
    })

    it('search input results in correctly sorted users', async () => {
        fetchUsers.mockResolvedValueOnce([
            {id: '1', username: 'goat', email: 'goat@email.com', uid: '1'},
            {id: '2', username: 'sheep', email: 'sheep@email.com', uid: '2'},
            {id: '3', username: 'frog', email: 'frog@email.com', uid: '3'},
            {id: '4', username: 'shark', email: 'shark@email.com', uid: '4'}
        ])

      const page = render(<FilteredList input="sh" setSearchText={() => jest.fn} />);

      await waitFor(() => {
        expect(page.queryByText('sheep')).toBeTruthy();
        expect(page.queryByText('shark')).toBeTruthy();
        expect(page.queryByText('goat')).toBeFalsy();
        expect(page.queryByText('frog')).toBeFalsy();
      })
  })

});