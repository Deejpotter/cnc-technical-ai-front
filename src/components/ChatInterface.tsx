// Import React library and the custom CSS file
import React, { useCallback, useEffect, useState } from 'react';
import '../styles/ChatInterface.css';
import ChatMessage from './ChatMessage'; // Import the ChatMessage component

// Define the ChatInterface component as a functional component
const ChatInterface: React.FC = () => {
  // Create a state variable to hold all messages
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);

  // Function to initialize chat event listeners
  const initializeChat = useCallback(() => {
    // Get form and user input elements
    const form = document.getElementById('chat-form') as HTMLFormElement;
    const userInput = document.getElementById('user-input') as HTMLInputElement;
    
    // Add event listeners
    form.addEventListener('submit', handleFormSubmit);
    userInput.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        (event.target as HTMLInputElement).value += '\n';
      }
    });
    
    // Focus on the user input field
    userInput.focus();
  }, []);

  // Use useEffect to call initializeChat when the component mounts
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  // Function to handle form submission
  const handleFormSubmit = (event: Event) => {
    event.preventDefault();
    const userInput = getUserInput();
    displayUserMessage(userInput);
    // Clear user input and display typing indicator
    // Fetch bot response logic would go here
  };

  // Function to get user input
  const getUserInput = () => {
    const inputElement = document.getElementById('user-input') as HTMLInputElement;
    return inputElement.value;
  };

  // Function to display user message
  const displayUserMessage = (message: string) => {
    // Add the new message to the messages state variable
    setMessages([...messages, { type: 'user', content: `You: ${message}`}]);
  };
  
  // The JSX returned here defines the layout of the chat interface
  return (
    // Main container for the entire chat interface
    <div className="container mt-5" data-testid="chat-interface">
      {/* Row to divide the sidebar and chat area */}
      <div className="row">
        {/* Sidebar for listing conversations */}
        <div className="col-md-3 border-right p-3">
          {/* Title for the conversation list */}
          <h5 className="mb-3">Conversations</h5>
          {/* List of conversations */}
          <ul className="list-group mb-4">
            <li className="list-group-item active">Conversation 1</li>
            <li className="list-group-item">Conversation 2</li>
          </ul>
        </div>
        {/* Main chat area */}
        <div className="col-md p-3">
          {/* Container for chat history and input form */}
          <div className="border rounded p-3" id="chat-container">
            {/* Inner Container for chat messages */}
            <div id="message-container">
          {messages.map((message, index) => (
          <ChatMessage key={index} type={message.type} message={message.content} />
        ))}
      </div>
          </div>
          {/* Form for user to input messages */}
          <form className="form-inline bg-white p-2" id="chat-form">
            {/* Text input for user messages */}
            <input type="text" className="form-control mr-2" id="user-input" placeholder="Type your message..." />
            {/* Send button */}
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the ChatInterface component to be used in other parts of the app
export default ChatInterface;
