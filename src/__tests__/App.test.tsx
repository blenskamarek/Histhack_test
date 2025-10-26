import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';

describe('App root', () => {
  it('renders welcome text', () => {
    const { getByText } = render(<App />);
    expect(getByText('Witamy w Histhack App')).toBeTruthy();
  });
});
