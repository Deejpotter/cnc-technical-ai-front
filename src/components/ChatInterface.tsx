import React from 'react';

// This component will hold the chat interface
const ChatInterface: React.FC = () => {
  return (
    <div className="container mt-5">
      {/* Container for chat messages */}
      <div id="message-container" className="border rounded p-3">
        {/* Chat messages will be added here */}
      </div>
      {/* Form for user input */}
      <form id="chat-form" className="form-inline bg-white p-2 mt-3">
        <input type="text" className="form-control mr-2" id="user-input" placeholder="Type your message..." />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;
