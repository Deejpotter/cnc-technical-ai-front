import React, { useState } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import Navbar from './components/Navbar';

function App() {
  // The conversations list visibility state is managed in the App component because it is used in both the Navbar and ChatInterface components
  const [showConversations, setShowConversations] = useState(false);

  return (
    <div className="d-flex flex-column vh-100" data-testid="main-app">
      <Navbar setShowConversations={setShowConversations} showConversations={showConversations} />
      <ChatInterface setShowConversations={setShowConversations} showConversations={showConversations} />
    </div>
  );
}

export default App;
