import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent, cleanup } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { ref, set, get, onValue, snapshot, child, getDatabase } from "firebase/database";
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import FeedScreen from '../index';
import Feed from '../components/FeedList';

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

//mock firebase auth functions used in FeedList.jsx
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
    };
});

//firebase/database mock
jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    set: jest.fn(),
    get: jest.fn(() => Promise.resolve({ exists: () => true, val: () => [] })),
    onValue: jest.fn(),
    child: jest.fn(),
    getDatabase: jest.fn(),
}));


describe('Feeds Page: displays feed test', () => {  

    it('feed page calls onValue once on render', async () => {
        const mockOnValue = jest.fn((ref, callback) => {
            const mockData = [ {
              PostedBysID: "654321", 
              PostedBysUsername: "frog", 
              date: 12, 
              foodId: "1", 
              foodName: "boiled egg", 
              id: "0", 
              month: 6, 
              review: "yummy", 
              time: "11:31:26 PM",
              year: 2024 } ];

            callback({ val: () => mockData });
          });
        
        onValue.mockImplementation(mockOnValue);

        const { queryByText } = render(<Feed />);

        await waitFor(() => expect(mockOnValue).toHaveBeenCalledTimes(1));
        expect(queryByText('boiled egg:')).toBeTruthy();
        expect(queryByText('yummy')).toBeTruthy();
        expect(queryByText('@frog')).toBeTruthy();
    })
});