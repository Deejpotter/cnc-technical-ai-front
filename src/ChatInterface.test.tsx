// Import React and the necessary testing libraries
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the component to be tested
import ChatInterface from './components/ChatInterface'; 

// Define a test suite for the ChatInterface component
test('renders chat interface', () => {
  // Render the ChatInterface component using the testing library
  render(<ChatInterface />);
  
  // Look for an element in the ChatInterface component that has a data-testid of "chat-interface"
  const chatElement = screen.getByTestId('chat-interface');
  
  // Assert that the element is present in the document
  expect(chatElement).toBeInTheDocument();
});
