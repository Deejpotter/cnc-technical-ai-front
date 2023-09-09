// Importing React and necessary testing libraries
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Importing the component to be tested
import App from './App';

// Test to check if the main App component renders without crashing
test('renders main App component', () => {
  // Render the App component
  render(<App />);
  
  // Query the element with the data-testid attribute
  const appElement = screen.getByTestId('main-app');
  
  // Check if the queried element is in the document
  expect(appElement).toBeInTheDocument();
});
