// Import necessary modules from React and custom CSS
import React, { useState, Dispatch, SetStateAction } from 'react';
import '../styles/ChatInterface.css';  // Import custom CSS
import ChatMessage from './ChatMessage';  // Import ChatMessage component
import ConversationsList from './ConversationsList';  // Import the new ConversationsList component

// The chat interface component receives setShowConversations and showConversations as props
export type ChatInterfaceProps = {
  setShowConversations: Dispatch<SetStateAction<boolean>>;
  showConversations: boolean;
};

// Define the ChatInterface component as a functional component
const ChatInterface: React.FC<ChatInterfaceProps> = ({ setShowConversations, showConversations }) => {
  // State to hold all chat messages
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([]);

  // Function to handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent default form submission behavior
    const inputElement = event.currentTarget.elements.namedItem('user-input') as HTMLInputElement;  // Get the user input element
    const userInput = inputElement.value;  // Get the value of the user input
    inputElement.value = '';  // Clear the user input
    // Add the user's message to the messages state
    setMessages(prevMessages => [...prevMessages, { type: 'user', content: `You: ${userInput}` }]);
    
    // Fetch the bot's response
    const apiUrl = process.env.REACT_APP_API_URL || '';  // Get API URL from environment variable
    try {
      const response = await fetch(`${apiUrl}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_message: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        // Add the bot's response to the messages state
        setMessages(prevMessages => [...prevMessages, { type: 'bot', content: `Bot: ${data.bot_response}` }]);
      }
    } catch (error) {
      console.error('Failed to fetch bot response', error);
    }
  };

  return (
    <div className="d-flex flex-column h-90 w-75">
      <div className="row flex-grow-1">
        {/* Conversations list */}
        {showConversations && (
          <div className="col-md-3 border-right p-3">
            <ConversationsList />
          </div>
        )}
        {/* Main chat area */}
        <div className="col-md p-3">
          <div className="border rounded p-3">
            <div>
              {messages.map((message, index) => (
                <ChatMessage key={index} type={message.type} message={message.content} />
              ))}
            </div>
          </div>
          {/* Form for user input */}
          <form className="form-inline bg-white p-2" onSubmit={handleFormSubmit}>
            <input type="text" className="form-control mr-2" name="user-input" placeholder="Type your message..." />
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the ChatInterface component for use in other parts of the application
export default ChatInterface;
