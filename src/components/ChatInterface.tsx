// Import React library and the custom CSS file
import React from 'react';
import '../styles/ChatInterface.css';

// Define the ChatInterface component as a functional component
const ChatInterface: React.FC = () => {
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
              {/* Chat messages will be rendered here by React */}
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
