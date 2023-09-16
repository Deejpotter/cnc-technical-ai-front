import React from 'react';

// Define the Navbar component as a functional component
// It receives setShowConversations and showConversations as props to update and read the state in the parent component
const Navbar: React.FC<{ setShowConversations: React.Dispatch<React.SetStateAction<boolean>>, showConversations: boolean }> = ({ setShowConversations, showConversations }) => {
  return (
    // Navbar layout
    <nav className="navbar navbar-light bg-light px-5">
      {/* Placeholder for logo */}
      <a className="navbar-brand" href="/">CNC Tech AI</a>
      {/* Button to toggle the conversations list */}
      <button className="btn btn-primary" onClick={() => setShowConversations(prev => !prev)}>
        {/* Conditionally set the Font Awesome icon based on the state */}
        <i className={`fas ${showConversations ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    </nav>
  );
};

export default Navbar;
