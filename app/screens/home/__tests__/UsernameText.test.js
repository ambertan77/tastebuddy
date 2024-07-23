import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { act } from 'react-dom/test-utils';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../firebase';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 

import UsernameText from '../../../components/username';

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
 
//mock firebase firestore functions
jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    getDoc: jest.fn(() => ({
        data: jest.fn(() => ({
            uid: '123456',
            email: 'sheep@email.com',
            username: 'sheep'
        })),
    })),
    getFirestore: jest.fn(() => ({})),
}));

describe('Home Screen', () => {  
  it('Home Screen shows current users username', async () => {
    const { getByTestId } = render(<UsernameText />);
    const usernameText = await waitFor(() => getByTestId('usernameText')); //use waitFor to wait for async updating of useState in username.jsx

    expect(usernameText).toBeDefined();
    expect(usernameText.props.children).toBe("sheep");
  })
});