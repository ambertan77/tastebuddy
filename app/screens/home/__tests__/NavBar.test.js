import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../firebase';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 

import NavigationBar from '../../../components/navigationBar';
import FavouritesScreen from '../../favourites';

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

describe('Navigation Bar', () => {  
    it('Favourites Icon leads to Favourites Screen', () => {
        const { getByTestId } = render(<NavigationBar />);
        const favIcon = getByTestId('favourites');
        fireEvent.press(favIcon); // Use fireEvent instead of userEvent if userEvent is not properly imported

        expect(mockNavigate).toHaveBeenCalledWith('screens/favourites/index');
    })

    it('Calendar Icon leads to Calendar Screen', () => {
        const { getByTestId } = render(<NavigationBar />);
        const calendarIcon = getByTestId('calendar');
        fireEvent.press(calendarIcon); // Use fireEvent instead of userEvent if userEvent is not properly imported
        
        expect(mockNavigate).toHaveBeenCalledWith('screens/calendar/index');
    })

    it('Search Icon leads to Search Screen', async () => {
        const { getByTestId } = render(<NavigationBar />);
        const searchIcon = getByTestId('search');
        fireEvent.press(searchIcon); // Use fireEvent instead of userEvent if userEvent is not properly imported
        
        expect(mockNavigate).toHaveBeenCalledWith('screens/search/index');
    })

    it('Feed Icon leads to Feeds Screen', async () => {
        const { getByTestId } = render(<NavigationBar />);
        const feedIcon = getByTestId('feed');
        fireEvent.press(feedIcon); // Use fireEvent instead of userEvent if userEvent is not properly imported
        
        expect(mockNavigate).toHaveBeenCalledWith('screens/feed/index');
    })

    it('Profile Icon leads to Profile Screen', async () => {
        const { getByTestId } = render(<NavigationBar />);
        const profileIcon = getByTestId('profile');
        fireEvent.press(profileIcon); // Use fireEvent instead of userEvent if userEvent is not properly imported
        
        expect(mockNavigate).toHaveBeenCalledWith('screens/profile/index');
    })
  });