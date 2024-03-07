import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import App from './App';
import React from 'react'

test('renders message from Backend', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
