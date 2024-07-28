import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 

import HabitScreen from '../index';

//mock alert function 
global.alert = jest.fn();

//mock useNavigation 
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

//mock firebase auth functions used 
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
    addDoc: jest.fn(() => Promise.resolve({ 
        id: '1' 
    })),
    collection: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ 
      docs: [],
    })),
    getFirestore: jest.fn(),
}));


describe('Habit creation screen', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it('text can be input accurately', async () => {
        const page = render(<HabitScreen />);
        const name = page.getByTestId('name');
        const frequency = page.getByTestId('frequency');
        const period = page.getByTestId('period');

        fireEvent.changeText(name, 'exercise');
        fireEvent.changeText(frequency, '3x a week');
        fireEvent.changeText(period, 'july 2024');

        await waitFor(() => {
            expect(name.props.value).toBe('exercise');
            expect(frequency.props.value).toBe('3x a week');
            expect(period.props.value).toBe('july 2024');
        }) 
    });

    it('open date picker when "add scheduled date" button is pressed', () => {
        const page = render(<HabitScreen />);
        expect(page.queryByTestId('datePicker')).toBeNull();
        const openDatePicker = page.getByTestId('openDatePicker');
        fireEvent.press(openDatePicker);
        const datePicker = page.queryByTestId('datePicker');
        expect(datePicker).not.toBeNull();
    });

    it('date picker saves the date selected', () => {
        const page = render(<HabitScreen />);
        const openDatePicker = page.getByTestId('openDatePicker');
        fireEvent.press(openDatePicker);
        
        const datePicker = page.getByTestId('datePicker');
        const date = new Date(2024, 7, 1); 
        fireEvent(datePicker, 'onChange', { nativeEvent: { timestamp: date } });
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        const formattedDate = year + "-" + month + "-" + day
        const formattedText = 'Date selected: ' + formattedDate;
        expect(page.getByText(formattedText)).toBeDefined();
    });
    
    it('add document to firebase to create new habit', async () => {
        const page = render(<HabitScreen />);    
        const createButton = page.getByTestId('create');
        fireEvent.press(createButton);
    
        await waitFor(() => {
          expect(addDoc).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith('screens/calendar/index');
        });
    });

});