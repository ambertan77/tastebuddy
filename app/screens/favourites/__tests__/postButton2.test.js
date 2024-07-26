import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent, cleanup } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { ref, set, get, onValue, snapshot, child, getDatabase } from "firebase/database";
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import FavouritesScreen from '../index';
import FavFoodList from '../components/favFood';
import { fetchFood } from '../../search/components/food';
import { fetchFavs } from '../../search/components/favourites';
import { fetchUsers } from '../components/followers';

jest.mock('../../search/components/food');
jest.mock('../../search/components/favourites');
jest.mock('../components/followers');

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

//mock firebase auth functions used in favFood.jsx
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
    };
});
 
//mock firebase firestore functions used in favFood.jsx
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
    updateDoc: jest.fn(),
    arrayRemove: jest.fn(),
    arrayUnion: jest.fn(),
    where: jest.fn(),
    query: jest.fn()
}));

//firebase/database mock
jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    set: jest.fn(),
    get: jest.fn(() => Promise.resolve({ exists: () => true, val: () => [] })),
    onValue: jest.fn(),
    child: jest.fn(),
    getDatabase: jest.fn(),
}));
 

describe('Favourites Page: Post Button 2 test', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
        cleanup();
        fetchFood.mockClear();
        fetchFavs.mockClear();
    });

    it('Post button on Review Popup correctly calls its onPress function', async () => {
        fetchFood.mockResolvedValueOnce([
            {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: []},
            {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: []},
            {id: '3', Name: 'chicken soup', Price: '3.2', Nutrients: []},
            {id: '4', Name: 'dory fish', Price: '3', Nutrients: []}
        ])
    
        fetchFavs.mockResolvedValueOnce(['1']);

        fetchUsers.mockResolvedValueOnce([
            {email: "penguin@email.com", id: "T4GB1qZWRx0LhR5jcYxR", uid: "7RtlMenRKtO4HKzV4JDoLix866l1", username: "penguin"}, 
            {email: "pig@email.com", id: "al6pyqCJNMdZSb6gWFSa", uid: "A61poOJVBedAJzouQrLQ8gc3Ebv2", username: "pig"}, 
            {email: "ninja@email.com", id: "9KS33xjDU0ZhAeRNOqZ8", uid: "xRXQnNDT9KgGXGCGV7dP6WpAyi13", username: "ninja"}
        ]);
    
        const page = render(<FavFoodList />);
        const postButton = await waitFor(() => page.getByTestId('postButton1'));
        await waitFor(() => fireEvent.press(postButton));

        const reviewInput = await waitFor(() => page.getByPlaceholderText('Your review ...'));
        await waitFor(() => fireEvent.changeText(reviewInput, 'this was so good.'));

        const postButton2 = await waitFor(() => page.getByTestId('postButton2'));
        await waitFor(() => fireEvent.press(postButton2));

        expect(page.getByTestId('postButton1').props.children[0].props.children).toBe('posted');
        expect(set).toHaveBeenCalledTimes(4);
    })

});