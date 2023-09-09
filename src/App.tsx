import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="app" data-testid="main-app">
      <ChatInterface />
    </div>
  );
}

export default App;
