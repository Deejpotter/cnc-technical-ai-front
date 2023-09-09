// Import React library and the custom CSS file
import React, { useCallback, useEffect, useState } from 'react';
import '../styles/ChatInterface.css';
import ChatMessage from './ChatMessage'; // Import the ChatMessage component

// Define the ChatInterface component as a functional component
const ChatInterface: React.FC = () => {
  // Create a state variable to hold all messages
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);

  // Function to get user input
  const getUserInput = () => {
    const inputElement = document.getElementById('user-input') as HTMLInputElement;
    return inputElement.value;
  };

  // Function to display user message, wrapped in its own useCallback
  const displayUserMessage = useCallback((message: string) => {
    // Add the new message to the messages state variable
    setMessages([...messages, { type: 'user', content: `You: ${message}`}]);
  }, [messages]); // Add messages as a dependency to resolve ESLint warning

  // Function to fetch bot response
  const fetchBotResponse = async (userInput: string) : Promise<void> => {
    const apiUrl = process.env.REACT_APP_API_URL || ''; // Get API URL from environment variable
    const response = await fetch(`${apiUrl}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_message: userInput }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessages([...messages, { type: 'bot', content: `Bot: ${data.bot_response}`}]);
    } else {
      console.error('Failed to fetch bot response');
    }
  };

  // Function to handle form submission, wrapped in its own useCallback
  const handleFormSubmit = useCallback(async (event: Event) => {
    event.preventDefault();
    const userInput = getUserInput();
    displayUserMessage(userInput);
    await fetchBotResponse(userInput); // Fetch bot response
    // eslint-disable-next-line
  }, [displayUserMessage]); // Add displayUserMessage as a dependency to resolve ESLint warning

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
  }, [handleFormSubmit]); // handleFormSubmit is now a dependency

  // Use useEffect to call initializeChat when the component mounts
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

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