import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, within, userEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query, getFirestore } from "firebase/firestore"; 
import { auth } from '../../../../firebase';

import SearchScreen from '../index';
import FoodList from '../components/nutrientsFilter';
import { fetchFood } from '../components/food';
import { fetchFavs } from '../components/favourites';

jest.mock('../components/food');
jest.mock('../components/favourites');

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

//mock firebase auth functions used in nutrientsFilter.jsx
jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      createUserWithEmailAndPassword: jest.fn(),
    };
});
 
//mock firebase firestore functions used in nutrientsFilter.jsx
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
            favourites: ['chicken soup', 'fried rice', 'boiled egg']
        })),
    })),
    getFirestore: jest.fn(),
}));

describe('Search Screen: Filters (Feature 5)', () => {  
    beforeEach(() => {
        jest.clearAllMocks(); //clear all mocks before each test case
    });

    it('1 Nutrition Filter selected, food correctly displayed', async () => {
      fetchFood.mockResolvedValueOnce([
        {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
        {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
        {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
      ])

      fetchFavs.mockResolvedValueOnce([
        '1', '2'
      ])

      const page = render(<FoodList input="" setSearchText={() => jest.fn} />);

      const proteinFilter = page.getByTestId("Protein Source")
      await waitFor(() => userEvent.press(proteinFilter));

      await waitFor(() => {
        expect(page.queryByText('boiled egg')).toBeTruthy();
        expect(page.queryByText('egg tart')).toBeTruthy();
        expect(page.queryByText('bread')).toBeFalsy();
      })
    })

    it('2 Nutrition Filter selected, food correctly displayed', async () => {
      fetchFood.mockResolvedValueOnce([
        {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
        {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
        {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
      ])

      fetchFavs.mockResolvedValueOnce([
        '1', '2'
      ])

      const page = render(<FoodList input="" setSearchText={() => jest.fn} />);

      const proteinFilter = page.getByTestId("Protein Source");
      const lowInSugarFilter = page.getByTestId("Low in Sugar");
      await waitFor(() => userEvent.press(proteinFilter));
      await waitFor(() => userEvent.press(lowInSugarFilter));

      await waitFor(() => {
        expect(page.queryByText('boiled egg')).toBeTruthy();
        expect(page.queryByText('egg tart')).toBeFalsy();
        expect(page.queryByText('bread')).toBeFalsy();
      })
    })

    it('1 Nutrition Filter selected then unselected, food correctly displayed', async () => {
      fetchFood.mockResolvedValueOnce([
        {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
        {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
        {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
      ])

      fetchFavs.mockResolvedValueOnce([
        '1', '2'
      ])

      const page = render(<FoodList input="" setSearchText={() => jest.fn} />);

      const proteinFilter = page.getByTestId("Protein Source");
      await waitFor(() => userEvent.press(proteinFilter));
      await waitFor(() => userEvent.press(proteinFilter)); //wait for first Press to be executed

      await waitFor(() => {
        expect(page.queryByText('boiled egg')).toBeTruthy();
        expect(page.queryByText('egg tart')).toBeTruthy();
        expect(page.queryByText('bread')).toBeTruthy();
      })
    })

    it('price input into Price Filter, food correctly displayed', async () => {
      fetchFood.mockResolvedValueOnce([
        {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
        {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
        {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
      ])

      fetchFavs.mockResolvedValueOnce([
        '1', '2'
      ])

      const page = render(<FoodList input="" setSearchText={() => jest.fn} />);

      const priceFilter = await waitFor(() => page.getByTestId("priceFilter"));
      await waitFor(() => fireEvent.changeText(priceFilter, '1'));

      await waitFor(() => {
        expect(page.queryByText('boiled egg')).toBeTruthy();
        expect(page.queryByText('egg tart')).toBeTruthy();
        expect(page.queryByText('bread')).toBeFalsy();
      })
    })

    it('price input into Price Filter then deselected, food correctly displayed', async () => {
      fetchFood.mockResolvedValueOnce([
        {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
        {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
        {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
      ])

      fetchFavs.mockResolvedValueOnce([
        '1', '2'
      ])

      const page = render(<FoodList input="" setSearchText={() => jest.fn} />);

      const priceFilter = await waitFor(() => page.getByTestId("priceFilter"));
      await waitFor(() => fireEvent.changeText(priceFilter, '1'));

      const priceButton = await waitFor(() => page.getByTestId('priceButton'))
      await waitFor(() => userEvent.press(priceButton));

      await waitFor(() => {
        expect(page.queryByText('boiled egg')).toBeTruthy();
        expect(page.queryByText('egg tart')).toBeTruthy();
        expect(page.queryByText('bread')).toBeTruthy();
      })
    })

    it('price input into Price Filter & nutrition filter chosen, food correctly displayed', async () => {
      fetchFood.mockResolvedValueOnce([
        {id: '1', Name: 'boiled egg', Price: '0.4', Nutrients: ["Protein Source", "Low in Sugar" ]},
        {id: '2', Name: 'egg tart', Price: '0.5', Nutrients: ["Protein Source"]},
        {id: '3', Name: 'bread', Price: '3.2', Nutrients: ["Carbohydrate Source", "Low in Sugar"]}
      ])

      fetchFavs.mockResolvedValueOnce([
        '1', '2'
      ])

      const page = render(<FoodList input="" setSearchText={() => jest.fn} />);

      const proteinFilter = await waitFor(() => page.getByTestId("Protein Source"));
      const priceFilter = await waitFor(() => page.getByTestId("priceFilter"));
      
      await waitFor(() => {
        userEvent.press(proteinFilter);
        fireEvent.changeText(priceFilter, '0.5');
      });

      await waitFor(() => {
        expect(page.queryByText('boiled egg')).toBeTruthy();
        expect(page.queryByText('egg tart')).toBeFalsy();
        expect(page.queryByText('bread')).toBeFalsy();
      })
    })
});