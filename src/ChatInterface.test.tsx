// Importing React and necessary testing libraries
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Importing the component to be tested
import ChatInterface from './components/ChatInterface'; 


// Test to check if the chat interface renders without crashing
test('renders chat interface', () => {
  render(<ChatInterface />);
  const chatElement = screen.getByTestId('chat-interface');
  expect(chatElement).toBeInTheDocument();
});
