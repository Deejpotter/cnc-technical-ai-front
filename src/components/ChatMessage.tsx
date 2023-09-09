// Import React library
import React from 'react';

// Define the properties that the ChatMessage component will receive
type ChatMessageProps = {
  message: string;
  type: 'user' | 'bot';
};

// Define the ChatMessage component as a functional component
const ChatMessage: React.FC<ChatMessageProps> = ({ message, type }) => {
  // Determine the CSS class based on the message type ('user' or 'bot')
  const messageClass = type === 'user' ? 'user-message' : 'bot-message';

  // The JSX returned here defines how each chat message will be rendered
  return (
    // Apply the determined CSS class to the message div
    <div className={messageClass}>
      {/* Render the message text */}
      {message}
    </div>
  );
};

// Export the ChatMessage component to be used in other parts of the app
export default ChatMessage;
