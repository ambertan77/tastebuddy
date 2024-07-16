import React from 'react';
import { jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

import LoginScreen from '../index';

describe('LoginScreen', () => {  
  it('login button exists on login page', () => {
    const page = render(<LoginScreen />);
    const loginButton = page.getByTestId('loginButton');
  })
});