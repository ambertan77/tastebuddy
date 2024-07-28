import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { db, auth } from '../../../../firebase';

import UserListScreen from '../index';
import FilteredList from '../components/filtered';
import { fetchUsers } from '../components/fetchUsers';
import { editData } from '../components/filtered';

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
    addDoc: jest.fn(() => Promise.resolve({ 
        id: '1' 
    })),
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


describe('User List screen displays all users in the database', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it("all users are displayed on screen", async () => {
        fetchUsers.mockResolvedValueOnce([
            {id: '1', username: 'goat', email: 'goat@email.com', uid: '1'},
            {id: '2', username: 'sheep', email: 'sheep@email.com', uid: '2'},
            {id: '3', username: 'frog', email: 'frog@email.com', uid: '3'}
        ])
        const page = render(<UserListScreen />);
        await waitFor(() => {
            expect(page.queryByText('goat')).toBeTruthy();
            expect(page.queryByText('sheep')).toBeTruthy();
            expect(page.queryByText('frog')).toBeTruthy();
          })
    });

    it("add followed user to following collection, current user to followers collection", async () => {
        fetchUsers.mockResolvedValueOnce([
            {id: '1', username: 'goat', email: 'goat@email.com', uid: '1'},
            {id: '2', username: 'sheep', email: 'sheep@email.com', uid: '2'},
            {id: '3', username: 'frog', email: 'frog@email.com', uid: '3'}
        ])
        const page = render(<UserListScreen />);
        // add timeout to increase time for waitFor function
        const followButtons = await waitFor(() => page.findAllByTestId('follow'), { timeout: 2000 });
        const followButton = followButtons[0];
        fireEvent.press(followButton);
        await waitFor(() => expect(collection).toHaveBeenCalledWith(db, "Users", "0", "Following"));
        await waitFor(() => expect(collection).toHaveBeenCalledWith(db, "Users", "1", "Followers"));
        expect(addDoc).toHaveBeenCalledTimes(2);
    });

    it("follow button changed to following after pressing", async () => {
        fetchUsers.mockResolvedValueOnce([
            {id: '1', username: 'sheep', email: 'sheep@email.com', uid: '1'},
            {id: '2', username: 'frog', email: 'frog@email.com', uid: '2'}
        ])
        const page = render(<UserListScreen />);
        // add timeout to increase time for waitFor function
        const followButtons = await waitFor(() => page.findAllByTestId('follow'), { timeout: 2000 });
        const followButton = followButtons[0];
        fireEvent.press(followButton);
        await waitFor(() => {
            const followingButton = page.getByText('following');
            expect(followingButton).toBeDefined();
        });
    });

});