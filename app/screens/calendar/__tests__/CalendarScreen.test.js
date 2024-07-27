import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore, deleteDoc, onSnapshot } from "firebase/firestore"; 

import CalendarScreen from '../components/agenda';
import AgendaComponent from '../components/agenda';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

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
 
//mock firebase firestore functions used
jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    addDoc: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ 
      docs: 
        [{id: '1', date: '2024-07-26', name: 'exercise', frequency: '3x a week', period: 'july 2024'},
        {id: '2', date: '2024-08-02', name: 'eat salad', frequency: '1x a week', period: 'august 2024'}]
    })),
    getFirestore: jest.fn(),
    onSnapshot: jest.fn()
}));

  
describe('Calendar screen', () => {  
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('displays the correct agendas on screen', async () => {
    const mockOnSnapshot = jest.fn((query, callback) => {
        const mockData = [ {
            "2024-07-27": [{"frequency": "3x a week", "id": "hI7dpZdood2WyCTLFZwc", "name": "exercise", "period": "july 2024"}], 
            "2024-07-29": [{"frequency": "once a week", "id": "4PbuP1bUpIeUcaKyNudB", "name": "eat fruits", "period": "july 2024"}], 
        } ];
        callback(mockData);
        return jest.fn();
      });
    
    onSnapshot.mockImplementation(mockOnSnapshot);

    const { queryByText } = render(<CalendarScreen />);

    await waitFor(() => expect(mockOnSnapshot).toHaveBeenCalledTimes(1));
    expect(queryByText('3x a week')).toBeTruthy();
    expect(queryByText('exercise')).toBeTruthy();
    expect(queryByText('july 2024')).toBeTruthy();
  })

  it('trash button deletes document in firebase', async () => {
    const mockOnSnapshot = jest.fn((query, callback) => {
        const mockData = [ {
            "2024-07-27": [{"frequency": "3x a week", "id": "hI7dpZdood2WyCTLFZwc", "name": "exercise", "period": "july 2024"}], 
        } ];
        callback(mockData);
        return jest.fn();
      });
    
    onSnapshot.mockImplementation(mockOnSnapshot);

    const page = render(<CalendarScreen />);

    const trashButton = page.getByTestId('trash');
    expect(trashButton).toBeDefined();

    fireEvent.press(trashButton);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  })
});