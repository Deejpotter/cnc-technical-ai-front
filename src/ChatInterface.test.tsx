// Import React and the necessary testing libraries
import React from 'react';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ChatInterface, { ChatInterfaceProps } from './components/ChatInterface';

test('renders chat interface', () => {
  const props: ChatInterfaceProps = {
    setShowConversations: jest.fn(),
    showConversations: false
  };

  rtlRender(<ChatInterface {...props} />);
  
  const chatElement = screen.getByTestId('chat-interface');
  
  expect(chatElement).toBeInTheDocument();
});
